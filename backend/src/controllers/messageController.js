
const mongoose = require("mongoose");
const Message = require("../models/Message");

// =====================================================
// POST /api/messages (PUBLIC)
// =====================================================

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || "",
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("CREATE MESSAGE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// =====================================================
// GET /api/messages (PROTECTED)
// =====================================================

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

// =====================================================
// PUT /api/messages/:id/read (PROTECTED)
// =====================================================

const markMessageRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const messageDoc = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true, runValidators: true }
    );

    if (!messageDoc) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: messageDoc,
    });
  } catch (error) {
    console.error("MARK MESSAGE READ ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
};

// =====================================================
// DELETE /api/messages/:id (PROTECTED)
// =====================================================

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const messageDoc = await Message.findByIdAndDelete(id);

    if (!messageDoc) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
};
