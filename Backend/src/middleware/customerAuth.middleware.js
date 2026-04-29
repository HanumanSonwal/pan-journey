import cookie from "cookie";
import jwt from "jsonwebtoken";
import User from "../modules/user/user.model.js"; // 🔥 adjust path

export const protectCustomer = async (req, res, next) => {
  try {
    const rawCookies = req.headers.cookie;

    if (!rawCookies) {
      return res.status(401).json({ message: "No cookies" });
    }

    const parsed = cookie.parse(rawCookies);

    let token =
      parsed["next-auth.session-token"] ||
      parsed["__Secure-next-auth.session-token"];

    if (!token) {
      console.log("❌ No token in cookies:", parsed);
      return res.status(401).json({ message: "No token" });
    }

    token = decodeURIComponent(token);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch (err) {
      console.log("❌ JWT ERROR:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account deactivated" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log("❌ AUTH ERROR:", err.message);
    return res.status(500).json({ message: "Auth middleware failed" });
  }
};
