import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config();
console.log(process.env.RAZORPAY_KEY_ID);

console.log(process.env.RAZORPAY_SECRET);
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
// const RAZORPAY_KEY_ID="xxxx"
//  const RAZORPAY_SECRET="xxxx"
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});

export default razorpay;
