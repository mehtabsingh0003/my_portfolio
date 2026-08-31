import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaDocker, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaAws } from "react-icons/fa"
import { SiTypescript, SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiRedux, SiPostgresql, SiFirebase, SiMysql } from "react-icons/si"
import {
  getSkills,
  deleteSkill,
} from "../../services/skillService"


const iconMap = {
  react: FaReact,
  "react.js": FaReact,
  "reactjs": FaReact,
  node: FaNodeJs,
  "node.js": FaNodeJs,
  nodejs: FaNodeJs,
  python: FaPython,
  java: FaJava,
  javascript: FaJs,
  js: FaJs,
  typescript: SiTypescript,
  ts: SiTypescript,
  git: FaGitAlt,
  docker: FaDocker,
  html: FaHtml5,
  html5: FaHtml5,
  css: FaCss3Alt,
  css3: FaCss3Alt,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  express: SiExpress,
  "express.js": SiExpress,
  next: SiNextdotjs,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  redux: SiRedux,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  firebase: SiFirebase,
  mysql: SiMysql,
  aws: FaAws,
  database: FaDatabase,
}

const getSkillIcon = (iconName) => {
  if (!iconName) return FaDatabase
  return iconMap[iconName.trim().toLowerCase()] || FaDatabase
}

function Skills() {
  const navigate = useNavigate()

  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [deleteTarget, setDeleteTarget] = useState(null)

  const loadSkills = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getSkills()
      setSkills(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    queueMicrotask(loadSkills)
  }, [])

  const openDeleteModal = (skill) => {
    setDeleteTarget(skill)
    setError("")
  }

  const closeDeleteModal = () => {
    if (deletingId) return
    setDeleteTarget(null)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      setDeletingId(deleteTarget._id)
      setError("")
      setMessage("")

      await deleteSkill(deleteTarget._id)

      setMessage("Skill deleted successfully")
      setDeleteTarget(null)
      await loadSkills()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  const groupedSkills = skills.reduce((groups, skill) => {
    const category = skill.category || "Other"

    if (!groups[category]) {
      groups[category] = []
    }

    groups[category].push(skill)
    return groups
  }, {})

  const sortedCategories = Object.entries(groupedSkills).sort(
    ([, skillsA], [, skillsB]) => {
      const firstA = skillsA[0]?.order ?? 0
      const firstB = skillsB[0]?.order ?? 0
      return firstA - firstB
    }
  )

  const categoryCount = Object.keys(groupedSkills).length
  const publishedCount = skills.filter((skill) => skill.published).length
  const draftCount = skills.filter((skill) => !skill.published).length

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="mt-4 h-12 w-48 rounded bg-slate-200" />
          <div className="mt-3 h-5 w-80 rounded bg-slate-100" />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>

          <div className="mt-8 h-80 rounded-3xl border border-slate-200 bg-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
                  Portfolio Management
                </p>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Skills
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage your technical skills, categories and visibility. Use technology names such as React, Node.js, Python, Java, MongoDB or Docker for real icons.
              </p>
            </div>

            {/* ADD BUTTON */}
            <button
              type="button"
              onClick={() => navigate("/admin/skills/new")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <span className="text-xl leading-none">+</span>
              Add Skill
            </button>
          </div>
        </header>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-semibold text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              className="text-lg text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        )}

        {message && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-semibold text-emerald-600">
              ✓ {message}
            </p>
            <button
              type="button"
              onClick={() => setMessage("")}
              className="text-lg text-emerald-400 hover:text-emerald-600"
            >
              ×
            </button>
          </div>
        )}

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Skills</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">
              {skills.length}
            </p>
            <p className="mt-1 text-xs text-slate-400">All skills</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Published</p>
            <p className="mt-3 text-3xl font-bold text-emerald-600">
              {publishedCount}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {draftCount} {draftCount === 1 ? "draft" : "drafts"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Categories</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">
              {categoryCount}
            </p>
            <p className="mt-1 text-xs text-slate-400">Skill groups</p>
          </div>
        </section>

        {/* Library */}
        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-500">
                Skill Library
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Your Skills
              </h2>
            </div>

            <span className="text-sm text-slate-400">
              {skills.length} total
            </span>
          </div>

          {skills.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-2xl text-violet-500">
                ✦
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No skills yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Click Add Skill to create your first skill.
              </p>
              <button
                type="button"
                onClick={() => navigate("/admin/skills/new")}
                className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                Add Your First Skill
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedCategories.map(
                ([category, categorySkills], categoryIndex) => (
                  <section key={category}>
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-cyan-100 text-sm font-bold text-violet-600">
                        {String(categoryIndex + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {category}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {categorySkills.length}{" "}
                          {categorySkills.length === 1 ? "skill" : "skills"}
                        </p>
                      </div>

                      <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {[...categorySkills]
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        .map((skill) => (
                          <article
                            key={skill._id}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-600 transition group-hover:bg-violet-50 group-hover:text-violet-600">
                                  {(() => {
                                    const SkillIcon = getSkillIcon(skill.icon)
                                    return <SkillIcon aria-hidden="true" />
                                  })()}
                                </div>

                                <div className="min-w-0">
                                  <h4 className="truncate font-bold text-slate-900">
                                    {skill.name}
                                  </h4>
                                  <p className="mt-1 text-xs text-slate-400">
                                    Order {skill.order}
                                  </p>
                                </div>
                              </div>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                                  skill.published
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-slate-100 text-slate-400"
                                }`}
                              >
                                {skill.published ? "Live" : "Draft"}
                              </span>
                            </div>

                            {skill.icon && (
                              <div className="mt-5 rounded-xl bg-slate-50 px-3 py-2">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Technology Icon
                                </p>
                                <p className="mt-1 truncate text-xs font-semibold text-slate-600">
                                  {skill.icon}
                                </p>
                              </div>
                            )}

                            <div className="mt-5 flex gap-2">
                              {/* EDIT OPENS THE SECOND FILE */}
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(`/admin/skills/edit/${skill._id}`)
                                }
                                className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-violet-50 hover:text-violet-600"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => openDeleteModal(skill)}
                                disabled={deletingId === skill._id}
                                className="flex-1 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                              >
                                {deletingId === skill._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </div>
                          </article>
                        ))}
                    </div>
                  </section>
                )
              )}
            </div>
          )}
        </section>
      </main>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-bold text-red-500">
              !
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-950">
              Delete Skill?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-800">
                {deleteTarget.name}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm font-medium text-red-500">
              This action cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deletingId}
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingId}
                className="flex-1 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId ? "Deleting..." : "Delete Skill"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Skills
