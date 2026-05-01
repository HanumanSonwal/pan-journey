import User from "../../../user/user.model.js";

export const completeProfileService = async (userId, payload) => {
  const { name, email, mobile } = payload;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (name) user.name = name;

  if (email) {
    user.email = email.toLowerCase().trim();
    user.isEmailVerified = true;
  }

  if (mobile) {
    user.mobile = mobile.trim();
    user.isMobileVerified = true;
  }

  if (user.name && (user.email || user.mobile)) {
    user.profileCompleted = true;
  } else {
    user.profileCompleted = false;
  }

  await user.save();

  return user;
};