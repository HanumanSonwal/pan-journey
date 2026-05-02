import User from "../../user/user.model.js";

export const findOrCreateAndMergeUser = async ({
  email,
  mobile,
  name,
  avatar,
  googleId,
  provider,
}) => {
  try {
    console.log("🟡 AUTH SERVICE HIT");
    console.log("📥 INPUT:", { email, mobile, name, googleId, provider });

    // 🔥 NORMALIZE
    if (email) email = email.toLowerCase().trim();
    if (mobile) mobile = mobile.trim();

    let user = null;

    // =========================
    // 🔥 PRIORITY 1: GOOGLE ID
    // =========================
    if (googleId) {
      user = await User.findOne({ googleId });
      if (user) {
        console.log("✅ USER FOUND BY GOOGLE ID:", user._id);
        return user;
      }
    }

    // =========================
    // 🔥 PRIORITY 2: EMAIL
    // =========================
    if (email) {
      user = await User.findOne({ email });
      if (user) {
        console.log("✅ USER FOUND BY EMAIL:", user._id);
      }
    }

    // =========================
    // 🔥 PRIORITY 3: MOBILE
    // =========================
    if (!user && mobile) {
      user = await User.findOne({ mobile });
      if (user) {
        console.log("✅ USER FOUND BY MOBILE:", user._id);
      }
    }

    // =========================
    // 🔥 EXISTING USER MERGE
    // =========================
    if (user) {
      console.log("🔄 MERGING USER:", user._id);

      // merge fields
      if (email && !user.email) user.email = email;
      if (mobile && !user.mobile) user.mobile = mobile;

      if (name && !user.name) user.name = name;
      if (avatar && !user.avatar) user.avatar = avatar;

      if (googleId && !user.googleId) {
        user.googleId = googleId;
      }

      // providers
      user.providers = user.providers || [];
      if (!user.providers.includes(provider)) {
        user.providers.push(provider);
      }

      // verification flags
      if (provider === "google") user.isEmailVerified = true;
      if (provider === "email") user.isEmailVerified = true;
      if (provider === "otp") user.isMobileVerified = true;

      // profile complete
      user.profileCompleted = !!(
        user.name && (user.email || user.mobile)
      );

      await user.save();

      console.log("✅ USER MERGED & SAVED:", user._id);

      return user;
    }

    // =========================
    // 🔥 NEW USER CREATE
    // =========================
    console.log("🆕 CREATING NEW USER");

    const newUserData = {
      email,
      mobile,
      name: name || "",
      avatar: avatar || null,
      googleId: googleId || null,
      providers: [provider],
      type: "customer", // 🔥 MUST

      isEmailVerified:
        provider === "google" || provider === "email",

      isMobileVerified: provider === "otp",

      isActive: true,

      profileCompleted: !!(
        name && (email || mobile)
      ),
    };

    console.log("📦 NEW USER DATA:", newUserData);

    const newUser = await User.create(newUserData);

    console.log("🎉 USER CREATED:", newUser._id);

    return newUser;

  } catch (err) {
    console.log("❌ AUTH SERVICE ERROR:", err.message);

    // 🔥 DUPLICATE SAFETY
    if (err.code === 11000) {
      console.log("⚠️ DUPLICATE DETECTED");

      const existing = await User.findOne({
        $or: [
          { email },
          { mobile },
          { googleId },
        ],
      });

      if (existing) {
        console.log("♻️ RETURNING EXISTING USER:", existing._id);
        return existing;
      }
    }

    throw err;
  }
};