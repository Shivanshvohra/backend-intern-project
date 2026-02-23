exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: "Forbidden: You do not have permission to access this resource",
      });
    }

    next();
  };
};