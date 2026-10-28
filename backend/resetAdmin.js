
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./src/models/User");

async function resetAdminPassword() {
  try {
    const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "Check MONGO_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in .env"
      );
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const email = ADMIN_EMAIL.trim().toLowerCase();

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("Admin account not found:", email);
      return;
    }

    // Your User.js pre-save hook hashes this password using bcrypt.
    user.password = ADMIN_PASSWORD;
    await user.save();

    console.log("Admin password reset successfully.");
    console.log("Log in using the email and password from .env");
  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

resetAdminPassword();
