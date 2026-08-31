const Message = require("../models/Message")

// POST /api/messages  (public)
const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      })
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    })

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    })
  } catch (error) {
    console.error("CREATE MESSAGE ERROR:", error)

    res.status(400).json({
      message: "Failed to send message",
      error: error.message,
    })
  }
}

// GET /api/messages  (protected)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })

    res.status(200).json(messages)
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    })
  }
}

// PUT /api/messages/:id/read  (protected)
const markMessageRead = async (req, res) => {
  try {
    const messageDoc = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )

    if (!messageDoc) {
      return res.status(404).json({
        message: "Message not found",
      })
    }

    res.status(200).json(messageDoc)
  } catch (error) {
    console.error("MARK MESSAGE READ ERROR:", error)

    res.status(500).json({
      message: "Failed to update message",
      error: error.message,
    })
  }
}

// DELETE /api/messages/:id  (protected)
const deleteMessage = async (req, res) => {
  try {
    const messageDoc = await Message.findByIdAndDelete(req.params.id)

    if (!messageDoc) {
      return res.status(404).json({
        message: "Message not found",
      })
    }

    res.status(200).json({
      message: "Message deleted successfully",
    })
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error)

    res.status(500).json({
      message: "Failed to delete message",
      error: error.message,
    })
  }
}

module.exports = {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
}
