const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login hit with", email);
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  const validPwd = await user.checkPwd(password);
  if (!validPwd) {
    return res.status(401).send({
      message: "Wrong Credentials",
    });
  }

  const token = generateToken(user);
  res.status(200).send({
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    },
  });
});

router.post("/register", async (req, res) => {
  console.log("Register endpoint hit", req.body);
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send({
      message: "User already exists",
    });
  }

  const user = new User({
    email,
    password,
  });

  await user.save();

  const token = generateToken(user);

  res.status(201).send({
    message: "User created",
    data: {
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    },
  });
});

module.exports = router;
