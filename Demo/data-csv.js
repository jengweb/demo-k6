import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

export let options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "30s", target: 20 },
    { duration: "10s", target: 0 },
  ],
};

const product = new SharedArray("another data name", function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open("./product-id.csv"), { header: true }).data;
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
