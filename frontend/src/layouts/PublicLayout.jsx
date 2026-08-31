import { Outlet, NavLink } from "react-router-dom"
import { useState } from "react"


// =========================================================
// ICONS
// =========================================================

const icons = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 9.5V21h13V9.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 21v-6h5v6" />
    </svg>
  ),

  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="8" r="3.2" />
      <path strokeLinecap="round" d="M5.5 20c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5" />
    </svg>
  ),

  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path strokeLinecap="round" d="M3 9h18" />
      <path strokeLinecap="round" d="m8 14 2 2 4-4" />
    </svg>
  ),

  resume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h8l4 4v14H6z" />
      <path strokeLinecap="round" d="M14 3v5h5" />
      <path strokeLinecap="round" d="M9 13h6M9 17h6" />
    </svg>
  ),

  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="8" r="3.2" />
      <path strokeLinecap="round" d="M5.5 20c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5" />
      <path strokeLinecap="round" d="M18 4.5v3M16.5 6h3" />
    </svg>
  ),

  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path strokeLinecap="round" d="m4 7 8 6 8-6" />
    </svg>
  ),

  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 .7A11.3 11.3 0 0 0 8.4 22.1c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.16-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.35-5.22 5.63.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  ),

  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.4 9.5H7v11H3.4v-11Zm5.8 0h3.4V11h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.35 4.24 5.4v5.95h-3.55v-5.28c0-1.26-.03-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.79v5.37H9.2v-11Z" />
    </svg>
  ),

  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),

  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),

  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  ),
}


// =========================================================
// NAVIGATION
// =========================================================

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: icons.home,
  },
  {
    to: "/about",
    label: "About",
    icon: icons.about,
  },
  {
    to: "/projects",
    label: "Projects",
    icon: icons.projects,
  },
  {
    to: "/resume",
    label: "Resume",
    icon: icons.resume,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: icons.profile,
  },
  {
    to: "/contact",
    label: "Contact",
    icon: icons.contact,
  },
]


// =========================================================
// COMPONENT
// =========================================================

