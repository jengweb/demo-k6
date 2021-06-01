import http from "k6/http";

export let options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "30s", target: 20 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  http.get("http://localhost:8000/api/v1/product", {
    headers: { Accepts: "application/json" },
  });
}
