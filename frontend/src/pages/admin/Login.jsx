import { useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  getToken,
  setToken,
} from "../../services/apiClient"

// ==================================================
// ICONS
// ==================================================

const icons = {
  mail: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path
        strokeLinecap="round"
        d="m4 7 8 6 8-6"
      />
    </svg>
  ),

  lock: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect
        x="4"
        y="10"
        width="16"
        height="11"
        rx="2"
      />
      <path
        strokeLinecap="round"
        d="M8 10V7a4 4 0 0 1 8 0v3"
      />
    </svg>
  ),

  eye: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
      />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),

  eyeOff: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3 3 18 18"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.6 6.2A10.5 10.5 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3 3.8"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.2 6.2C3.8 8.2 2.5 12 2.5 12s3.5 6 9.5 6c1.4 0 2.7-.3 3.8-.8"
      />
    </svg>
  ),

  arrow: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h13M13 6l6 6-6 6"
      />
    </svg>
  ),

  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 20 6v5c0 5-3.2 8.7-8 10-4.8-1.3-8-5-8-10V6l8-3Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 12 2 2 4-4"
      />
    </svg>
  ),

  alert: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 21 20H3L12 3Z"
      />
      <path
        strokeLinecap="round"
        d="M12 9v4"
      />
      <path
        strokeLinecap="round"
        d="M12 16h.01"
      />
    </svg>
  ),
}

// ==================================================
// LOGIN
// ==================================================

