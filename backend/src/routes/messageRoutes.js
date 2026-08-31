const express = require("express")

const {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
} = require("../controllers/messageController")

const protect = require("../middleware/auth")

const router = express.Router()

router.post("/", createMessage)

router.get("/", protect, getMessages)
router.put("/:id/read", protect, markMessageRead)
router.delete("/:id", protect, deleteMessage)

module.exports = router
