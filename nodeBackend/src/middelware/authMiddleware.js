const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({
      message: "Access denied. No token provided.",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decodedToken);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).send({
        message: "Access denied. User not found.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
