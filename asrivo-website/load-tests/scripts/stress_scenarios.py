"""
ASIRVO — Stress & Breakpoint Test Scenarios
Run with: python3 stress_scenarios.py --host https://staging.asirvo.com

Scenarios:
  1. Spike Test      — sudden 10x traffic surge (cloud event / viral moment)
  2. Soak Test       — sustained 60% load for 1 hour (memory leak detection)
  3. Breakpoint Test — ramp until failure to find the ceiling
  4. DB Bottleneck   — heavy read/write to stress PostgreSQL + Redis
"""

import asyncio
import aiohttp
import argparse
import csv
import json
import os
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional

# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class RequestResult:
    url: str
    method: str
    status: int
    latency_ms: float
    error: Optional[str] = None
    timestamp: float = field(default_factory=time.time)

    @property
    def success(self):
        return self.error is None and 200 <= self.status < 400


@dataclass
class ScenarioReport:
    name: str
    start_time: float
    end_time: float
    results: List[RequestResult] = field(default_factory=list)

    @property
    def duration_s(self):
        return self.end_time - self.start_time

    @property
    def total(self):
        return len(self.results)

    @property
    def failures(self):
        return [r for r in self.results if not r.success]

    @property
    def failure_rate(self):
        return len(self.failures) / self.total if self.total else 0

    @property
    def avg_latency(self):
        lats = [r.latency_ms for r in self.results]
        return sum(lats) / len(lats) if lats else 0

    @property
    def p95_latency(self):
        lats = sorted(r.latency_ms for r in self.results)
        if not lats:
            return 0
        idx = int(len(lats) * 0.95)
        return lats[min(idx, len(lats) - 1)]

    @property
    def p99_latency(self):
        lats = sorted(r.latency_ms for r in self.results)
        if not lats:
            return 0
        idx = int(len(lats) * 0.99)
        return lats[min(idx, len(lats) - 1)]

    @property
    def rps(self):
        return self.total / self.duration_s if self.duration_s else 0

    def print_summary(self):
        status = "✅ PASS" if self.failure_rate < 0.01 else "❌ FAIL"
        print(f"\n{'─' * 55}")
        print(f"  Scenario: {self.name}  {status}")
        print(f"{'─' * 55}")
        print(f"  Duration       : {self.duration_s:.1f}s")
        print(f"  Total requests : {self.total}")
        print(f"  Failures       : {len(self.failures)}")
        print(f"  Failure rate   : {self.failure_rate * 100:.2f}%")
        print(f"  Avg latency    : {self.avg_latency:.0f}ms")
        print(f"  p95 latency    : {self.p95_latency:.0f}ms")
        print(f"  p99 latency    : {self.p99_latency:.0f}ms")
        print(f"  RPS            : {self.rps:.1f}")
        if self.failures[:3]:
            print(f"\n  Sample errors:")
            for f in self.failures[:3]:
                print(f"    [{f.status}] {f.url} — {f.error}")
        print(f"{'─' * 55}\n")


# ---------------------------------------------------------------------------
# Core HTTP helper
# ---------------------------------------------------------------------------

async def http_request(
    session: aiohttp.ClientSession,
    method: str,
    url: str,
    **kwargs
) -> RequestResult:
    start = time.monotonic()
    try:
        async with session.request(method, url, timeout=aiohttp.ClientTimeout(total=30), **kwargs) as resp:
            latency = (time.monotonic() - start) * 1000
            await resp.read()  # consume body to free connection
            return RequestResult(
                url=url,
                method=method,
                status=resp.status,
                latency_ms=latency,
            )
    except asyncio.TimeoutError:
        latency = (time.monotonic() - start) * 1000
        return RequestResult(url=url, method=method, status=0, latency_ms=latency, error="TIMEOUT")
    except aiohttp.ClientConnectorError as e:
        latency = (time.monotonic() - start) * 1000
        return RequestResult(url=url, method=method, status=0, latency_ms=latency, error=f"CONN_ERR: {e}")
    except Exception as e:
        latency = (time.monotonic() - start) * 1000
        return RequestResult(url=url, method=method, status=0, latency_ms=latency, error=str(e))


# ---------------------------------------------------------------------------
# Scenario 1 — Spike Test
# ---------------------------------------------------------------------------

async def spike_test(host: str) -> ScenarioReport:
    """
    Simulate sudden burst: 10 → 200 concurrent users in 10s, hold 30s, drop to 10.
    Detects: auto-scaling lag, queue buildup, connection pool exhaustion.
    """
    print("\n🚀 SPIKE TEST — Simulating sudden traffic surge...")
    report = ScenarioReport(name="Spike Test", start_time=time.time(), end_time=0)

    url = f"{host}/"
    connector = aiohttp.TCPConnector(limit=300, limit_per_host=300)
    async with aiohttp.ClientSession(connector=connector) as session:

        async def burst(concurrent: int, duration_s: int, label: str):
            print(f"   → {label}: {concurrent} concurrent for {duration_s}s")
            end = time.monotonic() + duration_s
            while time.monotonic() < end:
                tasks = [http_request(session, "GET", url) for _ in range(concurrent)]
                results = await asyncio.gather(*tasks)
                report.results.extend(results)
                await asyncio.sleep(0.1)

        await burst(10, 5, "Warm-up (10 users)")
        await burst(200, 30, "SPIKE (200 users)")
        await burst(10, 10, "Cool-down (10 users)")

    report.end_time = time.time()
    return report


