
import jwt from "jsonwebtoken";
import User from "../modules/user/user.model.js";
import { sendError } from "../utils/ApiResponse.js";
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .select("-password")
      .populate({
        path: "role",
        populate: { path: "permissions" },
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 STANDARD OUTPUT FORMAT
    req.user = user;
    req.role = user.role?.name || null;

    req.permissions =
      user.role?.permissions?.map((p) => p.name) || [];

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// export const protect = async (req, res, next) => {
//   try {
//     let token;
//     const authHeader = req.headers.authorization;

//     if (authHeader && authHeader.startsWith("Bearer ")) {
//       token = authHeader.split(" ")[1];
//     }

//     if (!token && req.cookies?.accessToken) {
//       token = req.cookies.accessToken;
//     }

//     if (!token) {
//       return sendError(res, "Unauthorized - No token provided", 401);
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id)
//       .select("-password")
//       .populate({
//         path: "role",
//         populate: {
//           path: "permissions",
//         },
//       });

//     if (!user) {
//       return sendError(res, "User not found", 401);
//     }

//     req.user = user;

//     // 🔥 THIS IS THE IMPORTANT PART (STEP 3 FIX)
//     req.permissions =
//       user.role?.permissions?.map((p) => p.name) || [];

//     req.role = user.role?.name || null;

//     next();
//   } catch (error) {
//     return sendError(res, "Invalid or expired token", 401);
//   }
// };

