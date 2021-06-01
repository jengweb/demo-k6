import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: "30s", target: 50 },

    // Stay at rest on 5 VUs for 10s
    { duration: "30s", target: 50 },

    // // Stay at rest on 5 VUs for 10s
    // { duration: "20s", target: 80 },

    // // Stay at rest on 5 VUs for 10s
    // { duration: "20s", target: 80 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: "10s", target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<100'],
    http_req_duration: ['p(99)<200'],
  },
  
};

export default function () {
  const response = http.get("http://localhost:8000/api/v1/product", {
    headers: { Accepts: "application/json" },
  });
  check(response, { "Status is 200": (r) => r.status === 200 });
  check(response, { "Total is 31 ": (r) => r.json()["total"] = 31 });
  // sleep(0.3);
}
