import transporter from "../../../../config/mailer.js";
import { getEmailTemplate } from "../../../../utils/emailTemplateReader.js";
import { generateOTP } from "../../../../utils/generateOtp.js";
import { findOrCreateAndMergeUser } from "../auth.service.js";
import EmailOTP from "./email.model.js";

export const sendEmailOtpService = async (email) => {
  if (!email) throw new Error("Email required");

  const otp = generateOTP();

  await EmailOTP.deleteMany({ email });

  await EmailOTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  const htmlTemplate = getEmailTemplate(otp);

  await transporter.sendMail({
    from: `"Travel App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: htmlTemplate,
  });

  return true;
};

export const verifyEmailOtpService = async (email, otp) => {
  const record = await EmailOTP.findOne({ email, otp });

  if (!record) {
    throw new Error("Invalid or expired OTP");
  }

  await EmailOTP.deleteOne({ email });

  const user = await findOrCreateAndMergeUser({
    email,
    provider: "email",
  });

  return {
      profileCompleted: !!user.name,   // true if name exists
    email: user.email || null,
    name: user.name || null,
    avatar: user.avatar || null,
    googleId: user.googleId || null,
    isEmailVerified: user.isEmailVerified ?? false,
    isMobileVerified: user.isMobileVerified ?? false,
  
     providers: user.providers || [], 
    // profileCompleted: !!user.name,
    // email: user.email,
    // name: user.name,
    // avatar: user.avatar,
    // googleId:user.googleId,
    // isEmailVerified:user.isEmailVerified,
    // isMobileVerified:user.isMobileVerified,
    // type:user.type
  };
};
