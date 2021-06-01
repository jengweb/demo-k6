import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";

export let options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "30s", target: 20 },
    { duration: "10s", target: 0 },
  ],
};

const product = new SharedArray("Product ID", function () {
  return JSON.parse(open("./product-id.json")).products;
});

export default function () {
  const response = http.get(
    "http://localhost:8000/api/v1/product/" + product[0].id,
    {
      headers: { Accepts: "application/json" },
    }
  );
  check(response, { "Status is 200": (r) => r.status === 200 });
  check(response, {
    "Product Name is 43 Piece dinner Set": (r) =>
      (r.json()["product_name"] = "43 Piece dinner Set"),
  });
}
