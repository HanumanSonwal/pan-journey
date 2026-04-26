import { sendError } from "../utils/ApiResponse.js";
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

    if (!user.isActive) {
      return sendError(res, "Account is inactive", 403);
    }

    if (!user.roleIsActive) {
      return sendError(res, "Role is inactive", 403);
    }
    if (user.role === "admin" || user.isSystemRole) {
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
