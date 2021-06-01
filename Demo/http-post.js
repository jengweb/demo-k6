import http from "k6/http";

export let options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "30s", target: 20 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  var url = "http://localhost:8000/api/v1/order";
  var body = JSON.stringify({
    cart: [
      {
        product_id: 2,
        quantity: 1,
      },
    ],
    shipping_method: "Kerry",
    shipping_address: "405/37 ถ.มหิดล",
    shipping_sub_district: "ท่าศาลา",
    shipping_district: "เมือง",
    shipping_province: "เชียงใหม่",
    shipping_zip_code: "50000",
    recipient_name: "ณัฐญา ชุติบุตร",
    recipient_phone_number: "0970809292",
  });
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post(url, body, params);
}
