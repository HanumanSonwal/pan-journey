import { sendError } from "../utils/ApiResponse.js"; // ensure import
import { hasPermission } from "../utils/permission.util.js";

const actionMap = {
  read: "view",
  write: "create",
  update: "update",
  delete: "delete",
};

export const checkPermission = (module, action) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return sendError(res, "Unauthorized", 401);
    }

    // 🔥 ADMIN BYPASS
    if (user.roleName === "admin" || user.isSystemRole) {
      return next();
    }

    if (!hasPermission(user.permissions, module, action)) {
      const actionText = actionMap[action] || action;

      return sendError(
        res,
        `You don’t have permission to ${actionText} ${module}`,
        403,
      );
    }

    next();
  };
};
