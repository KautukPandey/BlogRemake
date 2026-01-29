const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const user = await User.create({ name, email, password })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )

  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000
  })

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })
}


const login = async(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
    return res.status(400).json({
      message: "All fields are required",
    }); 
  }
  const user = await User.findOne({email}).select('+password')
  if(!user){
    return res.status(400).json({ message: "User does not exists" })
  }


  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    {id: user._id},
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  )
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000
  })

  return res.status(200).json({
  message: 'Login successful',
  user: {
    id: user._id,
    name: user.name,
    email: user.email
    }
  })  
}


module.exports = { register, login };
