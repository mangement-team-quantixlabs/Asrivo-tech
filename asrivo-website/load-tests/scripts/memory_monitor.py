"""
ASIRVO — Memory Leak & Resource Monitor
Polls CloudWatch metrics OR the /api/metrics endpoint on the staging EC2
to track memory, CPU, and connection counts during load testing.

Usage:
    # If running ON the EC2 instance:
    python3 memory_monitor.py --local

    # If polling a metrics endpoint:
    python3 memory_monitor.py --host https://staging.asirvo.com --duration 300

    # If using AWS CloudWatch (requires boto3 + IAM role):
    python3 memory_monitor.py --cloudwatch --instance-id i-0123456789abcdef0 --region ap-south-1
"""

import argparse
import asyncio
import csv
import json
import os
import sys
import time
from datetime import datetime
from typing import Optional

# ---------------------------------------------------------------------------
# Local mode — uses psutil to monitor the current process's host
# ---------------------------------------------------------------------------

def monitor_local(duration_s: int, interval_s: float, output_path: str):
    try:
        import psutil
    except ImportError:
        print("❌ psutil not installed: pip install psutil --break-system-packages")
        sys.exit(1)

    print(f"📊 LOCAL MEMORY MONITOR")
    print(f"   Duration : {duration_s}s | Interval: {interval_s}s")
    print(f"   Output   : {output_path}\n")

    rows = []
    start = time.time()
    end = start + duration_s

    # Baseline snapshot
    baseline_mem = psutil.virtual_memory().used / 1024 / 1024
    print(f"   Baseline memory: {baseline_mem:.1f} MB")
    print(f"{'─'*50}")
    print(f"  {'Time':>6}  {'CPU%':>6}  {'RAM MB':>8}  {'Delta MB':>9}  {'Conns':>6}  {'Status'}")
    print(f"{'─'*50}")

    while time.time() < end:
        elapsed = time.time() - start
        mem = psutil.virtual_memory()
        cpu = psutil.cpu_percent(interval=None)
        mem_mb = mem.used / 1024 / 1024
        delta_mb = mem_mb - baseline_mem
        conns = len(psutil.net_connections())

        # Leak signal: sustained memory growth > 50 MB
        leak_flag = "⚠️  LEAK?" if delta_mb > 50 else ""

        row = {
            "elapsed_s": round(elapsed, 1),
            "cpu_pct": round(cpu, 1),
            "memory_mb": round(mem_mb, 1),
            "memory_delta_mb": round(delta_mb, 1),
            "memory_pct": round(mem.percent, 1),
            "connections": conns,
            "timestamp": datetime.now().isoformat(),
        }
        rows.append(row)

        print(f"  {elapsed:>6.1f}s  {cpu:>5.1f}%  {mem_mb:>8.1f}  {delta_mb:>+9.1f}  {conns:>6}  {leak_flag}")

        time.sleep(interval_s)

    # Export CSV
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    # Analysis
    mem_values = [r["memory_mb"] for r in rows]
    first_third = mem_values[:len(mem_values)//3]
    last_third = mem_values[len(mem_values)*2//3:]

    if first_third and last_third:
        avg_start = sum(first_third) / len(first_third)
        avg_end = sum(last_third) / len(last_third)
        growth = avg_end - avg_start
        growth_rate_mb_min = growth / (duration_s / 60)

        print(f"\n{'═'*50}")
        print(f"  MEMORY ANALYSIS")
        print(f"{'─'*50}")
        print(f"  Avg (first third): {avg_start:.1f} MB")
        print(f"  Avg (last third) : {avg_end:.1f} MB")
        print(f"  Net growth       : {growth:+.1f} MB")
        print(f"  Growth rate      : {growth_rate_mb_min:+.1f} MB/min")
        if growth_rate_mb_min > 5:
            print(f"\n  ⚠️  POTENTIAL MEMORY LEAK DETECTED!")
            print(f"      Growth rate {growth_rate_mb_min:.1f} MB/min exceeds 5 MB/min threshold.")
        else:
            print(f"\n  ✅ Memory appears stable (< 5 MB/min growth)")
        print(f"{'═'*50}")

    print(f"\n  Report saved: {output_path}")


# ---------------------------------------------------------------------------
# Remote mode — polls a /api/metrics or /api/health endpoint
# ---------------------------------------------------------------------------

async def monitor_remote(host: str, duration_s: int, interval_s: float, output_path: str):
    try:
        import aiohttp
    except ImportError:
        print("❌ aiohttp not installed: pip install aiohttp --break-system-packages")
        sys.exit(1)

    metrics_url = f"{host.rstrip('/')}/api/metrics"
    health_url = f"{host.rstrip('/')}/api/health"

    print(f"📊 REMOTE METRICS MONITOR")
    print(f"   Host     : {host}")
    print(f"   Duration : {duration_s}s | Interval: {interval_s}s\n")

    rows = []
    start = time.time()
    end_t = start + duration_s

    async with aiohttp.ClientSession() as session:
        while time.time() < end_t:
            elapsed = time.time() - start
            ts = datetime.now().isoformat()

            row = {"elapsed_s": round(elapsed, 1), "timestamp": ts}

            # Try /api/metrics (Prometheus format or JSON)
            try:
                async with session.get(metrics_url, timeout=aiohttp.ClientTimeout(total=5)) as resp:
                    if resp.status == 200:
                        text = await resp.text()
                        row["metrics_status"] = "ok"
                        row["response_note"] = text[:200]
                    else:
                        row["metrics_status"] = f"HTTP {resp.status}"
            except Exception as e:
                row["metrics_status"] = f"error: {e}"

            # Try /api/health
            try:
                t0 = time.monotonic()
                async with session.get(health_url, timeout=aiohttp.ClientTimeout(total=5)) as resp:
                    latency_ms = (time.monotonic() - t0) * 1000
                    row["health_status"] = resp.status
                    row["health_latency_ms"] = round(latency_ms, 1)
                    if resp.status == 200:
                        try:
                            data = await resp.json()
                            row.update({f"health_{k}": v for k, v in data.items()
                                        if isinstance(v, (str, int, float, bool))})
                        except Exception:
                            pass
            except Exception as e:
                row["health_status"] = f"error: {e}"
                row["health_latency_ms"] = -1

            rows.append(row)
            print(f"  [{elapsed:>6.1f}s] health={row.get('health_status')}  "
                  f"latency={row.get('health_latency_ms', '?')}ms  "
                  f"metrics={row.get('metrics_status', '?')}")

            await asyncio.sleep(interval_s)

    # Export
    if rows:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        all_keys = set()
        for r in rows:
            all_keys.update(r.keys())
        with open(output_path, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=sorted(all_keys))
            writer.writeheader()
            writer.writerows(rows)
        print(f"\n  Report saved: {output_path}")


# ---------------------------------------------------------------------------
# CloudWatch mode (requires boto3)
# ---------------------------------------------------------------------------

def monitor_cloudwatch(instance_id: str, region: str, duration_s: int, output_path: str):
    try:
        import boto3
        from datetime import timezone, timedelta
    except ImportError:
        print("❌ boto3 not installed: pip install boto3 --break-system-packages")
        sys.exit(1)

    print(f"☁️  CLOUDWATCH MONITOR")
    print(f"   Instance : {instance_id}")
    print(f"   Region   : {region}\n")

    cw = boto3.client("cloudwatch", region_name=region)
    end_time = datetime.utcnow()
    start_time = end_time - __import__("datetime").timedelta(seconds=duration_s)

    metrics_to_fetch = [
        ("AWS/EC2", "CPUUtilization", "Percent"),
        ("CWAgent", "mem_used_percent", "Percent"),
        ("CWAgent", "disk_used_percent", "Percent"),
    ]

    rows = {}
    for namespace, metric_name, unit in metrics_to_fetch:
        try:
            resp = cw.get_metric_statistics(
                Namespace=namespace,
                MetricName=metric_name,
                Dimensions=[{"Name": "InstanceId", "Value": instance_id}],
                StartTime=start_time,
                EndTime=end_time,
                Period=60,
                Statistics=["Average", "Maximum"],
                Unit=unit,
            )
            for dp in resp["Datapoints"]:
                ts = dp["Timestamp"].isoformat()
                if ts not in rows:
                    rows[ts] = {"timestamp": ts}
                rows[ts][f"{metric_name}_avg"] = round(dp["Average"], 2)
                rows[ts][f"{metric_name}_max"] = round(dp["Maximum"], 2)
        except Exception as e:
            print(f"   ⚠️  Could not fetch {metric_name}: {e}")

    sorted_rows = sorted(rows.values(), key=lambda r: r["timestamp"])
    if sorted_rows:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        all_keys = set()
        for r in sorted_rows:
            all_keys.update(r.keys())
        with open(output_path, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=sorted(all_keys))
            writer.writeheader()
            writer.writerows(sorted_rows)
        print(f"  Exported {len(sorted_rows)} data points → {output_path}")
    else:
        print("  No data points retrieved. Check instance ID, region, and CloudWatch agent setup.")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ASIRVO Memory & Resource Monitor")
    parser.add_argument("--host", default=None, help="Remote host URL for endpoint polling")
    parser.add_argument("--local", action="store_true", help="Monitor local system via psutil")
    parser.add_argument("--cloudwatch", action="store_true", help="Pull metrics from AWS CloudWatch")
    parser.add_argument("--instance-id", default=None, help="EC2 instance ID (for CloudWatch mode)")
    parser.add_argument("--region", default="ap-south-1", help="AWS region")
    parser.add_argument("--duration", type=int, default=300, help="Monitoring duration in seconds")
    parser.add_argument("--interval", type=float, default=5.0, help="Polling interval in seconds")
    parser.add_argument("--output", default="../results/memory_monitor.csv", help="Output CSV path")
    args = parser.parse_args()

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    output = args.output.replace(".csv", f"_{ts}.csv")

    if args.local:
        monitor_local(args.duration, args.interval, output)
    elif args.cloudwatch:
        if not args.instance_id:
            print("❌ --instance-id required for CloudWatch mode")
            sys.exit(1)
        monitor_cloudwatch(args.instance_id, args.region, args.duration, output)
    elif args.host:
        asyncio.run(monitor_remote(args.host, args.duration, args.interval, output))
    else:
        print("❌ Specify --local, --cloudwatch, or --host <URL>")
        sys.exit(1)
