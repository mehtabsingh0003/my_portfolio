const Resume = require("../models/Resume")
const cloudinary = require("../config/cloudinary")

const uploadResumeToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/resumes",
        resource_type: "raw",
        type: "upload",
      },
      (error, result) => {
        if (error) {
          console.error("RESUME CLOUDINARY ERROR:", error)
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    uploadStream.end(fileBuffer)
  })
}

// Delete resume file from Cloudinary
const deleteResumeFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: "raw",
        type: "upload",
      },
      (error, result) => {
        if (error) {
          console.error(
            "DELETE RESUME CLOUDINARY ERROR:",
            error
          )

          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

// POST /api/resume
const createResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required",
      })
    }

    const title = req.body.title || "My Resume"

    console.log("Uploading resume to Cloudinary...")

    const result = await uploadResumeToCloudinary(
      req.file.buffer
    )

    // Make all previous resumes non-current
    await Resume.updateMany(
      {},
      {
        isCurrent: false,
      }
    )

    const resume = await Resume.create({
      title,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      isCurrent: true,
    })

    console.log("Resume created:", resume._id)

    res.status(201).json(resume)
  } catch (error) {
    console.error("CREATE RESUME ERROR:", error)

    res.status(500).json({
      message: "Failed to upload resume",
      error: error.message,
    })
  }
}

// GET all resumes
// GET /api/resume
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .sort({
        isCurrent: -1,
        createdAt: -1,
      })

    res.status(200).json(resumes)
  } catch (error) {
    console.error("GET RESUMES ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch resumes",
      error: error.message,
    })
  }
}

// GET current resume
// GET /api/resume/current
const getCurrentResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      isCurrent: true,
    }).sort({
      createdAt: -1,
    })

    if (!resume) {
      return res.status(404).json({
        message: "No current resume found",
      })
    }

    res.status(200).json(resume)
  } catch (error) {
    console.error("GET CURRENT RESUME ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message,
    })
  }
}

// PUT /api/resume/:id
// Update resume title and/or PDF
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    const newTitle =
      req.body.title?.trim() || resume.title

    let newFileUrl = resume.fileUrl
    let newPublicId = resume.publicId

    // If a new PDF was uploaded
    if (req.file) {
      console.log("Uploading replacement resume...")

      const result = await uploadResumeToCloudinary(
        req.file.buffer
      )

      newFileUrl = result.secure_url
      newPublicId = result.public_id

      // Delete old PDF from Cloudinary
      try {
        await deleteResumeFromCloudinary(
          resume.publicId
        )

        console.log(
          "Old resume deleted from Cloudinary"
        )
      } catch (cloudinaryError) {
        console.error(
          "OLD RESUME DELETE ERROR:",
          cloudinaryError
        )
      }
    }

    resume.title = newTitle
    resume.fileUrl = newFileUrl
    resume.publicId = newPublicId

    await resume.save()

    console.log("Resume updated:", resume._id)

    res.status(200).json({
      message: "Resume updated successfully",
      resume,
    })
  } catch (error) {
    console.error("UPDATE RESUME ERROR:", error)

    res.status(500).json({
      message: "Failed to update resume",
      error: error.message,
    })
  }
}

// DELETE /api/resume/:id
// Delete resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    const wasCurrent = resume.isCurrent

    // Delete file from Cloudinary
    try {
      await deleteResumeFromCloudinary(
        resume.publicId
      )

      console.log(
        "Resume deleted from Cloudinary:",
        resume.publicId
      )
    } catch (cloudinaryError) {
      console.error(
        "CLOUDINARY DELETE ERROR:",
        cloudinaryError
      )
    }

    // Delete database record
    await Resume.findByIdAndDelete(req.params.id)

    // If current resume was deleted,
    // make the newest remaining resume current
    if (wasCurrent) {
      const newestResume = await Resume.findOne()
        .sort({
          createdAt: -1,
        })

      if (newestResume) {
        newestResume.isCurrent = true
        await newestResume.save()
      }
    }

    console.log("Resume deleted:", req.params.id)

    res.status(200).json({
      message: "Resume deleted successfully",
    })
  } catch (error) {
    console.error("DELETE RESUME ERROR:", error)

    res.status(500).json({
      message: "Failed to delete resume",
      error: error.message,
    })
  }
}

// GET /api/resume/:id/view
// View PDF in browser
const viewResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    const response = await fetch(resume.fileUrl)

    if (!response.ok) {
      return res.status(500).json({
        message: "Failed to fetch resume PDF",
      })
    }

    const pdfBuffer = Buffer.from(
      await response.arrayBuffer()
    )

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "inline"
    )

    res.setHeader(
      "Content-Length",
      pdfBuffer.length
    )

    res.send(pdfBuffer)
  } catch (error) {
    console.error("VIEW RESUME ERROR:", error)

    res.status(500).json({
      message: "Failed to view resume",
      error: error.message,
    })
  }
}

// GET /api/resume/:id/download
// Download PDF with proper .pdf filename
const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    const response = await fetch(resume.fileUrl)

    if (!response.ok) {
      return res.status(500).json({
        message: "Failed to fetch resume PDF",
      })
    }

    const pdfBuffer = Buffer.from(
      await response.arrayBuffer()
    )

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Mehtab_Singh_Resume.pdf"'
    )

    res.setHeader(
      "Content-Length",
      pdfBuffer.length
    )

    res.send(pdfBuffer)
  } catch (error) {
    console.error("DOWNLOAD RESUME ERROR:", error)

    res.status(500).json({
      message: "Failed to download resume",
      error: error.message,
    })
  }
}

module.exports = {
  createResume,
  getResumes,
  getCurrentResume,
  updateResume,
  deleteResume,
  viewResume,
  downloadResume,
}