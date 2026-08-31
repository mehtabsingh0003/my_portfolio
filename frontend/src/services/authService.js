import {
  apiRequest,
  setToken,
  clearToken,
} from "./apiClient"


// ==================================================
// LOGIN
// ==================================================

export const login = async (email, password) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  })

  // Save JWT token
  setToken(data.token)

  // Return logged-in user
  return data.user
}


// ==================================================
// LOGOUT
// ==================================================

export const logout = () => {
  clearToken()
}


// ==================================================
// GET CURRENT USER
// ==================================================

export const getMe = async () => {
  return apiRequest("/auth/me")
}