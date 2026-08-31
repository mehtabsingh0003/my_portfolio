import { apiRequest, apiFormRequest } from "./apiClient"

export const getProjects = async () => {
  return apiRequest("/projects")
}

export const getProject = async (id) => {
  return apiRequest(`/projects/${id}`)
}

const buildProjectFormData = (project) => {
  const formData = new FormData()

  formData.append("title", project.title)
  formData.append("description", project.description)
  formData.append("technologies", JSON.stringify(project.technologies || []))
  formData.append("githubUrl", project.githubUrl || "")
  formData.append("liveUrl", project.liveUrl || "")
  formData.append("featured", String(!!project.featured))
  formData.append("published", String(!!project.published))

  if (project.imageFile) {
    formData.append("image", project.imageFile)
  }

  return formData
}

export const createProject = async (project) => {
  const formData = buildProjectFormData(project)

  return apiFormRequest("/projects", formData, { method: "POST" })
}

export const updateProject = async (id, project) => {
  const formData = buildProjectFormData(project)

  return apiFormRequest(`/projects/${id}`, formData, { method: "PUT" })
}

export const deleteProject = async (id) => {
  return apiRequest(`/projects/${id}`, { method: "DELETE" })
}
