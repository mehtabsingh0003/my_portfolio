import { useEffect, useMemo, useState } from "react"
import { getPublicSkills } from "../../services/skillService"

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGitAlt,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaAws,
  FaCode,
  FaServer,
  FaBrain,
  FaTools,
  FaRocket,
  FaCheck,
  FaArrowRight,
  FaLayerGroup,
} from "react-icons/fa"

import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiPostgresql,
  SiFirebase,
  SiMysql,
  SiCplusplus,
} from "react-icons/si"


// ============================================================
// TECHNOLOGY ICONS
// ============================================================

const iconMap = {
  // Programming
  python: FaPython,

  java: FaJava,

  javascript: FaJs,
  js: FaJs,

  typescript: SiTypescript,
  ts: SiTypescript,

  cpp: SiCplusplus,
  "c++": SiCplusplus,
  cplusplus: SiCplusplus,

  // Frontend
  react: FaReact,
  reactjs: FaReact,
  "react.js": FaReact,

  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,

  html: FaHtml5,
  html5: FaHtml5,

  css: FaCss3Alt,
  css3: FaCss3Alt,

  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  "tailwind css": SiTailwindcss,

  redux: SiRedux,

  // Backend
  node: FaNodeJs,
  nodejs: FaNodeJs,
  "node.js": FaNodeJs,

  express: SiExpress,
  expressjs: SiExpress,
  "express.js": SiExpress,

  // Database
  mongo: SiMongodb,
  mongodb: SiMongodb,

  mysql: SiMysql,

  postgres: SiPostgresql,
  postgresql: SiPostgresql,

  database: FaDatabase,

  // Tools
  git: FaGitAlt,
  github: FaGitAlt,

  docker: FaDocker,

  aws: FaAws,
}


// ============================================================
// NORMALIZE TEXT
// ============================================================

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
}


// ============================================================
// GET REAL TECHNOLOGY ICON
// ============================================================

function getSkillIcon(skill) {
  const iconValue = normalize(skill?.icon)
  const nameValue = normalize(skill?.name)

  // First use the icon value from admin
  if (iconMap[iconValue]) {
    return iconMap[iconValue]
  }

  // Then use skill name
  if (iconMap[nameValue]) {
    return iconMap[nameValue]
  }

  // Partial matching
  if (
    iconValue.includes("python") ||
    nameValue.includes("python")
  ) {
    return FaPython
  }

  if (
    iconValue.includes("c++") ||
    iconValue.includes("cpp") ||
    nameValue.includes("c++") ||
    nameValue.includes("cpp")
  ) {
    return SiCplusplus
  }

  if (
    iconValue.includes("javascript") ||
    nameValue.includes("javascript")
  ) {
    return FaJs
  }

  if (
    iconValue.includes("typescript") ||
    nameValue.includes("typescript")
  ) {
    return SiTypescript
  }

  if (
    iconValue.includes("react") ||
    nameValue.includes("react")
  ) {
    return FaReact
  }

  if (
    iconValue.includes("next") ||
    nameValue.includes("next")
  ) {
    return SiNextdotjs
  }

  if (
    iconValue.includes("node") ||
    nameValue.includes("node")
  ) {
    return FaNodeJs
  }

  if (
    iconValue.includes("express") ||
    nameValue.includes("express")
  ) {
    return SiExpress
  }

  if (
    iconValue.includes("mongo") ||
    nameValue.includes("mongo")
  ) {
    return SiMongodb
  }

  if (
    iconValue.includes("mysql") ||
    nameValue.includes("mysql")
  ) {
    return SiMysql
  }

  if (
    iconValue.includes("postgres") ||
    nameValue.includes("postgres")
  ) {
    return SiPostgresql
  }

  if (
    iconValue.includes("tailwind") ||
    nameValue.includes("tailwind")
  ) {
    return SiTailwindcss
  }

  if (
    iconValue.includes("docker") ||
    nameValue.includes("docker")
  ) {
    return FaDocker
  }

  if (
    iconValue.includes("git") ||
    nameValue.includes("git")
  ) {
    return FaGitAlt
  }

  if (
    iconValue.includes("html") ||
    nameValue.includes("html")
  ) {
    return FaHtml5
  }

  if (
    iconValue.includes("css") ||
    nameValue.includes("css")
  ) {
    return FaCss3Alt
  }

  if (
    iconValue.includes("java") ||
    nameValue.includes("java")
  ) {
    return FaJava
  }

  // Safe fallback
  return FaCode
}


