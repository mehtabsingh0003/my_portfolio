export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const TOKEN_KEY = "envision_admin_token"


// ==================================================
// TOKEN HELPERS
// ==================================================

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}


// ==================================================
// AUTH HEADERS
// ==================================================

const authHeaders = () => {
  const token = getToken()

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}
}


// ==================================================
// JSON API REQUEST
// ==================================================

export const apiRequest = async (path, options = {}) => {
  const {
    body,
    headers = {},
    ...rest
  } = options

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,

    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...headers,
    },

    body:
      body !== undefined && body !== null
        ? JSON.stringify(body)
        : undefined,
  })

  // Automatically clear invalid/expired token
  if (response.status === 401) {
    clearToken()
  }

  const data = await response
    .json()
    .catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    )
  }

  return data
}


// ==================================================
// FORM DATA / FILE UPLOAD REQUEST
// ==================================================

export const apiFormRequest = async (
  path,
  formData,
  options = {}
) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,

    headers: {
      // IMPORTANT:
      // Do NOT set Content-Type here.
      // Browser automatically adds:
      // multipart/form-data; boundary=...
      ...authHeaders(),
      ...(options.headers || {}),
    },

    body: formData,
  })

  // Automatically clear invalid/expired token
  if (response.status === 401) {
    clearToken()
  }

  const data = await response
    .json()
    .catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    )
  }

  return data
}