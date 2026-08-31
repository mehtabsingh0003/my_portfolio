import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getProjects } from "../../services/projectService"
import { getCurrentResume } from "../../services/resumeService"
import { API_URL } from "../../services/apiClient"

import {
  FaArrowRight,
  FaDownload,
  FaExternalLinkAlt,
  FaFilePdf,
  FaGithub,
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaDatabase,
  FaCode,
  FaLayerGroup,
  FaRocket,
} from "react-icons/fa"

import {
  SiMongodb,
  SiTypescript,
} from "react-icons/si"

function Home() {
  const [featured, setFeatured] = useState([])
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHome = async () => {
      try {
        const projectsData = await getProjects()

        setFeatured(
          projectsData
            .filter(
              (project) =>
                project.published &&
                project.featured
            )
            .slice(0, 3)
        )

        try {
          const resumeData = await getCurrentResume()
          setResume(resumeData)
        } catch {
          setResume(null)
        }
      } catch {
        // Homepage can still render without projects
      } finally {
        setLoading(false)
      }
    }

    loadHome()
  }, [])

  const getResumeViewUrl = () => {
    if (!resume?._id) {
      return ""
    }

    return `${API_URL}/resume/${resume._id}/view`
  }

  const getResumeDownloadUrl = () => {
    if (!resume?._id) {
      return ""
    }

    return `${API_URL}/resume/${resume._id}/download`
  }

  return (
    <div className="overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-purple-500/10 blur-3xl" />

          <div className="absolute right-0 top-20 h-[25rem] w-[25rem] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-fuchsia-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl">

            {/* Small label */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-purple-500 to-cyan-400" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Full-Stack Developer
              </p>
            </div>

            {/* Main heading */}
            <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Mehtab
              </span>
              .
            </h1>

            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-gray-300 md:text-5xl">
              I build clean and reliable
              <span className="text-white">
                {" "}web applications.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
              I design and ship products end to end —
              from modern React interfaces to scalable
              Node.js APIs and everything in between.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
              >
                View Projects

                <FaArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/60 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-gray-500 hover:bg-gray-800"
              >
                Get in Touch
                <FaExternalLinkAlt size={11} />
              </Link>

              {resume && (
                <a
                  href={getResumeViewUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 px-6 py-3.5 text-sm font-semibold text-purple-300 transition duration-300 hover:-translate-y-0.5 hover:bg-purple-500/20"
                >
                  <FaFilePdf size={14} className="text-red-400" />
                  View Resume
                </a>
              )}
            </div>

            {/* Tech highlights */}
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-600">
                Building with
              </span>
              <TechItem icon={FaReact} label="React" />
              <TechItem icon={FaNodeJs} label="Node.js" />
              <TechItem icon={SiMongodb} label="MongoDB" />
              <TechItem icon={FaJsSquare} label="JavaScript" />
              <TechItem icon={SiTypescript} label="TypeScript" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PROJECTS
      ===================================================== */}
      {!loading && featured.length > 0 && (
        <section className="relative border-t border-gray-800 px-6 py-24 md:py-28">

          <div className="mx-auto max-w-7xl">

            {/* Section header */}
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-purple-500" />

                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                    Selected Work
                  </p>
                </div>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Featured{" "}
                  <span className="text-purple-400">
                    Projects
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-gray-400">
                  A selection of projects I&apos;ve designed
                  and developed.
                </p>
              </div>

              <Link
                to="/projects"
                className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-white"
              >
                View all projects

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Project cards */}
            <div className="grid gap-7 md:grid-cols-3">
              {featured.map((project, index) => (
                <article
                  key={project._id}
                  className="group overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/60 transition duration-500 hover:-translate-y-2 hover:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/5"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-gray-800">

                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-950 via-gray-900 to-cyan-950">
                        <span className="text-5xl font-bold text-white/10">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Project number */}
                    <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Featured badge */}
                    <span className="absolute right-4 top-4 rounded-full border border-purple-300/20 bg-purple-500/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      ✦ Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white">
                        {project.title}
                      </h3>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title} GitHub`}
                          className="shrink-0 rounded-lg border border-gray-800 bg-gray-800/40 p-2.5 text-gray-500 transition duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white"
                        >
                          <FaGithub size={13} />
                        </a>
                      )}
                    </div>

                    <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-400">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies
                          .slice(0, 4)
                          .map((technology) => (
                            <span
                              key={technology}
                              className="rounded-lg border border-gray-800 bg-gray-800/70 px-2.5 py-1 text-[11px] font-medium text-gray-400"
                            >
                              {technology}
                            </span>
                          ))}

                        {project.technologies.length > 4 && (
                          <span className="rounded-lg border border-gray-800 bg-gray-800/70 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                            +
                            {project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          RESUME
      ===================================================== */}
      {!loading && resume && (
        <section className="relative border-t border-gray-800 px-6 py-24 md:py-28">

          <div className="mx-auto max-w-7xl">

            <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/70 p-8 md:p-12">

              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

                {/* Resume info */}
                <div className="max-w-2xl">

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                      <FaFilePdf size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                        Latest Resume
                      </p>
                    </div>
                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
                    {resume.title}
                  </h2>

                  <p className="mt-4 max-w-xl leading-7 text-gray-400">
                    Explore my experience, education,
                    technical skills, projects and
                    professional background.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">

                  <a
                    href={getResumeViewUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                  >
                    Open Resume
                    <FaExternalLinkAlt size={11} />
                  </a>

                  <a
                    href={getResumeDownloadUrl()}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    <><FaDownload size={12} /> Download</>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="border-t border-gray-800 px-6 py-24 md:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            Let&apos;s Connect
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Have an idea?
            <br />
            <span className="text-gray-500">
              Let&apos;s build it.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-400">
            Whether you have a project in mind or just
            want to talk technology, feel free to reach out.
          </p>

          <div className="mt-9">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Start a Conversation

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function TechItem({ icon: Icon, label }) {
  return (
    <div className="group flex items-center gap-2 text-gray-500 transition-colors duration-300 hover:text-gray-200">
      <Icon
        size={15}
        className="text-gray-600 transition-colors duration-300 group-hover:text-cyan-400"
      />
      <span className="text-xs font-semibold">{label}</span>
    </div>
  )
}

export default Home