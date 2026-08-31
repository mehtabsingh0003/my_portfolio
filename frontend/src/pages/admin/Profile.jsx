import { useEffect, useState } from "react"
import {
  getProfile,
  updateProfile,
} from "../../services/profileService"

const initialForm = {
  name: "",
  username: "",
  role: "",
  bio: "",

  github: {
    username: "",
    url: "",
  },

  linkedin: {
    username: "",
    url: "",
  },

  leetcode: {
    username: "",
    url: "",
  },

  codingProfile: {
    focus: "",
    practice: "",
    goal: "",
  },

  email: "",
  location: "",
}

function Profile() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile()

        setForm({
          name: data.name || "",
          username: data.username || "",
          role: data.role || "",
          bio: data.bio || "",

          github: {
            username: data.github?.username || "",
            url: data.github?.url || "",
          },

          linkedin: {
            username: data.linkedin?.username || "",
            url: data.linkedin?.url || "",
          },

          leetcode: {
            username: data.leetcode?.username || "",
            url: data.leetcode?.url || "",
          },

          codingProfile: {
            focus: data.codingProfile?.focus || "",
            practice: data.codingProfile?.practice || "",
            goal: data.codingProfile?.goal || "",
          },

          email: data.email || "",
          location: data.location || "",
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  // =====================================================
  // SIMPLE FIELD CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setMessage("")
    setError("")
  }

  // =====================================================
  // NESTED FIELD CHANGE
  // =====================================================

  const handleNestedChange = (
    section,
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))

    setMessage("")
    setError("")
  }

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSaving(true)
    setError("")
    setMessage("")

    try {
      await updateProfile(form)

      setMessage("Profile updated successfully.")

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

          <p className="mt-4 text-sm text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    )
  }

  // =====================================================
  // COMPONENT
  // =====================================================

  return (
    <div className="mx-auto max-w-5xl">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <div className="flex items-start justify-between gap-6">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Portfolio Profile
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Profile Settings
            </h1>

            <p className="mt-2 max-w-2xl text-gray-500">
              Manage the information displayed across
              your public portfolio, including social
              profiles and coding accounts.
            </p>
          </div>

          {/* Profile Preview */}
          <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-black text-lg font-bold text-white shadow-lg sm:flex">
            {form.name
              ? form.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : "MS"}
          </div>

        </div>
      </div>

      {/* =================================================
          STATUS
      ================================================= */}

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="font-semibold">
            Error:
          </span>

          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span className="font-semibold">
            ✓
          </span>

          <span>{message}</span>
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b bg-gray-50/70 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Information about you displayed on
              your portfolio.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Mehtab Singh"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="mehtabsingh"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Role */}
            <div className="sm:col-span-2">
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Professional Role
              </label>

              <input
                id="role"
                name="role"
                type="text"
                value={form.role}
                onChange={handleChange}
                placeholder="Full-Stack Developer"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Bio
              </label>

              <textarea
                id="bio"
                name="bio"
                rows={5}
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell visitors about yourself..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

          </div>
        </section>

        {/* =================================================
            SOCIAL PROFILES
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b bg-gray-50/70 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Social Profiles
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your social accounts displayed on the
              portfolio.
            </p>
          </div>

          <div className="space-y-6 p-6">

            {/* GitHub */}
            <div className="rounded-xl border border-gray-200 p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 .7A11.3 11.3 0 0 0 8.4 22.1c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.16-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.35-5.22 5.63.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold">
                    GitHub
                  </h3>

                  <p className="text-xs text-gray-500">
                    GitHub profile information
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Username
                  </label>

                  <input
                    type="text"
                    value={form.github.username}
                    onChange={(event) =>
                      handleNestedChange(
                        "github",
                        "username",
                        event.target.value
                      )
                    }
                    placeholder="github_username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Profile URL
                  </label>

                  <input
                    type="url"
                    value={form.github.url}
                    onChange={(event) =>
                      handleNestedChange(
                        "github",
                        "url",
                        event.target.value
                      )
                    }
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                  />
                </div>

              </div>
            </div>

            {/* LinkedIn */}
            <div className="rounded-xl border border-gray-200 p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.4 9.5H7v11H3.4v-11Zm5.8 0h3.4V11h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.35 4.24 5.4v5.95h-3.55v-5.28c0-1.26-.03-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.79v5.37H9.2v-11Z" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold">
                    LinkedIn
                  </h3>

                  <p className="text-xs text-gray-500">
                    Professional profile
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Username
                  </label>

                  <input
                    type="text"
                    value={form.linkedin.username}
                    onChange={(event) =>
                      handleNestedChange(
                        "linkedin",
                        "username",
                        event.target.value
                      )
                    }
                    placeholder="linkedin_username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Profile URL
                  </label>

                  <input
                    type="url"
                    value={form.linkedin.url}
                    onChange={(event) =>
                      handleNestedChange(
                        "linkedin",
                        "url",
                        event.target.value
                      )
                    }
                    placeholder="https://linkedin.com/in/username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                  />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =================================================
            CODING PROFILES
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b bg-gray-50/70 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Coding Profiles
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Connect your coding accounts. Statistics
              will be fetched automatically later.
            </p>
          </div>

          <div className="space-y-6 p-6">

            {/* LeetCode */}
            <div className="rounded-xl border border-gray-200 p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <span className="text-lg font-bold">
                    LC
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold">
                    LeetCode
                  </h3>

                  <p className="text-xs text-gray-500">
                    Coding problem statistics
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Username
                  </label>

                  <input
                    type="text"
                    value={form.leetcode.username}
                    onChange={(event) =>
                      handleNestedChange(
                        "leetcode",
                        "username",
                        event.target.value
                      )
                    }
                    placeholder="leetcode_username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Profile URL
                  </label>

                  <input
                    type="url"
                    value={form.leetcode.url}
                    onChange={(event) =>
                      handleNestedChange(
                        "leetcode",
                        "url",
                        event.target.value
                      )
                    }
                    placeholder="https://leetcode.com/u/username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                  />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =================================================
            CODING FOCUS
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b bg-gray-50/70 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Coding Focus
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Short information shown alongside your
              coding profile.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Focus
              </label>

              <input
                type="text"
                value={form.codingProfile.focus}
                onChange={(event) =>
                  handleNestedChange(
                    "codingProfile",
                    "focus",
                    event.target.value
                  )
                }
                placeholder="Data Structures"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Practice
              </label>

              <input
                type="text"
                value={form.codingProfile.practice}
                onChange={(event) =>
                  handleNestedChange(
                    "codingProfile",
                    "practice",
                    event.target.value
                  )
                }
                placeholder="Problem Solving"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Goal
              </label>

              <input
                type="text"
                value={form.codingProfile.goal}
                onChange={(event) =>
                  handleNestedChange(
                    "codingProfile",
                    "goal",
                    event.target.value
                  )
                }
                placeholder="Interview Ready"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

          </div>
        </section>

        {/* =================================================
            CONTACT INFORMATION
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b bg-gray-50/70 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Contact Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Contact details displayed on your portfolio.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="Nagpur, India"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

          </div>
        </section>

        {/* =================================================
            SAVE BAR
        ================================================= */}

        <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur">

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              Profile changes
            </p>

            <p className="text-xs text-gray-500">
              Save your changes to update the portfolio.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="ml-auto rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>

        </div>

      </form>
    </div>
  )
}

export default Profile