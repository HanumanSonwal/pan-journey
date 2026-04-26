import User from "../user/user.model.js";

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

    // 🔹 find user
    let user = await User.findOne({ email });

    if (user && user.provider !== "google") {
      user.provider = "google";
      user.isEmailVerified = true;
      await user.save();
    }

    // 🔹 new user create
    if (!user) {
      user = await User.create({
        email,
        name: name || "",
        provider: "google",
        type: "customer",
        isEmailVerified: true,
        isActive: true,
      });
    }

    // 🔹 inactive user block
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