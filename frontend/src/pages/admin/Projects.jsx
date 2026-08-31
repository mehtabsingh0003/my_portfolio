import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  getProjects,
  deleteProject,
} from "../../services/projectService"


// ============================================================
// ICONS
// ============================================================

const Icon = {
  Grid: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),

  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  ),

  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m20 20-4-4" />
    </svg>
  ),

  Refresh: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 11a8 8 0 0 0-15-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13a8 8 0 0 0 15 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21v-4h-4" />
    </svg>
  ),

  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  ),

  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path strokeLinecap="round" d="M10 11v5M14 11v5" />
    </svg>
  ),

  Star: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"
      />
    </svg>
  ),

  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  ),

  File: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" d="M14 3v5h5M8 13h8M8 17h5" />
    </svg>
  ),

  Image: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 18 5-5 3 3 3-3 5 5" />
    </svg>
  ),

  External: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </svg>
  ),

  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .7A11.3 11.3 0 0 0 8.4 22.1c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.16-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.35-5.22 5.63.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  ),

  Alert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 21 20H3L12 3Z" />
      <path strokeLinecap="round" d="M12 9v4M12 16h.01" />
    </svg>
  ),

  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  label,
  value,
  description,
  icon,
  iconClass,
  valueClass = "text-gray-950",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gray-100 opacity-60 blur-2xl transition group-hover:scale-125" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
            {label}
          </p>

          <p className={`mt-2 text-3xl font-bold tracking-tight ${valueClass}`}>
            {value}
          </p>

          <p className="mt-2 text-[11px] text-gray-400">
            {description}
          </p>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}


// ============================================================
// SKELETON
// ============================================================

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-3 w-24 rounded bg-gray-200" />
        <div className="mt-4 h-10 w-56 rounded-xl bg-gray-200" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-gray-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl border border-gray-200 bg-white"
          />
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <div className="h-56 animate-pulse bg-gray-100" />

            <div className="space-y-4 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
              <div className="h-16 animate-pulse rounded bg-gray-100" />
              <div className="h-8 w-1/2 animate-pulse rounded bg-gray-100" />
              <div className="h-10 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// ============================================================
// PROJECT CARD
// ============================================================

function ProjectCard({
  project,
  index,
  onDelete,
  deletingId,
}) {
  const isDeleting = deletingId === project._id

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-50 via-gray-50 to-cyan-50">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-300 shadow-sm">
                <Icon.Image />
              </div>

              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                No image
              </p>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70" />

        {/* Number */}
        <span className="absolute left-4 top-4 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1.5 text-[9px] font-bold tracking-wider text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Status */}
        <span
          className={`absolute right-4 top-4 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md ${
            project.published
              ? "border-emerald-300/30 bg-emerald-500/90"
              : "border-white/20 bg-black/50"
          }`}
        >
          {project.published ? "Published" : "Draft"}
        </span>

        {/* Featured */}
        {project.featured && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-500/90 px-3 py-1.5 text-[9px] font-bold text-white backdrop-blur-md">
            <Icon.Star />
            Featured
          </span>
        )}

        {/* External links */}
        <div className="absolute bottom-4 right-4 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-gray-800 shadow-lg transition hover:scale-105"
            >
              <Icon.Github />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open live project"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-gray-800 shadow-lg transition hover:scale-105"
            >
              <Icon.External />
            </a>
          )}

        </div>
      </div>


      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-gray-950">
            {project.title}
          </h3>
        </div>


        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-500">
          {project.description}
        </p>


        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold text-gray-600"
              >
                {technology}
              </span>
            ))}

            {project.technologies.length > 4 && (
              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}


        {/* Divider */}
        <div className="my-5 h-px bg-gray-100" />


        {/* Actions */}
        <div className="flex gap-2">

          <Link
            to={`/admin/projects/${project._id}/edit`}
            className="group/edit flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <span className="transition-transform group-hover/edit:-rotate-6">
              <Icon.Edit />
            </span>
            Edit
          </Link>


          <button
            type="button"
            onClick={() => onDelete(project)}
            disabled={isDeleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                Deleting
              </>
            ) : (
              <>
                <Icon.Trash />
                Delete
              </>
            )}
          </button>

        </div>


        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-3 flex items-center gap-4">

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 transition hover:text-gray-900"
              >
                <Icon.Github />
                GitHub
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 transition hover:text-purple-600"
              >
                <Icon.External />
                Live Demo
              </a>
            )}

          </div>
        )}

      </div>
    </article>
  )
}


