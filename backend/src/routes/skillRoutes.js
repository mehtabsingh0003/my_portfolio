const express = require("express")

const {
  getSkills,
  getPublicSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController")

const protect = require("../middleware/auth")

const router = express.Router()

// =========================
// PUBLIC
// =========================

// Get published skills
router.get("/public", getPublicSkills)

// =========================
// ADMIN
// =========================

// Get all skills
router.get("/", protect, getSkills)

// Get one skill
router.get("/:id", protect, getSkill)

// Create skill
router.post("/", protect, createSkill)

// Update skill
router.put("/:id", protect, updateSkill)

// Delete skill
router.delete("/:id", protect, deleteSkill)

module.exports = router