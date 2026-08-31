const User = require("../models/User")
const generateToken = require("../utils/generateToken")

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    )

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    res.status(200).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("LOGIN ERROR:", error)

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    })
  }
}

// GET /api/auth/me
const getMe = async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  })
}

module.exports = {
  login,
  getMe,
}
