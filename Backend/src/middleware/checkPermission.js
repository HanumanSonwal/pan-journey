import { hasPermission } from "../utils/permission.util.js";
import { sendError } from "../utils/ApiResponse.js";

const actionMap = {
  read: "view",
  write: "create",
  update: "edit",
  delete: "delete",
};

export const checkPermission = (module, action) => {
  return (req, res, next) => {

    if (req.role === "admin" || req.user?.isSystemRole) {
      return next();
    }

    const permissions = req.permissions;

    if (!hasPermission(permissions, module, action)) {
      const actionText = actionMap[action] || action;

      return sendError(
        res,
        `You don’t have permission to ${actionText} ${module}`,
        403
      );
    }

    next();
  };
};