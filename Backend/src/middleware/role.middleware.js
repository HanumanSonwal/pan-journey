import { sendError } from "../utils/ApiResponse.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 1️⃣ check role exists
    if (!req.user || !req.user.role) {
      return sendError(res, "No role assigned", 403);
    }

    // 2️⃣ get role name from populated role
    const userRoleName = req.user.role.name; // ⭐ IMPORTANT

    // 3️⃣ check allowed roles
    if (!allowedRoles.includes(userRoleName)) {
      return sendError(res, "Access denied", 403);
    }

    next();
  };
};
