import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProjects } from "../../services/projectService"
import { getSkills } from "../../services/skillService"
import { useAuth } from "../../context/AuthContext"

function Dashboard() {
  const { user } = useAuth()

  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true)
        setError("")

        const [projectsData, skillsData] = await Promise.all([
          getProjects(),
          getSkills(),
        ])

        setProjects(projectsData)
        setSkills(skillsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const totalProjects = projects.length

  const publishedProjects = projects.filter(
    (project) => project.published
  ).length

  const draftProjects =
    totalProjects - publishedProjects

  const featuredProjects = projects.filter(
    (project) => project.featured
  ).length

  const totalSkills = skills.length

  const publishedSkills = skills.filter(
    (skill) => skill.published
  ).length

  const draftSkills =
    totalSkills - publishedSkills

  const categoryList = [
    ...new Set(
      skills
        .map((skill) => skill.category)
        .filter(Boolean)
    ),
  ]

  const categories = categoryList.length

  const projectPercentage =
    totalProjects > 0
      ? Math.round(
          (publishedProjects / totalProjects) * 100
        )
      : 0

  const skillPercentage =
    totalSkills > 0
      ? Math.round(
          (publishedSkills / totalSkills) * 100
        )
      : 0

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      description: "Projects in portfolio",
      icon: "◆",
      iconClass: "bg-purple-50 text-purple-600",
    },
    {
      label: "Published",
      value: publishedProjects,
      description: "Live projects",
      icon: "✓",
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Featured",
      value: featuredProjects,
      description: "Highlighted projects",
      icon: "✦",
      iconClass: "bg-amber-50 text-amber-600",
    },
    {
      label: "Skills",
      value: totalSkills,
      description: `${categories} categories`,
      icon: "⌘",
      iconClass: "bg-cyan-50 text-cyan-600",
    },
  ]

  const quickActions = [
    {
      title: "Add Project",
      description: "Create a new portfolio project",
      href: "/admin/projects/create",
      icon: "+",
      className:
        "from-purple-600 to-fuchsia-500",
    },
    {
      title: "Manage Projects",
      description: "Edit or organize your projects",
      href: "/admin/projects",
      icon: "◆",
      className:
        "from-gray-900 to-gray-700",
    },
    {
      title: "Manage Skills",
      description: "Update your technical skills",
      href: "/admin/skills",
      icon: "⌘",
      className:
        "from-cyan-500 to-blue-500",
    },
    {
      title: "Manage Resume",
      description: "Update your latest resume",
      href: "/admin/resume",
      icon: "PDF",
      className:
        "from-rose-500 to-orange-500",
    },
    {
      title: "Messages",
      description: "Check messages from visitors",
      href: "/admin/messages",
      icon: "✉",
      className:
        "from-emerald-500 to-teal-500",
    },
  ]

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative">
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="mt-4 h-12 w-80 rounded bg-gray-200" />
            <div className="mt-3 h-5 w-96 max-w-full rounded bg-gray-100" />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white"
              />
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-3">
            <div className="h-80 animate-pulse rounded-3xl border border-gray-200 bg-white xl:col-span-2" />
            <div className="h-80 animate-pulse rounded-3xl border border-gray-200 bg-white" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
          Dashboard Error
        </p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/5 blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-9">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-purple-100/70 blur-3xl" />

          <div className="absolute bottom-0 right-24 h-32 w-32 rounded-full bg-cyan-100/60 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-purple-500 to-cyan-400" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500">
                Admin Dashboard
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                  Welcome back
                  {user?.name ? `, ${user.name}` : ""}
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
                  Manage your portfolio, projects, skills and
                  professional content from one place.
                </p>
              </div>

              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
              >
                View Portfolio
                <span>↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold transition group-hover:scale-110 ${stat.iconClass}`}
                >
                  {stat.icon}
                </div>
              </div>

              <p className="mt-5 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* Main content */}
        <div className="mt-8 grid gap-8 xl:grid-cols-3">
          {/* Quick Actions */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7 xl:col-span-2">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
                  Manage
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Quick Actions
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Jump directly to the section you want to manage.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.href}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white shadow-sm ${action.className}`}
                    >
                      {action.icon}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {action.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {action.description}
                      </p>
                    </div>

                    <span className="ml-auto text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-600">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Portfolio Health */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-500">
                Overview
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Portfolio Health
              </h2>
            </div>

            {/* Projects progress */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  Projects Published
                </p>

                <p className="text-sm font-bold text-gray-900">
                  {projectPercentage}%
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-700"
                  style={{
                    width: `${projectPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {publishedProjects} of {totalProjects} projects live
              </p>
            </div>

            {/* Skills progress */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  Skills Published
                </p>

                <p className="text-sm font-bold text-gray-900">
                  {skillPercentage}%
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                  style={{
                    width: `${skillPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {publishedSkills} of {totalSkills} skills live
              </p>
            </div>

            {/* Summary */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Draft Projects
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {draftProjects}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Draft Skills
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {draftSkills}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Categories + Projects */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Categories */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-500">
                  Skills
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Skill Categories
                </h2>
              </div>

              <Link
                to="/admin/skills"
                className="text-sm font-semibold text-gray-500 transition hover:text-purple-600"
              >
                Manage →
              </Link>
            </div>

            {categoryList.length === 0 ? (
              <div className="mt-7 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-sm text-gray-400">
                  No skill categories yet.
                </p>

                <Link
                  to="/admin/skills"
                  className="mt-3 inline-block text-sm font-semibold text-purple-600"
                >
                  Add a skill →
                </Link>
              </div>
            ) : (
              <div className="mt-7 flex flex-wrap gap-3">
                {categoryList.map((category, index) => (
                  <div
                    key={category}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-purple-200 hover:bg-purple-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-purple-500 shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-medium text-gray-700 transition group-hover:text-purple-700">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Featured Projects */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500">
                  Projects
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Featured Work
                </h2>
              </div>

              <Link
                to="/admin/projects"
                className="text-sm font-semibold text-gray-500 transition hover:text-cyan-600"
              >
                Manage →
              </Link>
            </div>

            {featuredProjects === 0 ? (
              <div className="mt-7 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-sm text-gray-400">
                  No featured projects yet.
                </p>

                <Link
                  to="/admin/projects"
                  className="mt-3 inline-block text-sm font-semibold text-cyan-600"
                >
                  Manage projects →
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {projects
                  .filter((project) => project.featured)
                  .slice(0, 4)
                  .map((project) => (
                    <div
                      key={project._id}
                      className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-white hover:shadow-sm"
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-cyan-100 text-sm font-bold text-purple-500">
                          {project.title
                            ?.slice(0, 2)
                            .toUpperCase() || "PR"}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-gray-900">
                          {project.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-400">
                          {project.technologies?.length
                            ? project.technologies
                                .slice(0, 3)
                                .join(" · ")
                            : "No technologies added"}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          project.published
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {project.published
                          ? "Live"
                          : "Draft"}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard