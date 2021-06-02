import http from "k6/http";

export let options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "10s", target: 20 },
    { duration: "5s", target: 0 },
  ],

  thresholds: {
    http_req_duration: ["p(95)<100", "p(99.9)<100"],
  },

  summaryTrendStats: ["p(95)", "p(99)", "count"],
};

export default function () {
  http.get("http://localhost:8000/api/v1/product", {
    headers: { Accepts: "application/json" },
  });
}
