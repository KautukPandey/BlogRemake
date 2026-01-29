const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = { register };