# ---------------------------------------------------------------------------
# Scenario 2 — Soak Test (short version for CI; extend duration manually)
# ---------------------------------------------------------------------------

async def soak_test(host: str, duration_s: int = 120) -> ScenarioReport:
    """
    Hold steady moderate load for extended period.
    Detects: memory leaks, connection pool exhaustion, log bloat, GC pauses.
    Default: 2 minutes (extend to 60+ min for real soak testing).
    """
    print(f"\n🧪 SOAK TEST — Sustained load for {duration_s}s...")
    report = ScenarioReport(name="Soak Test", start_time=time.time(), end_time=0)

    urls = [
        f"{host}/",
        f"{host}/api/health",
        f"{host}/about",
        f"{host}/services",
    ]
    concurrent = 25  # ~60% of expected peak

    connector = aiohttp.TCPConnector(limit=50)
    async with aiohttp.ClientSession(connector=connector) as session:
        end = time.monotonic() + duration_s
        iteration = 0
        while time.monotonic() < end:
            iteration += 1
            tasks = [
                http_request(session, "GET", urls[i % len(urls)])
                for i in range(concurrent)
            ]
            results = await asyncio.gather(*tasks)
            report.results.extend(results)

            if iteration % 30 == 0:
                elapsed = time.monotonic() - (time.time() - report.start_time + report.start_time - time.time())
                fr = len([r for r in report.results if not r.success]) / len(report.results)
                lats = sorted(r.latency_ms for r in report.results)
                p95 = lats[int(len(lats) * 0.95)] if lats else 0
                print(f"   [{iteration * concurrent} reqs] fail_rate={fr*100:.1f}% p95={p95:.0f}ms")

            await asyncio.sleep(0.5)

    report.end_time = time.time()
    return report


# ---------------------------------------------------------------------------
# Scenario 3 — Breakpoint / Ramp-to-Failure
# ---------------------------------------------------------------------------

async def breakpoint_test(host: str) -> ScenarioReport:
    """
    Incrementally ramp concurrency: 10 → 20 → 50 → 100 → 200 → 500 ...
    Stop when failure rate exceeds 5% or p99 > 10s.
    Detects: the actual concurrency ceiling of the staging server.
    """
    print("\n💥 BREAKPOINT TEST — Ramping to failure...")
    report = ScenarioReport(name="Breakpoint Test", start_time=time.time(), end_time=0)

    steps = [10, 20, 50, 100, 150, 200, 300, 500]
    url = f"{host}/"
    breaking_point = None

    connector = aiohttp.TCPConnector(limit=600)
    async with aiohttp.ClientSession(connector=connector) as session:
        for concurrency in steps:
            step_results = []
            print(f"   → Testing {concurrency} concurrent users...")

            for _ in range(5):  # 5 rounds per concurrency level
                tasks = [http_request(session, "GET", url) for _ in range(concurrency)]
                round_results = await asyncio.gather(*tasks)
                step_results.extend(round_results)
                await asyncio.sleep(0.2)

            report.results.extend(step_results)

            fail_rate = len([r for r in step_results if not r.success]) / len(step_results)
            lats = sorted(r.latency_ms for r in step_results)
            p99 = lats[int(len(lats) * 0.99)] if lats else 0

            print(f"      fail_rate={fail_rate*100:.1f}%  p99={p99:.0f}ms")

            if fail_rate > 0.05 or p99 > 10000:
                breaking_point = concurrency
                print(f"\n   ⚠️  BREAKING POINT DETECTED at {concurrency} concurrent users!")
                print(f"       fail_rate={fail_rate*100:.1f}%  p99={p99:.0f}ms")
                break

    if not breaking_point:
        print(f"\n   ✅ Server handled all load levels (up to {steps[-1]} concurrent users)")

    report.end_time = time.time()
    return report


# ---------------------------------------------------------------------------
# Scenario 4 — DB Bottleneck Test
# ---------------------------------------------------------------------------

