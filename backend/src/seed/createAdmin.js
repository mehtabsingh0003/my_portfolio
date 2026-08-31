// Create or update the admin user.
// Run with: node src/seed/createAdmin.js

require("dotenv").config({ quiet: true })

const mongoose = require("mongoose")
const User = require("../models/User")

const run = async () => {
  const name = process.env.ADMIN_NAME || "Admin"
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before running this script."
    )

    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB connected")

    const normalizedEmail = email.toLowerCase()

    const existing = await User.findOne({
      email: normalizedEmail,
    })

    if (existing) {
      existing.name = name
      existing.email = normalizedEmail
      existing.password = password
      existing.role = "admin"

      await existing.save()

      console.log(`Admin user updated: ${existing.email}`)
    } else {
      const admin = await User.create({
        name,
        email: normalizedEmail,
        password,
        role: "admin",
      })

      console.log(`Admin user created: ${admin.email}`)
    }
  } catch (error) {
    console.error("Failed to seed admin user:", error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

run()