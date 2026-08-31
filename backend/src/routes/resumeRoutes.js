const express = require("express")

const {
  createResume,
  getResumes,
  getCurrentResume,
  updateResume,
  deleteResume,
  viewResume,
  downloadResume,
} = require("../controllers/resumeController")

const { uploadResume } = require("../middleware/upload")
const protect = require("../middleware/auth")

const router = express.Router()

// =========================
// PUBLIC
// =========================

// GET all resumes
router.get("/", getResumes)

// GET current resume
router.get("/current", getCurrentResume)

// VIEW resume PDF in browser
router.get("/:id/view", viewResume)

// DOWNLOAD resume PDF
router.get("/:id/download", downloadResume)

// =========================
// ADMIN
// =========================

// Upload resume
router.post(
  "/",
  protect,
  uploadResume.single("resume"),
  createResume
)

// Edit resume
// Can update title and/or replace PDF
router.put(
  "/:id",
  protect,
  uploadResume.single("resume"),
  updateResume
)

// Delete resume
router.delete(
  "/:id",
  protect,
  deleteResume
)

module.exports = router