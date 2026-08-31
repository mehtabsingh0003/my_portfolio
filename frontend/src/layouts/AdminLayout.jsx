import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


// ==================================================
// ICONS
// ==================================================

const icons = {
  dashboard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),

  projects: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path strokeLinecap="round" d="M3 9h18" />
      <path strokeLinecap="round" d="m8 14 2 2 4-4" />
    </svg>
  ),

  skills: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3 2.2 6.3L21 12l-6.8 2.7L12 21l-2.2-6.3L3 12l6.8-2.7L12 3Z"
      />
    </svg>
  ),

  resume: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 3h8l4 4v14H6z"
      />
      <path
        strokeLinecap="round"
        d="M14 3v5h5"
      />
      <path
        strokeLinecap="round"
        d="M9 13h6M9 17h6"
      />
    </svg>
  ),

  messages: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4 7 8 6 8-6"
      />
    </svg>
  ),

  profile: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path
        strokeLinecap="round"
        d="M5.5 20c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5"
      />
    </svg>
  ),

  logout: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 8l4 4-4 4"
      />
      <path
        strokeLinecap="round"
        d="M18 12H9"
      />
    </svg>
  ),

  external: (
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
        d="M14 5h5v5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 5 11 13"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"
      />
    </svg>
  ),
}


// ==================================================
// NAVIGATION
// ==================================================

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: icons.dashboard,
  },
  {
    to: "/admin/projects",
    label: "Projects",
    icon: icons.projects,
  },
  {
    to: "/admin/skills",
    label: "Skills",
    icon: icons.skills,
  },
  {
    to: "/admin/resume",
    label: "Resume",
    icon: icons.resume,
  },
  {
    to: "/admin/messages",
    label: "Messages",
    icon: icons.messages,
  },
]


// ==================================================
// COMPONENT
// ==================================================

function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()


  // ==================================================
  // LOGOUT
  // ==================================================

  const handleLogout = () => {
    logout()
    navigate("/admin/login", { replace: true })
  }


  // ==================================================
  // NAV LINK STYLE
  // ==================================================

  const linkClass = ({ isActive }) =>
    `
      group relative flex items-center gap-3 rounded-xl
      px-3.5 py-3 text-sm font-medium
      transition-all duration-200
      ${
        isActive
          ? "bg-white text-gray-950 shadow-lg shadow-black/10"
          : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
      }
    `


  // ==================================================
  // USER INITIALS
  // ==================================================

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "AD"


  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">


      {/* ==================================================
          SIDEBAR
          ================================================== */}

      <aside className="relative flex w-72 shrink-0 flex-col overflow-hidden bg-[#070b14] text-white">


        {/* Background effects */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.2) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.2) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "45px 45px",
            }}
          />

        </div>


        {/* Sidebar content */}

        <div className="relative z-10 flex h-full flex-col p-5">


          {/* ==================================================
              BRAND
              ================================================== */}

          <div className="mb-9 px-2">

            <div className="flex items-center gap-3">

              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/10">

                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0c111d]">

                  <span className="text-sm font-black tracking-tight">
                    MS
                  </span>

                </div>

              </div>


              <div>

                <h1 className="text-[15px] font-bold tracking-wide text-white">
                  Portfolio
                </h1>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">
                  Admin Panel
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              NAVIGATION
              ================================================== */}

          <div>

            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
              Management
            </p>


            <nav className="space-y-1">

              {navItems.map((item) => (

                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                >

                  {({ isActive }) => (
                    <>

                      {/* Active indicator */}

                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-purple-400 to-cyan-400" />
                      )}


                      {/* Icon */}

                      <span
                        className={`
                          flex h-9 w-9 shrink-0 items-center justify-center
                          rounded-lg transition-all duration-200
                          ${
                            isActive
                              ? "bg-gray-100 text-gray-900"
                              : "bg-white/[0.035] text-gray-500 group-hover:bg-white/[0.07] group-hover:text-gray-300"
                          }
                        `}
                      >
                        {item.icon}
                      </span>


                      {/* Label */}

                      <span className="flex-1">
                        {item.label}
                      </span>


                      {/* Active dot */}

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                      )}

                    </>
                  )}

                </NavLink>

              ))}

            </nav>

          </div>


          {/* ==================================================
              SEPARATOR
              ================================================== */}

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />


          {/* ==================================================
              ACCOUNT
              ================================================== */}

          <div>

            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
              Account
            </p>


            <NavLink
              to="/admin/profile"
              className={linkClass}
            >

              {({ isActive }) => (
                <>

                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-lg transition-all
                      ${
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "bg-white/[0.035] text-gray-500 group-hover:bg-white/[0.07] group-hover:text-gray-300"
                      }
                    `}
                  >
                    {icons.profile}
                  </span>

                  <span>Profile</span>

                </>
              )}

            </NavLink>

          </div>


          {/* Spacer */}

          <div className="flex-1" />


          {/* ==================================================
              USER CARD
              ================================================== */}

          {user && (

            <div className="mb-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                {/* Avatar */}

                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 p-[1px]">

                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#101521]">

                    <span className="text-xs font-bold text-white">
                      {initials}
                    </span>

                  </div>

                </div>


                {/* User info */}

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-semibold text-white">
                    {user.name || "Administrator"}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />

                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                      Online
                    </p>

                  </div>

                </div>

              </div>

            </div>

          )}


          {/* ==================================================
              LOGOUT
              ================================================== */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              group flex w-full items-center gap-3 rounded-xl
              border border-white/[0.07]
              bg-white/[0.025]
              px-3.5 py-3
              text-sm font-medium text-gray-400
              transition-all duration-200
              hover:border-red-400/20
              hover:bg-red-400/[0.07]
              hover:text-red-300
            "
          >

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.035] transition group-hover:bg-red-400/10">
              {icons.logout}
            </span>

            <span className="flex-1 text-left">
              Log out
            </span>

          </button>


          {/* Version */}

          <p className="mt-5 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-gray-700">
            Portfolio CMS • Admin
          </p>

        </div>

      </aside>


      {/* ==================================================
          MAIN CONTENT
          ================================================== */}

      <main className="min-w-0 flex-1 overflow-x-hidden">

        <div className="min-h-screen p-5 md:p-7 lg:p-8">

          <Outlet />

        </div>

      </main>

    </div>
  )
}

export default AdminLayout