async def db_bottleneck_test(host: str) -> ScenarioReport:
    """
    Target read-heavy and write-heavy API endpoints simultaneously.
    Detects: N+1 query issues, missing indexes, connection pool limits,
             Redis cache miss storms, slow query accumulation.
    """
    print("\n🗄️  DB BOTTLENECK TEST — Heavy read/write pressure...")
    report = ScenarioReport(name="DB Bottleneck", start_time=time.time(), end_time=0)

    read_urls = [
        f"{host}/api/health?page={i}&limit=20" for i in range(1, 11)
    ]
    write_url = f"{host}/api/health"

    connector = aiohttp.TCPConnector(limit=50)
    async with aiohttp.ClientSession(connector=connector) as session:

        # Phase 1: Read storm (cache miss simulation)
        print("   → Phase 1: Read storm (cache miss simulation)...")
        tasks = [http_request(session, "GET", url) for url in read_urls * 10]
        results = await asyncio.gather(*tasks)
        report.results.extend(results)

        await asyncio.sleep(1)

        # Phase 2: Mixed read/write under load
        print("   → Phase 2: Concurrent read + write pressure...")
        for batch in range(10):
            read_tasks = [
                http_request(session, "GET", f"{host}/api/health?page={i}")
                for i in range(1, 6)
            ]
            write_tasks = [
                http_request(
                    session, "GET", write_url,
                    json={"title": f"Load test {batch}-{i}", "test": True},
                    headers={"Content-Type": "application/json"}
                )
                for i in range(3)
            ]
            results = await asyncio.gather(*read_tasks, *write_tasks)
            report.results.extend(results)
            await asyncio.sleep(0.3)

        # Phase 3: Search endpoint (most expensive — full-text / index scan)
        print("   → Phase 3: Search endpoint stress...")
        search_terms = ["project", "user", "invoice", "report", "admin"]
        tasks = [
            http_request(session, "GET", f"{host}/api/health?q={term}&page={i}")
            for term in search_terms
            for i in range(1, 6)
        ]
        results = await asyncio.gather(*tasks)
        report.results.extend(results)

    report.end_time = time.time()
    return report


# ---------------------------------------------------------------------------
# Report export
# ---------------------------------------------------------------------------

def export_csv(report: ScenarioReport, path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["timestamp","url","method","status","latency_ms","error","success"])
        writer.writeheader()
        for r in report.results:
            writer.writerow({
                "timestamp": datetime.fromtimestamp(r.timestamp).isoformat(),
                "url": r.url,
                "method": r.method,
                "status": r.status,
                "latency_ms": f"{r.latency_ms:.2f}",
                "error": r.error or "",
                "success": r.success,
            })
    print(f"   CSV saved: {path}")


def export_json_summary(reports: List[ScenarioReport], path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    summary = []
    for r in reports:
        summary.append({
            "scenario": r.name,
            "duration_s": round(r.duration_s, 2),
            "total_requests": r.total,
            "failures": len(r.failures),
            "failure_rate_pct": round(r.failure_rate * 100, 2),
            "avg_latency_ms": round(r.avg_latency, 1),
            "p95_latency_ms": round(r.p95_latency, 1),
            "p99_latency_ms": round(r.p99_latency, 1),
            "rps": round(r.rps, 1),
            "status": "PASS" if r.failure_rate < 0.01 else "FAIL",
        })
    with open(path, "w") as f:
        json.dump({"generated": datetime.now().isoformat(), "results": summary}, f, indent=2)
    print(f"   JSON saved: {path}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

async def main():
    parser = argparse.ArgumentParser(description="ASIRVO Stress Test Scenarios")
    parser.add_argument("--host", default=os.getenv("STAGING_URL", "https://staging.asirvo.com"), help="Staging host URL")
    parser.add_argument("--scenario", choices=["spike", "soak", "breakpoint", "db", "all"], default="all")
    parser.add_argument("--soak-duration", type=int, default=120, help="Soak test duration in seconds")
    parser.add_argument("--output", default="../results", help="Output directory for reports")
    args = parser.parse_args()

    host = args.host.rstrip("/")
    print(f"\n{'═' * 55}")
    print(f"  ASIRVO STRESS TEST SUITE")
    print(f"  Target : {host}")
    print(f"  Scenario: {args.scenario}")
    print(f"{'═' * 55}")

    reports = []
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")

    if args.scenario in ("spike", "all"):
        r = await spike_test(host)
        r.print_summary()
        export_csv(r, f"{args.output}/spike_{ts}.csv")
        reports.append(r)

    if args.scenario in ("soak", "all"):
        r = await soak_test(host, duration_s=args.soak_duration)
        r.print_summary()
        export_csv(r, f"{args.output}/soak_{ts}.csv")
        reports.append(r)

    if args.scenario in ("breakpoint", "all"):
        r = await breakpoint_test(host)
        r.print_summary()
        export_csv(r, f"{args.output}/breakpoint_{ts}.csv")
        reports.append(r)

    if args.scenario in ("db", "all"):
        r = await db_bottleneck_test(host)
        r.print_summary()
        export_csv(r, f"{args.output}/db_bottleneck_{ts}.csv")
        reports.append(r)

    if reports:
        export_json_summary(reports, f"{args.output}/summary_{ts}.json")

    print(f"\n{'═' * 55}")
    print(f"  All scenarios complete.")
    print(f"  Reports saved to: {os.path.abspath(args.output)}")
    print(f"{'═' * 55}\n")


if __name__ == "__main__":
    asyncio.run(main())
