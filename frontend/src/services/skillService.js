import { apiRequest } from "./apiClient"

// =========================
// PUBLIC
// =========================

// Get published skills
export const getPublicSkills = async () => {
  return apiRequest("/skills/public")
}

// =========================
// ADMIN
// =========================

// Get all skills
export const getSkills = async () => {
  return apiRequest("/skills")
}

// Get single skill
export const getSkill = async (id) => {
  return apiRequest(`/skills/${id}`)
}

// Create skill
export const createSkill = async (skillData) => {
  return apiRequest("/skills", {
    method: "POST",
    body: skillData,
  })
}

// Update skill
export const updateSkill = async (id, skillData) => {
  return apiRequest(`/skills/${id}`, {
    method: "PUT",
    body: skillData,
  })
}

// Delete skill
export const deleteSkill = async (id) => {
  return apiRequest(`/skills/${id}`, {
    method: "DELETE",
  })
}