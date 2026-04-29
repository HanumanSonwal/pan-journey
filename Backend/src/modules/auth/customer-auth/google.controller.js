import User from "../../user/user.model.js";

export const googleLogin = async (req, res) => {
  try {
    const { email, name } = req.body;

    // 🔹 validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 🔥 1. पहले email से find
    let user = await User.findOne({ email });

    // 🔥 2. अगर email नहीं मिला → mobile से check (merge case)
    if (!user && req.body.mobile) {
      user = await User.findOne({ mobile: req.body.mobile });
    }

    if (user) {
      // 🔥 update existing user (merge)
      user.email = email || user.email;
      user.name = name || user.name;
      user.provider = "google";
      user.isEmailVerified = true;

      await user.save();
    } else {
      // 🔥 new user
      user = await User.create({
        email,
        name: name || "",
        provider: "google",
        type: "customer",
        isEmailVerified: true,
        isActive: true,
      });
    }

    // 🔥 inactive user block
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    return res.json({
      success: true,
      message: "Google login successful",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile || null,
        type: user.type,
      },
    });
  } catch (err) {
    console.log("❌ GOOGLE LOGIN ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};
