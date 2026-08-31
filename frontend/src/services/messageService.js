import { apiRequest } from "./apiClient"


// ==================================================
// SEND MESSAGE
// Public API
// ==================================================

export const sendMessage = async ({
  name,
  email,
  subject,
  message,
}) => {
  return apiRequest("/messages", {
    method: "POST",
    body: {
      name,
      email,
      subject,
      message,
    },
  })
}


// ==================================================
// GET ALL MESSAGES
// Admin API
// ==================================================

export const getMessages = async () => {
  return apiRequest("/messages")
}


// ==================================================
// MARK MESSAGE AS READ
// Admin API
// ==================================================

export const markMessageRead = async (id) => {
  return apiRequest(`/messages/${id}/read`, {
    method: "PUT",
  })
}


// ==================================================
// DELETE MESSAGE
// Admin API
// ==================================================

export const deleteMessage = async (id) => {
  return apiRequest(`/messages/${id}`, {
    method: "DELETE",
  })
}