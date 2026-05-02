import User from "../../../user/user.model.js";

export const getProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  return user;
};

export const updateProfileService = async (userId, payload) => {
  const { name, avatar } = payload;

  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  if (name) user.name = name;
  if (avatar) user.avatar = avatar;

  user.profileCompleted = !!(
    user.name && (user.email || user.mobile)
  );

  await user.save();

  return user;
};