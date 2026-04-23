// const permit = (permission) => {
//   return (req, res, next) => {
//     try {
//       const userPermissions = req.permissions || [];

//       // admin bypass
//       if (req.role === "admin") return next();

//       // check permission
//       if (!userPermissions.includes(permission)) {
//         return res.status(403).json({
//           success: false,
//           message: `Forbidden: Missing permission -> ${permission}`,
//         });
//       }

//       next();
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Permission check failed",
//       });
//     }
//   };
// };

// export default permit;

// export const checkPermission = (module, action) => {
//   return (req, res, next) => {
//     const permissions = req.user?.permissions;

//     if (!permissions) {
//       return res.status(403).json({
//         success: false,
//         message: "No permissions found",
//       });
//     }

//     const modulePermission = permissions[module];

//     if (!modulePermission || modulePermission[action] !== true) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     next();
//   };
// };

export const checkPermission = (module, action) => {
  return (req, res, next) => {
    const user = req.user;

    // 👑 SUPER ADMIN / ADMIN BYPASS
   if (user?.role?.name === "admin" || user?.isSystemRole) {
  return next();
}

    const permissions = req.permissions;

    if (!permissions?.[module]?.[action]) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};