import Razorpay from "razorpay";
// import dotenv from "dotenv";
// dotenv.config();
// console.log(
//  process.env.RAZORPAY_KEY_ID
// );

// console.log(
//  process.env.RAZORPAY_SECRET
// );
// const RAZORPAY_KEY_ID="xxxx"
//  const RAZORPAY_SECRET="xxxx"
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET
});

export default razorpay;