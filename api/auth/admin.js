const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else
    res.status(401).json({
      message: "you are not an admin",
    });
};

export default isAdmin;
