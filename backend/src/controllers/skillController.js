const Skill = require("../models/Skill")

// GET all skills - Admin
// GET /api/skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({
      category: 1,
      order: 1,
      createdAt: 1,
    })

    res.status(200).json(skills)
  } catch (error) {
    console.error("GET SKILLS ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch skills",
      error: error.message,
    })
  }
}

// GET published skills - Public
// GET /api/skills/public
const getPublicSkills = async (req, res) => {
  try {
    const skills = await Skill.find({
      published: true,
    }).sort({
      category: 1,
      order: 1,
      createdAt: 1,
    })

    res.status(200).json(skills)
  } catch (error) {
    console.error("GET PUBLIC SKILLS ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch public skills",
      error: error.message,
    })
  }
}

// GET single skill
// GET /api/skills/:id
const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      })
    }

    res.status(200).json(skill)
  } catch (error) {
    console.error("GET SKILL ERROR:", error)

    res.status(500).json({
      message: "Failed to fetch skill",
      error: error.message,
    })
  }
}

// CREATE skill
// POST /api/skills
const createSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      icon,
      order,
      published,
    } = req.body

    if (!name || !category) {
      return res.status(400).json({
        message: "Skill name and category are required",
      })
    }

    const skill = await Skill.create({
      name,
      category,
      icon: icon || "",
      order: order !== undefined ? Number(order) : 0,
      published:
        published !== undefined
          ? published === true || published === "true"
          : true,
    })

    res.status(201).json(skill)
  } catch (error) {
    console.error("CREATE SKILL ERROR:", error)

    res.status(400).json({
      message: "Failed to create skill",
      error: error.message,
    })
  }
}

// UPDATE skill
// PUT /api/skills/:id
const updateSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      icon,
      order,
      published,
    } = req.body

    const updateData = {}

    if (name !== undefined) {
      updateData.name = name
    }

    if (category !== undefined) {
      updateData.category = category
    }

    if (icon !== undefined) {
      updateData.icon = icon
    }

    if (order !== undefined) {
      updateData.order = Number(order)
    }

    if (published !== undefined) {
      updateData.published =
        published === true || published === "true"
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      })
    }

    res.status(200).json(skill)
  } catch (error) {
    console.error("UPDATE SKILL ERROR:", error)

    res.status(400).json({
      message: "Failed to update skill",
      error: error.message,
    })
  }
}

// DELETE skill
// DELETE /api/skills/:id
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      })
    }

    res.status(200).json({
      message: "Skill deleted successfully",
    })
  } catch (error) {
    console.error("DELETE SKILL ERROR:", error)

    res.status(500).json({
      message: "Failed to delete skill",
      error: error.message,
    })
  }
}

module.exports = {
  getSkills,
  getPublicSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
}