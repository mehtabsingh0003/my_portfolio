require("dotenv").config()

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/User")

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const email = "mehtabsinghr274@gmail.com"

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error("Admin account not found in this database")
    }

    // Set a new password locally; never hardcode it in this script.
    const newPassword = process.env.RESET_ADMIN_PASSWORD

    if (!newPassword || newPassword.length < 12) {
      throw new Error(
        "Set RESET_ADMIN_PASSWORD to a strong password of at least 12 characters"
      )
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    console.log("Admin password reset successfully.")
  } catch (error) {
    console.error("Password reset failed:", error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

resetAdminPassword()
