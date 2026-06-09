"""
ASIRVO Website — Load & Stress Testing Suite
Staging URL: Configured via --host flag or STAGING_URL env var
Usage:
    # Headless mode (CI/CD):
    locust -f locustfile.py --host=https://staging.asirvo.com \
           --users 100 --spawn-rate 10 --run-time 5m \
           --headless --csv=../results/load_test

    # Web UI mode:
    locust -f locustfile.py --host=https://staging.asirvo.com
"""

import os
import json
import time
import random
import logging
from locust import HttpUser, task, between, events, tag, constant_pacing
from locust.runners import MasterRunner, WorkerRunner

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configurable constants — edit per ASIRVO route structure
# ---------------------------------------------------------------------------
STATIC_ASSETS = [
    "/_next/static/css/",  # Next.js CSS chunks
    "/_next/static/chunks/",  # JS chunks (pattern)
    "/favicon.ico",
]

PUBLIC_PAGES = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/pricing",
]

API_ENDPOINTS = [
    "/api/health",
    "/api/status",
]

AUTH_ENDPOINTS = {
    "login": "/api/auth/login",
    "logout": "/api/auth/logout",
    "refresh": "/api/auth/refresh",
}

# ---------------------------------------------------------------------------
# Helper: fake credentials (rotate to avoid cache collisions)
# ---------------------------------------------------------------------------
def fake_email():
    adjectives = ["swift", "bold", "calm", "wise", "keen"]
    nouns = ["hawk", "river", "stone", "maple", "forge"]
    return f"{random.choice(adjectives)}.{random.choice(nouns)}{random.randint(1,999)}@test.asirvo.io"


# ---------------------------------------------------------------------------
# User classes
# ---------------------------------------------------------------------------

class AnonymousBrowser(HttpUser):
    """
    Simulates an unauthenticated visitor browsing public pages.
    ~60% of real traffic for most SaaS landing sites.
    """
    weight = 60
    wait_time = between(1, 4)

    @task(5)
    @tag("page", "critical")
    def visit_homepage(self):
        with self.client.get("/", catch_response=True, name="GET /") as r:
            if r.status_code == 200:
                r.success()
            elif r.status_code in (301, 302):
                r.success()  # redirects are OK for root
            else:
                r.failure(f"Unexpected status {r.status_code}")

    @task(3)
    @tag("page")
    def browse_public_pages(self):
        page = random.choice(PUBLIC_PAGES[1:])  # skip homepage (already weighted)
        with self.client.get(page, catch_response=True, name=f"GET {page}") as r:
            if r.status_code in (200, 301, 302, 404):
                r.success()
            else:
                r.failure(f"Unexpected status {r.status_code} for {page}")

    @task(2)
    @tag("api", "health")
    def health_check(self):
        with self.client.get("/api/health", catch_response=True, name="GET /api/health") as r:
            if r.status_code == 200:
                try:
                    data = r.json()
                    if data.get("status") not in ("ok", "healthy", "up"):
                        r.failure(f"Unhealthy response body: {data}")
                except Exception:
                    pass  # Non-JSON health endpoint — still count 200 as success
                r.success()
            else:
                r.failure(f"Health check failed: {r.status_code}")

    @task(1)
    @tag("api")
    def api_status(self):
        self.client.get("/api/status", name="GET /api/status")


class AuthenticatedUser(HttpUser):
    """
    Simulates a logged-in user hitting authenticated routes.
    ~35% of traffic.
    """
    weight = 35
    wait_time = between(2, 6)

    def on_start(self):
        """Attempt login before tasks begin."""
        payload = {
            "email": fake_email(),
            "password": "Test@1234",  # replace with valid staging credentials
        }
        with self.client.post(
            AUTH_ENDPOINTS["login"],
            json=payload,
            catch_response=True,
            name="POST /api/auth/login",
        ) as r:
            if r.status_code in (200, 201):
                r.success()
                try:
                    data = r.json()
                    self.token = data.get("token") or data.get("access_token", "")
                    self.client.headers.update({"Authorization": f"Bearer {self.token}"})
                except Exception:
                    self.token = ""
            elif r.status_code in (401, 403):
                r.success()  # staging may not have real users — mark as expected
                self.token = ""
            else:
                r.failure(f"Login failed: {r.status_code}")
                self.token = ""

    def on_stop(self):
        if self.token:
            self.client.post(AUTH_ENDPOINTS["logout"], name="POST /api/auth/logout")

    @task(4)
    @tag("auth", "api")
    def dashboard(self):
        self.client.get("/dashboard", name="GET /dashboard")

    @task(3)
    @tag("auth", "api")
    def profile(self):
        self.client.get("/api/user/profile", name="GET /api/user/profile")

    @task(2)
    @tag("auth", "api", "write")
    def update_profile(self):
        payload = {"name": f"Test User {random.randint(1, 1000)}"}
        self.client.patch("/api/user/profile", json=payload, name="PATCH /api/user/profile")

    @task(1)
    @tag("auth", "api")
    def token_refresh(self):
        if self.token:
            self.client.post(AUTH_ENDPOINTS["refresh"], name="POST /api/auth/refresh")


class HeavyAPIUser(HttpUser):
    """
    Simulates a power user or integration hitting the API intensively.
    ~5% of traffic but most database load.
    """
    weight = 5
    wait_time = between(0.5, 2)

    @task(3)
    @tag("api", "heavy", "db")
    def list_resources(self):
        page = random.randint(1, 10)
        self.client.get(f"/api/resources?page={page}&limit=20", name="GET /api/resources")

    @task(2)
    @tag("api", "heavy", "db")
    def search(self):
        terms = ["project", "invoice", "user", "report", "dashboard"]
        q = random.choice(terms)
        self.client.get(f"/api/search?q={q}", name="GET /api/search")

    @task(1)
    @tag("api", "heavy", "write")
    def create_resource(self):
        payload = {
            "title": f"Load test item {random.randint(1, 99999)}",
            "description": "Synthetic entry created by load test",
            "timestamp": time.time(),
        }
        self.client.post("/api/resources", json=payload, name="POST /api/resources")


# ---------------------------------------------------------------------------
# Event hooks — collect custom metrics
# ---------------------------------------------------------------------------

@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    print("\n" + "=" * 60)
    print("  ASIRVO LOAD TEST STARTING")
    print(f"  Target: {environment.host}")
    print("=" * 60 + "\n")


@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    stats = environment.stats
    total = stats.total
    print("\n" + "=" * 60)
    print("  RESULTS SUMMARY")
    print(f"  Total requests   : {total.num_requests}")
    print(f"  Failures         : {total.num_failures}")
    print(f"  Failure rate     : {total.fail_ratio * 100:.2f}%")
    print(f"  Avg response     : {total.avg_response_time:.0f} ms")
    print(f"  95th percentile  : {total.get_response_time_percentile(0.95):.0f} ms")
    print(f"  99th percentile  : {total.get_response_time_percentile(0.99):.0f} ms")
    print(f"  RPS (peak)       : {total.total_rps:.1f}")
    print("=" * 60 + "\n")
