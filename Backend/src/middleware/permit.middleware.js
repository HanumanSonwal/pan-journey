// const permit = (permission) => {
//   return (req, res, next) => {
//     try {
//       const permissions = req.permissions || [];

//       // 🔥 admin bypass (optional but recommended)
//       if (req.role === "admin") return next();

//       if (!permissions.includes(permission)) {
//         return res.status(403).json({
//           success: false,
//           message: "Forbidden: You don't have permission",
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

export const permit = (permission) => {
  return (req, res, next) => {
    try {
      const permissions = req.permissions || [];

      // 🔥 admin bypass
      if (req.role === "admin") return next();

      if (!permissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - No permission",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Permission check failed",
      });
    }
  };
};

export default permit;
