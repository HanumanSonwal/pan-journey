import User from "../../user/user.model.js";

export const findOrCreateAndMergeUser = async ({
  email,
  mobile,
  name,
  avatar,
  googleId,
  provider,
}) => {
  if (email) email = email.toLowerCase().trim();
  if (mobile) mobile = mobile.trim();

  let user = null;

  if (googleId) {
    user = await User.findOne({ googleId });
    if (user) return user;
  }

  if (email) {
    user = await User.findOne({ email });
  }

  if (!user && mobile) {
    user = await User.findOne({ mobile });
  }

  if (user) {
    if (name && !user.name) user.name = name;
    if (avatar && !user.avatar) user.avatar = avatar;

    if (googleId && !user.googleId) {
      user.googleId = googleId;
    }

    user.providers = user.providers || [];
    if (!user.providers.includes(provider)) {
      user.providers.push(provider);
    }

    if (provider === "google") user.isEmailVerified = true;

    try {
      await user.save();
    } catch (err) {
      // 🔥 DUPLICATE HANDLE
      if (err.code === 11000) {
        const existing = await User.findOne({ googleId });
        if (existing) return existing;
      }
      throw err;
    }

    return user;
  }

  try {
    return await User.create({
      email,
      mobile,
      name: name || "",
      avatar: avatar || null,
      googleId: googleId || null,
      providers: [provider],
      type: "customer",
      isEmailVerified: provider === "google",
      isActive: true,
    });
  } catch (err) {
    if (err.code === 11000) {
      const existing = await User.findOne({ googleId });
      if (existing) return existing;
    }
    throw err;
  }
};
