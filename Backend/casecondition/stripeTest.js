import StripeAdapter from "../src/modules/payments/adapters/stripe.adapter.js"

const gateway =
 new StripeAdapter();

const result =
 await gateway.createOrder({

   amount:10,

   currency:"usd"
 });

console.log(result);