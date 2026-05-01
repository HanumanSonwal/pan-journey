
import User from "../../../user/user.model.js";
export const completeProfileService = async (email, name) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  user.name = name;
  await user.save();

  return {
    name: user.name,
    email: user.email,
  };
};