// ============================================================
// CATEGORY ICON
// ============================================================

function getCategoryIcon(category) {
  const value = normalize(category)

  if (
    value.includes("programming") ||
    value.includes("language")
  ) {
    return FaCode
  }

  if (
    value.includes("frontend") ||
    value.includes("front end") ||
    value.includes("web")
  ) {
    return FaReact
  }

  if (
    value.includes("backend") ||
    value.includes("back end") ||
    value.includes("api")
  ) {
    return FaServer
  }

  if (
    value.includes("database") ||
    value.includes("data")
  ) {
    return FaDatabase
  }

  if (
    value.includes("ai") ||
    value.includes("machine learning") ||
    value.includes("machine")
  ) {
    return FaBrain
  }

  if (
    value.includes("devops") ||
    value.includes("tool")
  ) {
    return FaTools
  }

  return FaLayerGroup
}


// ============================================================
// ABOUT PAGE
// ============================================================

function About() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  // ==========================================================
  // LOAD PUBLIC SKILLS
  // ==========================================================

  useEffect(() => {
    let cancelled = false

    async function loadSkills() {
      try {
        setLoading(true)
        setError("")

        const data = await getPublicSkills()

        if (cancelled) return

        setSkills(
          Array.isArray(data)
            ? data
            : []
        )
      } catch (err) {
        if (cancelled) return

        setError(
          err?.message ||
            "Failed to load skills."
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadSkills()

    return () => {
      cancelled = true
    }
  }, [])


  // ==========================================================
  // GROUP SKILLS
  // ==========================================================

  const groupedSkills = useMemo(() => {
    const groups = {}

    skills.forEach((skill) => {
      const category =
        skill?.category?.trim() ||
        "Other"

      if (!groups[category]) {
        groups[category] = []
      }

      groups[category].push(skill)
    })

    return groups
  }, [skills])


  const categories = Object.entries(
    groupedSkills
  )


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="min-h-screen overflow-hidden bg-[#070912] text-white">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="absolute -right-40 top-[20%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-purple-500/[0.06] blur-[120px]" />

      </div>


      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 border-b border-white/[0.06]">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:py-28">

          <div className="grid items-center gap-14 lg:grid-cols-[1.3fr_.7fr]">

            {/* LEFT */}

            <div>

              {/* Label */}

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,.8)]" />

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                  About Me
                </span>

              </div>


              {/* Heading */}

              <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-7xl">

                Full-Stack Developer

                <br />

                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  building things that matter.
                </span>

              </h1>


              {/* Description */}

              <p className="mt-8 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
                I&apos;m Mehtab Singh, a full-stack developer
                focused on building clean, reliable and
                scalable web applications.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-500">
                I enjoy working across the entire development
                stack — from responsive interfaces and APIs
                to databases, authentication and deployment.
              </p>


              {/* Stats */}

              <div className="mt-10 flex flex-wrap gap-3">

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30">

                  <p className="text-2xl font-black">
                    {skills.length}
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Technologies
                  </p>

                </div>


                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">

                  <p className="text-2xl font-black">
                    {categories.length}
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Skill Groups
                  </p>

                </div>


                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30">

                  <p className="text-2xl font-black">
                    AI
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Exploring
                  </p>

                </div>

              </div>

            </div>


            {/* RIGHT PROFILE CARD */}

            <div className="relative">

              <div className="rounded-[28px] border border-white/[0.08] bg-[#0c101b]/80 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">

                {/* Profile */}

                <div className="flex items-center gap-4">

                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 p-[1px]">

                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#080b12]">

                      <span className="text-lg font-black">
                        MS
                      </span>

                    </div>

                  </div>


                  <div>

                    <h2 className="text-lg font-bold">
                      Mehtab Singh
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Full-Stack Developer
                    </p>

                  </div>

                </div>


                <div className="my-7 h-px bg-white/[0.07]" />


                {/* Focus */}

                <div className="space-y-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">

                      <FaCode size={17} />

                    </div>

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                        Focus
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-300">
                        Full-Stack Development
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

                      <FaBrain size={17} />

                    </div>

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                        Exploring
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-300">
                        AI & Multi-Agent Systems
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400">

                      <FaServer size={17} />

                    </div>

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                        Backend
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-300">
                        APIs & Databases
                      </p>

                    </div>

                  </div>

                </div>


                {/* Status */}

                <div className="mt-7 flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3">

                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />

                  <span className="text-xs font-semibold text-emerald-300">
                    Open to opportunities
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          SKILLS
      ====================================================== */}

      <section className="relative z-10 px-6 py-20 sm:px-8 md:py-28">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <div className="mb-12">

            <div className="flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-purple-400" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                Technical Skills
              </p>

            </div>


            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">

              Skills &{" "}

              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Technologies
              </span>

            </h2>


            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
              Technologies and tools I use to design,
              develop and deliver modern web applications.
            </p>

          </div>


          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (

            <div className="grid gap-6 lg:grid-cols-2">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="h-60 animate-pulse rounded-[26px] border border-white/[0.06] bg-white/[0.025]"
                />

              ))}

            </div>

          )}


          {/* ==================================================
              ERROR
          ================================================== */}

          {!loading && error && (

            <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.05] p-6">

              <p className="font-semibold text-red-300">
                Unable to load skills
              </p>

              <p className="mt-2 text-sm text-red-400/70">
                {error}
              </p>

            </div>

          )}


          {/* ==================================================
              EMPTY
          ================================================== */}

          {!loading &&
            !error &&
            skills.length === 0 && (

              <div className="rounded-[26px] border border-dashed border-white/[0.10] p-16 text-center">

                <FaCode
                  size={28}
                  className="mx-auto text-gray-600"
                />

                <h3 className="mt-5 text-xl font-bold">
                  No skills available
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Add skills from the admin panel
                  to display them here.
                </p>

              </div>

            )}


          {/* ==================================================
              SKILL GROUPS
          ================================================== */}

          {!loading &&
            !error &&
            skills.length > 0 && (

              <div className="grid gap-6 lg:grid-cols-2">

                {categories.map(
                  ([category, categorySkills], index) => {

                    const CategoryIcon =
                      getCategoryIcon(category)

                    const sortedSkills =
                      [...categorySkills].sort(
                        (a, b) =>
                          Number(a?.order ?? 0) -
                          Number(b?.order ?? 0)
                      )

                    return (

                      <div
                        key={category}
                        className="group rounded-[26px] border border-white/[0.08] bg-[#0b0f19]/80 p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-[#0d121e] sm:p-7"
                      >

                        {/* CATEGORY */}

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-gradient-to-br from-purple-500/10 to-cyan-400/10 text-purple-400">

                              <CategoryIcon
                                size={20}
                              />

                            </div>


                            <div>

                              <h3 className="text-lg font-bold capitalize">
                                {category}
                              </h3>

                              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                {categorySkills.length}{" "}
                                {categorySkills.length === 1
                                  ? "Skill"
                                  : "Skills"}
                              </p>

                            </div>

                          </div>


                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.03] text-[10px] font-black text-gray-600">

                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}

                          </div>

                        </div>


                        {/* DIVIDER */}

                        <div className="my-6 h-px bg-white/[0.06]" />


                        {/* SKILLS */}

                        <div className="grid gap-3 sm:grid-cols-2">

                          {sortedSkills.map(
                            (skill) => {

                              const SkillIcon =
                                getSkillIcon(skill)

                              return (

                                <div
                                  key={
                                    skill?._id ||
                                    `${category}-${skill?.name}`
                                  }
                                  className="group/skill flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#101522] px-3.5 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-[#141b2a]"
                                >

                                  {/* REAL ICON */}

                                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#192235] text-xl text-cyan-400 transition-all duration-300 group-hover/skill:scale-110">

                                    <SkillIcon
                                      aria-hidden="true"
                                    />

                                  </div>


                                  {/* TEXT */}

                                  <div className="min-w-0 flex-1">

                                    <p className="truncate text-sm font-bold capitalize text-white">
                                      {skill?.name ||
                                        "Technology"}
                                    </p>

                                    <p className="mt-1 truncate text-[9px] font-medium uppercase tracking-wider text-gray-600">
                                      {skill?.icon ||
                                        "Technology"}
                                    </p>

                                  </div>


                                  {/* CHECK */}

                                  <FaCheck
                                    size={10}
                                    className="shrink-0 text-gray-700 transition-colors duration-300 group-hover/skill:text-cyan-400"
                                  />

                                </div>

                              )
                            }
                          )}

                        </div>

                      </div>

                    )
                  }
                )}

              </div>

            )}

        </div>

      </section>


      {/* ======================================================
          APPROACH
      ====================================================== */}

      <section className="relative z-10 border-t border-white/[0.06] px-6 py-20 sm:px-8 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">

            {/* LEFT */}

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                My Approach
              </p>

              <h2 className="mt-5 text-4xl font-black sm:text-5xl">

                How I{" "}

                <span className="text-cyan-400">
                  work
                </span>

                .

              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-500">
                I focus on building software that is
                functional, maintainable, scalable and
                enjoyable to use.
              </p>

            </div>


            {/* CARDS */}

            <div className="grid gap-4 sm:grid-cols-2">

              <ApproachCard
                number="01"
                title="Clean Code"
                description="Readable, maintainable code with clear structure and reusable components."
                icon={FaCode}
                iconClass="text-cyan-400"
              />

              <ApproachCard
                number="02"
                title="Full-Stack Thinking"
                description="I consider the complete application from UI and APIs to databases and deployment."
                icon={FaLayerGroup}
                iconClass="text-purple-400"
              />

              <ApproachCard
                number="03"
                title="Problem Solving"
                description="I focus on understanding the actual problem before choosing the right technical solution."
                icon={FaTools}
                iconClass="text-fuchsia-400"
              />

              <ApproachCard
                number="04"
                title="Continuous Learning"
                description="I continuously explore modern web technologies and AI-powered development."
                icon={FaRocket}
                iconClass="text-cyan-400"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="relative z-10 px-6 pb-24 pt-4 sm:px-8 md:pb-32">

        <div className="mx-auto max-w-5xl">

          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-gradient-to-br from-purple-500/[0.09] via-white/[0.025] to-cyan-500/[0.07] px-7 py-12 text-center sm:px-12">

            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="relative">

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                Let&apos;s build something
              </p>


              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                Have an idea worth turning into reality?
              </h2>


              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
                I&apos;m always interested in interesting products,
                challenging engineering problems and
                opportunities to build useful software.
              </p>


              <a
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20"
              >

                Get in touch

                <FaArrowRight
                  size={12}
                />

              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}


// ============================================================
// APPROACH CARD
// ============================================================

function ApproachCard({
  number,
  title,
  description,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="group rounded-[24px] border border-white/[0.07] bg-[#0b0f19]/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-[#0d121e]">

      <div className="flex items-center justify-between">

        <span
          className={`text-xs font-black ${iconClass}`}
        >
          {number}
        </span>

        <Icon
          size={16}
          className={`${iconClass} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
        />

      </div>


      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-7 text-gray-500">
        {description}
      </p>

    </div>
  )
}


export default About