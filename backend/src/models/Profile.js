const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema(
  {
    // =====================================================
    // BASIC PROFILE
    // =====================================================

    name: {
      type: String,
      default: "Mehtab Singh",
      trim: true,
    },

    username: {
      type: String,
      default: "mehtabsingh",
      trim: true,
    },

    role: {
      type: String,
      default: "Software Developer",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================================
    // SOCIAL LINKS
    // =====================================================

    github: {
      username: {
        type: String,
        default: "",
        trim: true,
      },

      url: {
        type: String,
        default: "",
        trim: true,
      },
    },

    linkedin: {
      username: {
        type: String,
        default: "",
        trim: true,
      },

      url: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // =====================================================
    // LEETCODE
    // =====================================================

    leetcode: {
      username: {
        type: String,
        default: "",
        trim: true,
      },

      url: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // =====================================================
    // CODING PROFILE DISPLAY
    // These are controlled from admin.
    // Actual statistics will be fetched automatically.
    // =====================================================

    codingProfile: {
      focus: {
        type: String,
        default: "Data Structures",
        trim: true,
      },

      practice: {
        type: String,
        default: "Problem Solving",
        trim: true,
      },

      goal: {
        type: String,
        default: "Interview Ready",
        trim: true,
      },
    },

    // =====================================================
    // CONTACT
    // =====================================================

    email: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Profile", profileSchema)