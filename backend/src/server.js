require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const messageRoutes = require("./routes/messageRoutes")
const resumeRoutes = require("./routes/resumeRoutes")
const skillRoutes = require("./routes/skillRoutes")
const profileRoutes = require("./routes/profileRoutes")

const app = express()

// =====================================================
// DATABASE
// =====================================================

connectDB()


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use(express.json())


// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth", authRoutes)

app.use("/api/projects", projectRoutes)

app.use("/api/messages", messageRoutes)

app.use("/api/resume", resumeRoutes)

app.use("/api/skills", skillRoutes)

app.use("/api/profile", profileRoutes)


// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Portfolio API is running",
  })
})


// =====================================================
// 404
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  })
})


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("UNHANDLED ERROR:", err)

  res.status(err.status || 500).json({
    message:
      err.message ||
      "Something went wrong",
  })
})


// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("=================================")
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 API: http://localhost:${PORT}/api`)
  console.log(`👤 Profile: http://localhost:${PORT}/api/profile`)
  console.log(
    `🐙 GitHub Token: ${
      process.env.GITHUB_TOKEN
        ? "Loaded"
        : "NOT FOUND"
    }`
  )
  console.log("=================================")
})