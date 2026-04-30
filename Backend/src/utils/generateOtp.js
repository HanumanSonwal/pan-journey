import otpGenerator from "otp-generator";

export const generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    specialChars: false
  });
};