function Login() {
  const {
    login,
    isAuthenticated,
    loading: sessionLoading,
  } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // ==================================================
  // REDIRECT LOCATION
  // ==================================================

  const redirectTo =
    location.state?.from?.pathname ||
    "/admin/dashboard"

  // ==================================================
  // ALREADY AUTHENTICATED
  // ==================================================

  if (!sessionLoading && isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    )
  }

  // ==================================================
  // INPUT CHANGE
  // ==================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (error) {
      setError("")
    }
  }

  // ==================================================
  // LOGIN
  // ==================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitting) return

    setError("")
    setSubmitting(true)

    try {
      /*
       * AuthContext login may return:
       *
       * { token }
       * { accessToken }
       * { data: { token } }
       * { data: { accessToken } }
       *
       * We support all of these.
       */

      const result = await login(
        form.email.trim(),
        form.password
      )

      console.log("[LOGIN] Response:", result)

      // ----------------------------------------------
      // FIND TOKEN FROM LOGIN RESPONSE
      // ----------------------------------------------

      const token =
        result?.token ||
        result?.accessToken ||
        result?.data?.token ||
        result?.data?.accessToken ||
        null

      if (token) {
        setToken(token)

        console.log(
          "[LOGIN] Token saved to envision_admin_token"
        )
      }

      // ----------------------------------------------
      // CHECK EXISTING TOKEN
      // ----------------------------------------------

      let savedToken = getToken()

      /*
       * If AuthContext uses another localStorage key,
       * migrate it into our API client's key.
       */

      if (!savedToken) {
        const possibleKeys = [
          "token",
          "accessToken",
          "authToken",
          "adminToken",
          "jwt",
          "admin_token",
        ]

        for (const key of possibleKeys) {
          const existingToken =
            localStorage.getItem(key)

          if (existingToken) {
            setToken(existingToken)

            savedToken = existingToken

            console.log(
              `[LOGIN] Migrated token from "${key}"`
            )

            break
          }
        }
      }

      // ----------------------------------------------
      // FINAL TOKEN CHECK
      // ----------------------------------------------

      savedToken = getToken()

      console.log(
        "[LOGIN] Final token status:",
        savedToken
          ? "TOKEN FOUND"
          : "NO TOKEN"
      )

      /*
       * Do not enter the dashboard if the authentication
       * state says logged in but the API client has no token.
       */

      if (!savedToken) {
        throw new Error(
          "Login succeeded, but no authentication token was saved. Please check AuthContext."
        )
      }

      // ----------------------------------------------
      // GO TO DASHBOARD
      // ----------------------------------------------

      navigate(
        redirectTo,
        {
          replace: true,
        }
      )
    } catch (err) {
      console.error("[LOGIN ERROR]", err)

      setError(
        err?.message ||
        "Unable to sign in. Please check your credentials."
      )
    } finally {
      setSubmitting(false)
    }
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-5 py-10 text-white">

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-48 -top-48 h-[38rem] w-[38rem] rounded-full bg-purple-600/[0.10] blur-[130px]" />

        <div className="absolute -right-48 top-1/4 h-[38rem] w-[38rem] rounded-full bg-cyan-500/[0.08] blur-[130px]" />

        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.035] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.25) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.25) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050816_76%)]" />

      </div>

      {/* ==================================================
          LOGIN CONTAINER
      ================================================== */}

      <div className="relative z-10 w-full max-w-md">

        {/* ==================================================
            BRAND
        ================================================== */}

        <div className="mb-7 text-center">

          <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 p-[1px] shadow-2xl shadow-purple-500/20">

            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#090f1d]">

              <span className="text-lg font-black tracking-tight">
                MS
              </span>

            </div>

          </div>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-400">
            Portfolio CMS
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Sign in to manage your portfolio,
            projects, skills, and content.
          </p>

        </div>

        {/* ==================================================
            LOGIN CARD
        ================================================== */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">

          {/* Card header */}

          <div className="mb-7 flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/[0.08] text-cyan-300">
              {icons.shield}
            </div>

            <div>

              <h2 className="text-sm font-semibold text-gray-200">
                Admin Sign In
              </h2>

              <p className="mt-0.5 text-[11px] text-gray-600">
                Secure administrator access
              </p>

            </div>

          </div>

          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Email address
              </label>

              <div className="group relative">

                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 transition group-focus-within:text-cyan-400">
                  {icons.mail}
                </span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-white/[0.08]
                    bg-black/20 py-3 pl-11 pr-4
                    text-sm text-white
                    placeholder:text-gray-700
                    outline-none
                    transition-all duration-200
                    focus:border-cyan-400/40
                    focus:bg-black/30
                    focus:ring-4
                    focus:ring-cyan-400/[0.05]
                  "
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Password
              </label>

              <div className="group relative">

                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 transition group-focus-within:text-purple-400">
                  {icons.lock}
                </span>

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-white/[0.08]
                    bg-black/20 py-3 pl-11 pr-11
                    text-sm text-white
                    placeholder:text-gray-700
                    outline-none
                    transition-all duration-200
                    focus:border-purple-400/40
                    focus:bg-black/30
                    focus:ring-4
                    focus:ring-purple-400/[0.05]
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-gray-300"
                >
                  {showPassword
                    ? icons.eyeOff
                    : icons.eye}
                </button>

              </div>

            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.06] px-3.5 py-3 text-sm text-red-300">

                <span className="mt-0.5 shrink-0 text-red-400">
                  {icons.alert}
                </span>

                <p className="leading-5">
                  {error}
                </p>

              </div>
            )}

            {/* ==================================================
                SUBMIT
            ================================================== */}

            <button
              type="submit"
              disabled={submitting}
              className="
                group relative flex w-full
                items-center justify-center gap-2
                overflow-hidden rounded-xl
                bg-gradient-to-r from-purple-500 to-cyan-500
                px-4 py-3
                text-sm font-semibold text-white
                shadow-lg shadow-purple-500/10
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-xl hover:shadow-purple-500/20
                disabled:cursor-not-allowed
                disabled:translate-y-0
                disabled:opacity-60
              "
            >

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  <span>
                    Signing in...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Sign in to dashboard
                  </span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {icons.arrow}
                  </span>
                </>
              )}

            </button>

          </form>

          {/* ==================================================
              SECURITY NOTE
          ================================================== */}

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-5">

            <span className="text-gray-600">
              {icons.shield}
            </span>

            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-600">
              Protected administrator area
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-6 text-center">

          <p className="text-[10px] text-gray-700">
            © {new Date().getFullYear()} Mehtab Singh
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login