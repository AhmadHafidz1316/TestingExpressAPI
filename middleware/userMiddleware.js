require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

exports.authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      res.status(401).json({
        status: 401,
        message: "Authorization Undifined",
      })
    );
  }

  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      res.status(401).json({
        error: error,
        message: "Undifined Token",
      })
    );
  }

  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      res.status(401).json({
        status: 401,
        message: ["Token Expired Because User Has Been Deleted"],
      })
    );
  }

  req.user = currentUser;

  next();
};

exports.permissionUser = (...roles) => {
  return async (req, res, next) => {
    const rolesData = await Role.findByPk(req.user.role_id);

    const roleName = rolesData.name;

    if (!roles.includes(roleName)) {
      return next(
        res.status(403).json({
          status: 403,
          message: "You Can't Access This Page",
        })
      );
    }

    next();
  };
};