// ============================================================
// MAIN COMPONENT
// ============================================================

function ProjectsList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [deletingId, setDeletingId] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")


  // ============================================================
  // FETCH
  // ============================================================

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError("")

      const data = await getProjects()

      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(
        err?.message ||
        "Unable to load projects."
      )
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchProjects()
  }, [])


  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = async () => {
    if (!deletingProject) return

    try {
      setDeletingId(deletingProject._id)

      await deleteProject(
        deletingProject._id
      )

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !==
            deletingProject._id
        )
      )

      setDeletingProject(null)
    } catch (err) {
      setError(
        err?.message ||
        "Unable to delete project."
      )
    } finally {
      setDeletingId(null)
    }
  }


  // ============================================================
  // COUNTS
  // ============================================================

  const publishedCount =
    projects.filter(
      (project) => project.published
    ).length

  const draftCount =
    projects.length -
    publishedCount

  const featuredCount =
    projects.filter(
      (project) => project.featured
    ).length


  // ============================================================
  // FILTER
  // ============================================================

  const filteredProjects = useMemo(() => {
    const query =
      search.trim().toLowerCase()

    return projects.filter((project) => {

      const matchesSearch =
        !query ||
        project.title
          ?.toLowerCase()
          .includes(query) ||
        project.description
          ?.toLowerCase()
          .includes(query) ||
        project.technologies?.some(
          (technology) =>
            technology
              .toLowerCase()
              .includes(query)
        )

      if (!matchesSearch) {
        return false
      }

      if (filter === "published") {
        return project.published
      }

      if (filter === "draft") {
        return !project.published
      }

      if (filter === "featured") {
        return project.featured
      }

      return true
    })
  }, [projects, search, filter])


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return <LoadingSkeleton />
  }


  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div className="relative min-h-full">

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-purple-500/[0.045] blur-[120px]" />

        <div className="absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.045] blur-[120px]" />

      </div>


      <div className="relative">


        {/* ==================================================
            HEADER
            ================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-purple-100/70 blur-3xl" />

          <div className="pointer-events-none absolute bottom-0 right-32 h-32 w-32 rounded-full bg-cyan-100/60 blur-3xl" />


          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600">
                  Portfolio CMS
                </p>

              </div>


              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                Projects
              </h1>


              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Create, organize and manage the projects
                displayed across your portfolio.
              </p>

            </div>


            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={fetchProjects}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:text-gray-950 hover:shadow-md"
              >
                <span className="transition-transform duration-500 group-hover:rotate-180">
                  <Icon.Refresh />
                </span>

                Refresh
              </button>


              <Link
                to="/admin/projects/create"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Icon.Plus />
                Add Project
              </Link>

            </div>

          </div>

        </section>


        {/* ==================================================
            ERROR
            ================================================== */}

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5">

            <span className="mt-0.5 text-red-500">
              <Icon.Alert />
            </span>

            <p className="flex-1 text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setError("")}
              className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
            >
              <Icon.Close />
            </button>

          </div>
        )}


        {/* ==================================================
            STATS
            ================================================== */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            label="Total projects"
            value={projects.length}
            description="All portfolio projects"
            icon={<Icon.Grid />}
            iconClass="bg-purple-50 text-purple-600"
          />

          <StatCard
            label="Published"
            value={publishedCount}
            description="Visible to visitors"
            icon={<Icon.Check />}
            iconClass="bg-emerald-50 text-emerald-600"
            valueClass="text-emerald-600"
          />

          <StatCard
            label="Drafts"
            value={draftCount}
            description="Hidden from portfolio"
            icon={<Icon.File />}
            iconClass="bg-gray-100 text-gray-500"
            valueClass="text-gray-700"
          />

          <StatCard
            label="Featured"
            value={featuredCount}
            description="Highlighted projects"
            icon={<Icon.Star />}
            iconClass="bg-amber-50 text-amber-500"
            valueClass="text-amber-500"
          />

        </section>


        {/* ==================================================
            SEARCH + FILTER
            ================================================== */}

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon.Search />
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by project, description or technology..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-500/[0.06]"
              />

            </div>


            {/* Filters */}

            <div className="flex overflow-x-auto rounded-xl bg-gray-100 p-1">

              {[
                ["all", "All"],
                ["published", "Published"],
                ["draft", "Drafts"],
                ["featured", "Featured"],
              ].map(([value, label]) => (

                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFilter(value)
                  }
                  className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-[11px] font-semibold transition-all ${
                    filter === value
                      ? "bg-white text-gray-950 shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {label}
                </button>

              ))}

            </div>

          </div>

        </section>


        {/* ==================================================
            PROJECTS
            ================================================== */}

        <section className="mt-8">

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h2 className="text-xl font-bold tracking-tight text-gray-950">
                {filter === "all"
                  ? "All Projects"
                  : filter === "published"
                    ? "Published Projects"
                    : filter === "draft"
                      ? "Draft Projects"
                      : "Featured Projects"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredProjects.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {projects.length}
                </span>{" "}
                projects
              </p>

            </div>


            {(search || filter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  setFilter("all")
                }}
                className="w-fit text-xs font-semibold text-purple-600 hover:text-purple-700"
              >
                Clear filters
              </button>
            )}

          </div>


          {/* No projects at all */}

          {projects.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-500">
                <Icon.Grid />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-950">
                No projects yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Your portfolio is ready for its first project.
                Create one to start building your project showcase.
              </p>

              <Link
                to="/admin/projects/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-xs font-semibold text-white shadow-lg transition hover:bg-purple-600"
              >
                <Icon.Plus />
                Create First Project
              </Link>

            </div>

          ) : filteredProjects.length === 0 ? (

            /* No filter results */

            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <Icon.Search />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-950">
                No matching projects
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                No projects match your current search or filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  setFilter("all")
                }}
                className="mt-5 rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-600"
              >
                Reset filters
              </button>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredProjects.map(
                (project, index) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                    onDelete={setDeletingProject}
                    deletingId={deletingId}
                  />
                )
              )}

            </div>

          )}

        </section>

      </div>


      {/* ==================================================
          DELETE MODAL
          ================================================== */}

      {deletingProject && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !deletingId
            ) {
              setDeletingProject(null)
            }
          }}
        >

          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">

            {/* Accent */}
            <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-600" />


            <div className="p-6 sm:p-7">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <Icon.Trash />
              </div>


              <h2 className="mt-5 text-xl font-bold tracking-tight text-gray-950">
                Delete project?
              </h2>


              <p className="mt-2 text-sm leading-6 text-gray-500">
                You are about to permanently delete{" "}
                <span className="font-semibold text-gray-800">
                  "{deletingProject.title}"
                </span>
                .
              </p>


              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">

                <p className="text-xs font-medium leading-5 text-red-600">
                  This action cannot be undone. The project
                  will be removed from your portfolio.
                </p>

              </div>


              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  disabled={Boolean(deletingId)}
                  onClick={() =>
                    setDeletingProject(null)
                  }
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="button"
                  disabled={Boolean(deletingId)}
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/10 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {deletingId ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Icon.Trash />
                      Delete project
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}


export default ProjectsList