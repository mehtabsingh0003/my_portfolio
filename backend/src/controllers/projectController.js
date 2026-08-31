const Project = require("../models/Project")
const cloudinary = require("../config/cloudinary")

const uploadToCloudinary = async (fileBuffer, mimetype) => {
  const fileData = `data:${mimetype};base64,${fileBuffer.toString("base64")}`

  const result = await cloudinary.uploader.upload(fileData, {
    folder: "portfolio/projects",
    resource_type: "image",
  })

  return result
}

const getCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("cloudinary")) {
    return null
  }

  const parts = imageUrl.split("/")
  const fileName = parts[parts.length - 1]
  const publicId = fileName.split(".")[0]

  return `portfolio/projects/${publicId}`
}

// Turn multipart/form-data string fields into the correct types
const parseProjectFields = (body) => {
  const fields = {
    title: body.title,
    description: body.description,
    githubUrl: body.githubUrl || "",
    liveUrl: body.liveUrl || "",
  }

  if (body.technologies !== undefined) {
    try {
      fields.technologies = JSON.parse(body.technologies)
    } catch {
      fields.technologies = String(body.technologies)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    }
  }

  if (body.featured !== undefined) {
    fields.featured = body.featured === "true" || body.featured === true
  }

  if (body.published !== undefined) {
    fields.published = body.published === "true" || body.published === true
  }

  return fields
}

// GET all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })

    res.status(200).json(projects)
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message,
    })
  }
}

// GET single project
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    res.status(200).json(project)
  } catch (error) {
    console.error("GET PROJECT ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch project",
      error: error.message,
    })
  }
}

// CREATE project
const createProject = async (req, res) => {
  try {
    let imageUrl = ""

    if (req.file) {
      console.log("Uploading image to Cloudinary...")

      const result = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype
      )

      imageUrl = result.secure_url

      console.log("Cloudinary upload successful")
    }

    const fields = parseProjectFields(req.body)

    const project = await Project.create({
      title: fields.title,
      description: fields.description,
      technologies: fields.technologies || [],
      githubUrl: fields.githubUrl,
      liveUrl: fields.liveUrl,
      featured: fields.featured || false,
      published: fields.published !== false,
      image: imageUrl,
    })

    res.status(201).json(project)
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error)

    res.status(400).json({
      message: "Failed to create project",
      error: error.message,
    })
  }
}

// UPDATE project
const updateProject = async (req, res) => {
  try {
    const existingProject = await Project.findById(req.params.id)

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    const fields = parseProjectFields(req.body)

    // If a new image was uploaded, replace it and clean up the old one
    if (req.file) {
      console.log("Uploading replacement image to Cloudinary...")

      const result = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype
      )

      fields.image = result.secure_url

      const oldPublicId = getCloudinaryPublicId(existingProject.image)

      if (oldPublicId) {
        cloudinary.uploader.destroy(oldPublicId).catch((err) => {
          console.error("Failed to remove old Cloudinary image:", err.message)
        })
      }
    }

    const project = await Project.findByIdAndUpdate(req.params.id, fields, {
      new: true,
      runValidators: true,
    })

    res.status(200).json(project)
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error)

    res.status(400).json({
      message: "Failed to update project",
      error: error.message,
    })
  }
}

// DELETE project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    const publicId = getCloudinaryPublicId(project.image)

    if (publicId) {
      cloudinary.uploader.destroy(publicId).catch((err) => {
        console.error("Failed to remove Cloudinary image:", err.message)
      })
    }

    res.status(200).json({
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error)

    res.status(500).json({
      message: "Failed to delete project",
      error: error.message,
    })
  }
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}
