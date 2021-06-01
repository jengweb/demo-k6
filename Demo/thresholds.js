import http from "k6/http";

export let options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "30s", target: 20 },
    { duration: "10s", target: 0 },
  ],

  thresholds: {
    http_req_duration: ["p(95)<100"],
    http_req_duration: ["p(99)<200"],
  },
};

export default function () {
  http.get("http://localhost:8000/api/v1/product", {
    headers: { Accepts: "application/json" },
  });
}
