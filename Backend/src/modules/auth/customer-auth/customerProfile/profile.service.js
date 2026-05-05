import User from "../../../user/user.model.js";

export const getProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  return user;
};


export const updateProfileService = async (userId, payload) => {
  const {
   name,
    avatar,
    nationality,
    maritalStatus,
    anniversary,
    dateOfBirth,
    city,
    state,
  } = payload;

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Basic fields
  if (name !== undefined) user.name = name;
  if (avatar !== undefined) user.avatar = avatar;

  // Profile fields
  if (nationality !== undefined) user.nationality = nationality;
  if (maritalStatus !== undefined) user.maritalStatus = maritalStatus;
  if (anniversary !== undefined) user.anniversary = anniversary;
  if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
  if (city !== undefined) user.city = city;
  if (state !== undefined) user.state = state;

  // Profile completion logic
  user.profileCompleted = !!(
    user.name &&
    (user.email || user.mobile)
  );

  await user.save();
  return user;
};