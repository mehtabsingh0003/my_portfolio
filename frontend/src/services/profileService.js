import { apiRequest } from "./apiClient"

// =====================================================
// PUBLIC PROFILE
// =====================================================

export const getProfile = async () => {
  return apiRequest("/profile")
}


// =====================================================
// GITHUB STATS
// =====================================================

export const getGithubStats = async () => {
  return apiRequest("/profile/github")
}


// =====================================================
// LEETCODE STATS
// =====================================================

export const getLeetcodeStats = async () => {
  return apiRequest("/profile/leetcode")
}


// =====================================================
// ADMIN PROFILE
// =====================================================

export const updateProfile = async (profileData) => {
  if (!profileData || typeof profileData !== "object") {
    throw new Error("Invalid profile data.")
  }

  return apiRequest("/profile", {
    method: "PUT",
    body: profileData,
  })
}