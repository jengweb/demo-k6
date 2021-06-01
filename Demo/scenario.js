import http from "k6/http";
import { check } from "k6";

export let options = {
  scenarios: {
    product_list: {
      executor: "ramping-vus",
      exec: "product_list",
      stages: [
        { duration: "30s", target: 20 },
        { duration: "30s", target: 20 },
        { duration: "10s", target: 0 },
      ],
    },
    product_detail: {
      executor: "ramping-vus",
      exec: "product_detail",
      stages: [
        { duration: "30s", target: 20 },
        { duration: "30s", target: 20 },
        { duration: "10s", target: 0 },
      ],
    },
  },
};

export function product_list() {
  const response = http.get("http://localhost:8000/api/v1/product", {
    headers: { Accepts: "application/json" },
    tags: { my_custom_tag: 'product_list' },
  });
  check(response, { "Product List Status is 200": (r) => r.status === 200 });
  check(response, { "Product List Total is 31 ": (r) => (r.json()["total"] = 31) });
}

export function product_detail() {
  const response = http.get(
    "http://localhost:8000/api/v1/product/2",
    {
      headers: { Accepts: "application/json" },
      tags: { my_custom_tag: 'product_detail' },
    }
  );
  check(response, { "Product Detail Status is 200": (r) => r.status === 200 });
  check(response, {
    "Product Detail Check Product Name is 43 Piece dinner Set": (r) =>
      (r.json()["product_name"] = "43 Piece dinner Set"),
  });
}
