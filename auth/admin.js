const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    // Forbidden, user is not an admin
    res.status(403).json({
      message: "Resource forbidden: current user does not have ADMIN role",
    });
  }
};

export default isAdmin;
