import { useEffect, useState } from "react"
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaCode,
  FaBolt,
  FaBriefcase,
  FaArrowRight,
  FaGlobe,
} from "react-icons/fa"
import { SiLeetcode } from "react-icons/si"

import { getProfile } from "../../services/profileService"

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#030712] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="h-4 w-32 rounded bg-gray-800" />

          <div className="mt-7 h-16 w-96 max-w-full rounded-2xl bg-gray-800" />

          <div className="mt-5 h-6 w-64 rounded bg-gray-800" />

          <div className="mt-8 h-20 max-w-2xl rounded-2xl bg-gray-900" />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="h-48 rounded-3xl bg-gray-900" />
            <div className="h-48 rounded-3xl bg-gray-900" />
            <div className="h-48 rounded-3xl bg-gray-900" />
          </div>

        </div>
      </main>
    )
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.05] p-8">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">
              Profile Error
            </p>

            <h1 className="mt-4 text-3xl font-black">
              Unable to load profile
            </h1>

            <p className="mt-3 text-gray-500">
              {error}
            </p>

          </div>

        </div>
      </main>
    )
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#030712] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">

            <h1 className="text-3xl font-black">
              Profile unavailable
            </h1>

            <p className="mt-3 text-gray-500">
              No profile information is available.
            </p>

          </div>

        </div>
      </main>
    )
  }

  // =====================================================
  // PROFILE DATA
  // =====================================================

  const fullName =
    profile.name ||
    "Mehtab Singh"

  const username =
    profile.username ||
    ""

  const role =
    profile.role ||
    "Software Developer"

  const bio =
    profile.bio ||
    "I enjoy building useful products, solving challenging problems and creating reliable web applications."

  const email =
    profile.email ||
    ""

  const location =
    profile.location ||
    ""

  const github =
    profile.github || {}

  const linkedin =
    profile.linkedin || {}

  const leetcode =
    profile.leetcode || {}

  // IMPORTANT:
  // Backend uses codingProfile
  const codingProfile =
    profile.codingProfile || {}

  // =====================================================
  // SOCIALS
  // =====================================================

  const socials = [
    {
      name: "GitHub",
      username: github.username,
      url: github.url,
      icon: <FaGithub />,
      description:
        "Projects, repositories & contributions",
      iconClass: "text-white",
      iconBg: "bg-white/[0.07]",
      hover:
        "hover:border-white/20 hover:bg-white/[0.04]",
    },
    {
      name: "LinkedIn",
      username: linkedin.username,
      url: linkedin.url,
      icon: <FaLinkedin />,
      description:
        "Professional profile & experience",
      iconClass: "text-blue-400",
      iconBg: "bg-blue-500/10",
      hover:
        "hover:border-blue-400/30 hover:bg-blue-500/[0.04]",
    },
    {
      name: "LeetCode",
      username: leetcode.username,
      url: leetcode.url,
      icon: <SiLeetcode />,
      description:
        "Algorithms, problems & contests",
      iconClass: "text-yellow-400",
      iconBg: "bg-yellow-400/10",
      hover:
        "hover:border-yellow-400/30 hover:bg-yellow-400/[0.04]",
    },
  ].filter(
    (item) =>
      item.username ||
      item.url
  )

  // =====================================================
  // INITIALS
  // =====================================================

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* =================================================
          BACKGROUND
          ================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10">

        <div className="absolute left-[-12rem] top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-purple-600/[0.08] blur-[120px]" />

        <div className="absolute right-[-12rem] top-[20rem] h-[32rem] w-[32rem] rounded-full bg-cyan-500/[0.07] blur-[120px]" />

        <div className="absolute bottom-[-10rem] left-[35%] h-[28rem] w-[28rem] rounded-full bg-blue-600/[0.05] blur-[120px]" />

      </div>

      {/* =================================================
          HERO
          ================================================= */}

      <section className="border-b border-white/[0.06]">

        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 md:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_360px]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/10 bg-cyan-400/[0.04] px-4 py-2">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />

                </span>

                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                  Developer Profile
                </span>

              </div>

              <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl">
                {fullName}
              </h1>

              <div className="mt-6 flex items-center gap-3">

                <span className="h-px w-8 bg-purple-400" />

                <p className="text-lg font-semibold text-gray-300 md:text-2xl">
                  {role}
                </p>

              </div>

              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
                {bio}
              </p>

              {/* DETAILS */}

              <div className="mt-7 flex flex-wrap gap-3">

                {location && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-gray-400">

                    <FaMapMarkerAlt className="text-cyan-400" />

                    <span>{location}</span>

                  </div>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-gray-400 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:text-white"
                  >

                    <FaEnvelope className="text-cyan-400" />

                    <span>{email}</span>

                  </a>
                )}

              </div>

              {/* CTA */}

              <div className="mt-8 flex flex-wrap gap-3">

                {email && (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                    className="group inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl hover:shadow-white/10"
                  >
                    <FaEnvelope className="h-4 w-4" />

                    <span>Contact Me</span>

                    <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                )}

                {github.url && (
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.025] px-5 py-3.5 text-sm font-bold text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >

                    <FaGithub />

                    GitHub

                    <FaExternalLinkAlt className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />

                  </a>
                )}

              </div>

            </div>

            {/* PROFILE CARD */}

            <div className="relative">

              <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#080f1f]/90 p-6 shadow-2xl backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">
                    Profile
                  </span>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[10px] font-bold text-emerald-300">
                      Available
                    </span>

                  </div>

                </div>

                {/* AVATAR */}

                <div className="mt-8 flex items-center justify-center">

                  <div className="relative">

                    <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-purple-500/30 to-cyan-400/20 blur-xl" />

                    <div className="relative flex h-32 w-32 items-center justify-center rounded-[28px] bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 text-4xl font-black shadow-xl">
                      {initials}
                    </div>

                  </div>

                </div>

                <div className="mt-7 text-center">

                  <h2 className="text-2xl font-black">
                    {fullName}
                  </h2>

                  {username && (
                    <p className="mt-1 text-sm text-gray-600">
                      @{username}
                    </p>
                  )}

                </div>

                <div className="my-7 h-px bg-white/[0.07]" />

                {/* MINI STATS */}

                <div className="grid grid-cols-3 gap-2">

                  <MiniStat
                    value={
                      github.url
                        ? "GitHub"
                        : "-"
                    }
                    label="Code"
                  />

                  <MiniStat
                    value={
                      leetcode.url
                        ? "DSA"
                        : "-"
                    }
                    label="Practice"
                  />

                  <MiniStat
                    value="Full"
                    label="Stack"
                  />

                </div>

                <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">

                      <FaBriefcase className="text-sm text-emerald-400" />

                    </div>

                    <div>

                      <p className="text-xs font-bold text-emerald-300">
                        Open to opportunities
                      </p>

                      <p className="mt-1 text-[10px] text-gray-600">
                        Let&apos;s build something useful.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          SOCIAL
          ================================================= */}

      {socials.length > 0 && (
        <section className="border-b border-white/[0.06]">

          <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">

            <SectionHeading
              eyebrow="Connect"
              title="Find me online"
              description="Explore my work, professional profile and coding journey."
            />

            <div className="grid gap-4 md:grid-cols-3">

              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080f1f] p-6 transition duration-300 hover:-translate-y-1 ${social.hover}`}
                >

                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.025] blur-2xl transition duration-500 group-hover:scale-150" />

                  <div className="relative">

                    <div className="flex items-start justify-between">

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${social.iconBg} ${social.iconClass} text-2xl transition duration-300 group-hover:scale-105`}
                      >
                        {social.icon}
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-gray-700 transition duration-300 group-hover:border-white/10 group-hover:text-white">

                        <FaExternalLinkAlt className="h-3 w-3" />

                      </div>

                    </div>

                    <h3 className="mt-7 text-xl font-black">
                      {social.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      @{social.username || "profile"}
                    </p>

                    <p className="mt-5 text-xs leading-6 text-gray-600">
                      {social.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gray-500 transition group-hover:text-white">

                      Visit profile

                      <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />

                    </div>

                  </div>

                </a>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* =================================================
          CODING FOCUS
          ================================================= */}

      {(codingProfile.focus ||
        codingProfile.practice ||
        codingProfile.goal) && (

          <section className="border-b border-white/[0.06]">

            <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">

              <SectionHeading
                eyebrow="Development"
                title="How I work"
                description="The principles that shape how I approach development and problem solving."
              />

              <div className="grid gap-4 md:grid-cols-3">

                {codingProfile.focus && (
                  <FocusCard
                    number="01"
                    title="Focus"
                    value={codingProfile.focus}
                    icon={<FaCode />}
                    iconClass="text-cyan-400"
                  />
                )}

                {codingProfile.practice && (
                  <FocusCard
                    number="02"
                    title="Practice"
                    value={codingProfile.practice}
                    icon={<FaBolt />}
                    iconClass="text-purple-400"
                  />
                )}

                {codingProfile.goal && (
                  <FocusCard
                    number="03"
                    title="Goal"
                    value={codingProfile.goal}
                    icon={<FaBriefcase />}
                    iconClass="text-cyan-400"
                  />
                )}

              </div>

            </div>

          </section>
        )}

      {/* =================================================
          CODING ACTIVITY
          ================================================= */}

      {(github.url || leetcode.url) && (

        <section className="border-b border-white/[0.06]">

          <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">

            <SectionHeading
              eyebrow="Coding"
              title="Explore my coding activity"
              description="Dive deeper into my repositories and algorithmic problem solving."
            />

            <div className="grid gap-4 md:grid-cols-2">

              {/* GITHUB */}

              {github.url && (
                <a
                  href="/github"
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080f1f] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20"
                >

                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.025] blur-3xl transition duration-500 group-hover:scale-125" />

                  <div className="relative flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-2xl">
                        <FaGithub />
                      </div>

                      <div>

                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-600">
                          GitHub
                        </p>

                        <h3 className="mt-1 text-xl font-black">
                          GitHub Activity
                        </h3>

                      </div>

                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] text-gray-600 transition duration-300 group-hover:translate-x-1 group-hover:text-white">

                      <FaArrowRight className="h-3.5 w-3.5" />

                    </div>

                  </div>

                  <p className="relative mt-7 max-w-md text-sm leading-7 text-gray-500">
                    Explore repositories, contributions,
                    programming languages and development
                    activity.
                  </p>

                  <div className="relative mt-7 text-xs font-bold text-gray-600 transition group-hover:text-white">
                    View GitHub →
                  </div>

                </a>
              )}

              {/* LEETCODE */}

              {leetcode.url && (
                <a
                  href="/leetcode"
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080f1f] p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/25"
                >

                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-yellow-400/[0.04] blur-3xl transition duration-500 group-hover:scale-125" />

                  <div className="relative flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-2xl text-yellow-400">

                        <SiLeetcode />

                      </div>

                      <div>

                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-600">
                          LeetCode
                        </p>

                        <h3 className="mt-1 text-xl font-black">
                          LeetCode Stats
                        </h3>

                      </div>

                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] text-gray-600 transition duration-300 group-hover:translate-x-1 group-hover:text-yellow-400">

                      <FaArrowRight className="h-3.5 w-3.5" />

                    </div>

                  </div>

                  <p className="relative mt-7 max-w-md text-sm leading-7 text-gray-500">
                    Explore solved problems, difficulty
                    breakdown, submissions and contest
                    performance.
                  </p>

                  <div className="relative mt-7 text-xs font-bold text-gray-600 transition group-hover:text-yellow-400">
                    View LeetCode →
                  </div>

                </a>
              )}

            </div>

          </div>

        </section>
      )}

      {/* =================================================
          CONTACT
          ================================================= */}

      <section className="px-6 py-16 md:py-24">

        <div className="mx-auto max-w-5xl">

          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-purple-500/[0.08] via-white/[0.02] to-cyan-500/[0.07] px-7 py-14 text-center sm:px-12 md:py-16">

            <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="pointer-events-none absolute bottom-[-8rem] left-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-cyan-400">

                <FaGlobe />

              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Let&apos;s build
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Have an idea or opportunity?
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
                I&apos;m interested in building useful
                products, solving challenging problems
                and working with great people.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="group inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-gray-100"
                  >

                    <FaEnvelope />

                    Start a conversation

                    <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />

                  </a>
                )}

                {linkedin.url && (
                  <a
                    href={linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:text-white"
                  >

                    <FaLinkedin className="text-blue-400" />

                    Connect on LinkedIn

                  </a>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}


// =========================================================
// SECTION HEADING
// =========================================================

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-8">

      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">
        {eyebrow}
      </p>

      <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">

        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="max-w-xl text-sm leading-6 text-gray-600 md:text-right">
            {description}
          </p>
        )}

      </div>

    </div>
  )
}


// =========================================================
// MINI STAT
// =========================================================

function MiniStat({
  value,
  label,
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-3 text-center">

      <p className="truncate text-xs font-bold text-gray-300">
        {value}
      </p>

      <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-gray-700">
        {label}
      </p>

    </div>
  )
}


// =========================================================
// FOCUS CARD
// =========================================================

function FocusCard({
  number,
  title,
  value,
  icon,
  iconClass,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080f1f] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.15]">

      <div className="absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-white/[0.02] blur-2xl transition duration-500 group-hover:scale-150" />

      <div className="relative flex items-center justify-between">

        <span className="text-xs font-black text-gray-700">
          {number}
        </span>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ${iconClass} transition duration-300 group-hover:scale-105`}
        >
          {icon}
        </div>

      </div>

      <p className="relative mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
        {title}
      </p>

      <h3 className="relative mt-3 text-2xl font-black">
        {value}
      </h3>

    </div>
  )
}

export default Profile