function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050816] text-white">


      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* Purple glow */}

        <div className="absolute -left-48 -top-48 h-[38rem] w-[38rem] rounded-full bg-purple-600/[0.09] blur-[130px]" />

        {/* Cyan glow */}

        <div className="absolute -right-48 top-20 h-[38rem] w-[38rem] rounded-full bg-cyan-500/[0.08] blur-[130px]" />

        {/* Bottom glow */}

        <div className="absolute bottom-[-18rem] left-1/2 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-blue-600/[0.06] blur-[130px]" />


        {/* Subtle grid */}

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
            backgroundSize: "80px 80px",
          }}
        />


        {/* Radial darkness */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050816_78%)]" />

      </div>


      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#050816]/80 backdrop-blur-2xl">

        {/* Top gradient line */}

        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />


        <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">


          {/* =================================================
              LOGO
              ================================================= */}

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3.5"
          >

            {/* Logo */}

            <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/10 transition duration-300 group-hover:scale-105 group-hover:shadow-purple-500/20">

              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#090f1d]">

                <span className="text-sm font-black tracking-tight">
                  MS
                </span>

              </div>

            </div>


            {/* Name */}

            <div className="hidden sm:block">

              <p className="text-[14px] font-bold tracking-wide text-white">
                Mehtab Singh
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                Software Developer
              </p>

            </div>

          </NavLink>


          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <div className="hidden items-center rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1.5 shadow-2xl shadow-black/10 md:flex">

            {navItems.map((item) => (

              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `
                    group relative flex items-center gap-2 rounded-xl
                    px-3.5 py-2.5 text-[13px] font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-white/[0.08] text-white shadow-inner shadow-white/[0.03]"
                        : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                    }
                  `
                }
              >

                {({ isActive }) => (
                  <>

                    <span
                      className={`
                        transition-all duration-300
                        ${
                          isActive
                            ? "text-cyan-300"
                            : "text-gray-600 group-hover:text-gray-300"
                        }
                      `}
                    >
                      {item.icon}
                    </span>


                    <span>
                      {item.label}
                    </span>


                    {/* Active indicator */}

                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                    )}

                  </>
                )}

              </NavLink>

            ))}

          </div>


          {/* =================================================
              RIGHT SIDE
              ================================================= */}

          <div className="hidden items-center gap-2 md:flex">


            {/* GitHub */}

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white"
            >
              {icons.github}
            </a>


            {/* LinkedIn */}

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white"
            >
              {icons.linkedin}
            </a>


            {/* Divider */}

            <div className="mx-2 h-6 w-px bg-white/[0.08]" />


            {/* Contact */}

            <NavLink
              to="/contact"
              className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[13px] font-semibold text-gray-200 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.07] hover:text-white"
            >

              <span>
                Let&apos;s Talk
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {icons.arrow}
              </span>

            </NavLink>

          </div>


          {/* =================================================
              MOBILE BUTTON
              ================================================= */}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-gray-400 transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-white md:hidden"
          >
            {menuOpen ? icons.close : icons.menu}
          </button>

        </nav>


        {/* =====================================================
            MOBILE MENU
            ===================================================== */}

        <div
          className={`
            overflow-hidden border-t border-white/[0.06]
            transition-all duration-300 md:hidden
            ${
              menuOpen
                ? "max-h-[650px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div className="px-5 py-5 sm:px-6">


            {/* Navigation card */}

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-2">

              {navItems.map((item) => (

                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `
                      group flex items-center gap-3 rounded-xl
                      px-3 py-3.5 text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-white/[0.07] text-white"
                          : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                      }
                    `
                  }
                >

                  {({ isActive }) => (
                    <>

                      <span
                        className={`
                          flex h-9 w-9 items-center justify-center rounded-lg
                          transition-all
                          ${
                            isActive
                              ? "bg-cyan-400/10 text-cyan-300"
                              : "bg-white/[0.025] text-gray-600 group-hover:text-gray-300"
                          }
                        `}
                      >
                        {item.icon}
                      </span>


                      <span>
                        {item.label}
                      </span>


                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                      )}

                    </>
                  )}

                </NavLink>

              ))}

            </div>


            {/* Mobile social links */}

            <div className="mt-4 grid grid-cols-2 gap-3">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] py-3 text-xs font-medium text-gray-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                {icons.github}
                GitHub
              </a>


              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] py-3 text-xs font-medium text-gray-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                {icons.linkedin}
                LinkedIn
              </a>

            </div>


            {/* Mobile CTA */}

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/[0.1]"
            >
              Let&apos;s Talk
              {icons.arrow}
            </NavLink>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="relative flex-1">

        <div className="relative">
          <Outlet />
        </div>

      </main>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="relative border-t border-white/[0.06] bg-[#030611]/60">


        {/* Footer glow */}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-500/[0.03] to-transparent" />


        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">


            {/* Brand */}

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 text-[10px] font-black text-white">
                  MS
                </div>

                <div>

                  <p className="text-sm font-semibold text-gray-200">
                    Mehtab Singh
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-600">
                    Software Developer
                  </p>

                </div>

              </div>

              <p className="mt-4 max-w-sm text-xs leading-5 text-gray-600">
                Building useful digital experiences with clean code,
                thoughtful design, and modern technology.
              </p>

            </div>


            {/* Footer right */}

            <div className="flex flex-col items-start gap-4 sm:items-end">

              <div className="flex items-center gap-2">

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-gray-600 transition hover:border-white/[0.12] hover:text-gray-300"
                >
                  {icons.github}
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-gray-600 transition hover:border-white/[0.12] hover:text-gray-300"
                >
                  {icons.linkedin}
                </a>

              </div>


              <div className="flex items-center gap-3">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />

                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-600">
                  Available for opportunities
                </span>

              </div>

            </div>

          </div>


          {/* Bottom */}

          <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] text-gray-700">
              © {new Date().getFullYear()} Mehtab Singh. All rights reserved.
            </p>

            <p className="text-[11px] text-gray-700">
              Designed &amp; built with React
            </p>

          </div>

        </div>

      </footer>

    </div>
  )
}

export default PublicLayout