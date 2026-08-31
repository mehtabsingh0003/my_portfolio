import { apiRequest, apiFormRequest } from "./apiClient"

// Get all resumes
export const getResumes = async () => {
  return apiRequest("/resume")
}

// Get current resume
export const getCurrentResume = async () => {
  return apiRequest("/resume/current")
}

// Upload new resume
export const uploadResume = async (formData) => {
  return apiFormRequest("/resume", formData, {
    method: "POST",
  })
}

// Update existing resume
// Can update title and/or replace PDF
export const updateResume = async (resumeId, formData) => {
  return apiFormRequest(`/resume/${resumeId}`, formData, {
    method: "PUT",
  })
}

// Delete resume
export const deleteResume = async (resumeId) => {
  return apiRequest(`/resume/${resumeId}`, {
    method: "DELETE",
  })
}