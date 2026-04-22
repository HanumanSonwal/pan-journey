const permit = (permission) => {
  return (req, res, next) => {
    try {
      const userPermissions = req.permissions || [];

      // admin bypass
      if (req.role === "admin") return next();

      // check permission
      if (!userPermissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          message: `Forbidden: Missing permission -> ${permission}`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Permission check failed",
      });
    }
  };
};

export default permit;