import http from "k6/http";
import { check } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "10s", target: 20 },
    { duration: "5s", target: 0 },
  ],
};

export default function () {
  const response = http.get(`http://${__ENV.HOSTNAME}:8000/api/v1/product`, {
    headers: { Accepts: "application/json" },
  });
  check(response, { "Status is 200": (r) => r.status === 200 });
  check(response, { "Total is 31 ": (r) => (r.json()["total"] = 31) });
}
