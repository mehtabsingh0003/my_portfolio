const express = require("express")

const {
  getProfile,
  getGithub,
  getLeetcode,
  updateProfile,
} = require("../controllers/profileController")

const protect = require("../middleware/auth")

const router = express.Router()

// =====================================================
// PUBLIC
// =====================================================

// Get complete portfolio profile
// Includes GitHub + LeetCode statistics
router.get("/", getProfile)

// Get GitHub statistics
router.get("/github", getGithub)

// Get LeetCode statistics
router.get("/leetcode", getLeetcode)

// =====================================================
// ADMIN
// =====================================================

// Update portfolio profile
router.put("/", protect, updateProfile)

module.exports = router