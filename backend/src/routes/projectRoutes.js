const express = require("express")

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController")

const upload = require("../middleware/upload")
const protect = require("../middleware/auth")

const router = express.Router()

router.get("/", getProjects)
router.get("/:id", getProject)

router.post("/", protect, upload.single("image"), createProject)
router.put("/:id", protect, upload.single("image"), updateProject)
router.delete("/:id", protect, deleteProject)

module.exports = router
