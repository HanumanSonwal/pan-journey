import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../modules/user/user.model.js"; // 🔥 adjust path

export const protectCustomer = async (req, res, next) => {
  try {
    // 🔹 1. Get cookies
    const rawCookies = req.headers.cookie;

    if (!rawCookies) {
      return res.status(401).json({ message: "No cookies" });
    }

    const parsed = cookie.parse(rawCookies);

    // 🔹 2. Get token (handle dev + prod)
    let token =
      parsed["next-auth.session-token"] ||
      parsed["__Secure-next-auth.session-token"];

    if (!token) {
      console.log("❌ No token in cookies:", parsed);
      return res.status(401).json({ message: "No token" });
    }

    // 🔹 3. Decode URL encoding (important)
    token = decodeURIComponent(token);

    // 🔹 4. Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch (err) {
      console.log("❌ JWT ERROR:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    // 🔹 5. Validate payload
    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // 🔥 6. DB VALIDATION (VERY IMPORTANT)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account deactivated" });
    }

    // 🔹 7. Attach user
    req.user = user;

    // 🔹 Optional logs (dev only)
    console.log("✅ AUTH SUCCESS:", user._id);

    next();
  } catch (err) {
    console.log("❌ AUTH ERROR:", err.message);
    return res.status(500).json({ message: "Auth middleware failed" });
  }
};