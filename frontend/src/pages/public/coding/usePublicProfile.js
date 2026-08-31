import { useEffect, useState } from "react"
import {
  getProfile,
  getGithubStats,
  getLeetcodeStats,
} from "../../../services/profileService"

export function usePublicProfile() {
  const [profile, setProfile] = useState(null)

  const [github, setGithub] = useState(null)
  const [leetcode, setLeetcode] = useState(null)

  const [loading, setLoading] = useState(true)
  const [githubLoading, setGithubLoading] = useState(true)
  const [leetcodeLoading, setLeetcodeLoading] = useState(true)

  const [error, setError] = useState("")
  const [githubError, setGithubError] = useState("")
  const [leetcodeError, setLeetcodeError] = useState("")

  // =====================================================
  // PROFILE
  // =====================================================

  useEffect(() => {
    let cancelled = false

    const loadProfile = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getProfile()

        if (cancelled) return

        if (!data) {
          throw new Error("Profile data is empty.")
        }

        setProfile(data)
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load profile."
          )

          setProfile(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      cancelled = true
    }
  }, [])

  // =====================================================
  // GITHUB
  // =====================================================

  useEffect(() => {
    let cancelled = false

    const loadGithub = async () => {
      try {
        setGithubLoading(true)
        setGithubError("")

        const data = await getGithubStats()

        if (cancelled) return

        if (!data) {
          throw new Error(
            "GitHub statistics are not available."
          )
        }

        setGithub(data)
      } catch (err) {
        if (!cancelled) {
          setGithubError(
            err?.message ||
              "Unable to load GitHub statistics."
          )

          setGithub(null)
        }
      } finally {
        if (!cancelled) {
          setGithubLoading(false)
        }
      }
    }

    loadGithub()

    return () => {
      cancelled = true
    }
  }, [])

  // =====================================================
  // LEETCODE
  // =====================================================

  useEffect(() => {
    let cancelled = false

    const loadLeetcode = async () => {
      try {
        setLeetcodeLoading(true)
        setLeetcodeError("")

        const data = await getLeetcodeStats()

        if (cancelled) return

        if (!data) {
          throw new Error(
            "LeetCode statistics are not available."
          )
        }

        setLeetcode(data)
      } catch (err) {
        if (!cancelled) {
          setLeetcodeError(
            err?.message ||
              "Unable to load LeetCode statistics."
          )

          setLeetcode(null)
        }
      } finally {
        if (!cancelled) {
          setLeetcodeLoading(false)
        }
      }
    }

    loadLeetcode()

    return () => {
      cancelled = true
    }
  }, [])

  // =====================================================
  // RETURN
  // =====================================================

  return {
    profile,

    github,
    leetcode,

    loading,
    githubLoading,
    leetcodeLoading,

    error,
    githubError,
    leetcodeError,
  }
}

export default usePublicProfile