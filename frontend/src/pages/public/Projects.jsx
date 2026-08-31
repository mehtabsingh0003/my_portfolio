import { useEffect, useState } from "react"
import { getProjects } from "../../services/projectService"

function ExternalIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2z" />
      <path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7z" />
      <path d="m5 14-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.69 1.26 3.34.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.04.78 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        setError(error?.message || "Unable to load projects.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07070b] px-5 py-20 text-white sm:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">

          <div className="mb-14 animate-pulse">
            <div className="h-3 w-24 rounded-full bg-white/10" />

            <div className="mt-6 h-14 w-72 max-w-full rounded-xl bg-white/10 md:h-20 md:w-[500px]" />

            <div className="mt-5 h-5 w-full max-w-2xl rounded bg-white/5" />
            <div className="mt-2 h-5 w-2/3 max-w-xl rounded bg-white/5" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035]"
              >
                <div className="aspect-[16/10] animate-pulse bg-white/[0.06]" />

                <div className="space-y-4 p-5 md:p-6">
                  <div className="h-7 w-2/3 animate-pulse rounded bg-white/[0.07]" />

                  <div className="space-y-2">
                    <div className="h-4 animate-pulse rounded bg-white/[0.05]" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-white/[0.05]" />
                  </div>

                  <div className="flex gap-2">
                    <div className="h-8 w-20 animate-pulse rounded-lg bg-white/[0.06]" />
                    <div className="h-8 w-24 animate-pulse rounded-lg bg-white/[0.06]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    )
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error) {
    return (
      <main className="min-h-screen bg-[#07070b] px-5 py-24 text-white sm:px-8">

        <div className="mx-auto max-w-2xl">

          <div className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] p-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <CodeIcon />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-red-400">
              Projects
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Unable to load projects
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400">
              {error}
            </p>

          </div>

        </div>

      </main>
    )
  }

  /* =========================================
     EMPTY
  ========================================= */

  if (projects.length === 0) {
    return (
      <main className="min-h-screen bg-[#07070b] px-5 py-24 text-white sm:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-gray-500">
            <CodeIcon />
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            My Work
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            No Projects Yet
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500">
            No projects are available at the moment.
          </p>

        </div>

      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07070b] text-white">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="projects-purple absolute -left-48 -top-40 h-[30rem] w-[30rem] rounded-full bg-purple-600/10 blur-[110px]" />

        <div className="projects-cyan absolute -right-48 top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="projects-pink absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/[0.05] blur-[100px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.045),transparent_42%)]" />

      </div>

      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative mx-auto max-w-6xl px-5 pb-14 pt-20 sm:px-8 md:pb-16 md:pt-28">

        <div className="projects-hero">

          {/* Label */}

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">

            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300">
              My Work
            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">

            Featured{" "}

            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
            A collection of projects I&apos;ve built using modern
            technologies, focusing on clean design, useful functionality
            and real-world development.
          </p>

          {/* Project count */}

          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 backdrop-blur-xl">

            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />

            </span>

            <span className="text-sm font-medium text-gray-400">
              {projects.length}{" "}
              {projects.length === 1 ? "Project" : "Projects"}
            </span>

          </div>

        </div>

      </section>

      {/* =========================================
          PROJECT GRID
      ========================================= */}

      <section className="relative px-5 pb-24 sm:px-8 md:pb-32">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">

            {projects.map((project, index) => (

              <article
                key={project._id}
                className="project-card group relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl"
              >

                {/* =================================
                    IMAGE
                ================================= */}

                {project.image ? (

                  <div className="relative aspect-[16/10] overflow-hidden">

                    <img
                      src={project.image}
                      alt={project.title}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="project-image h-full w-full object-cover"
                    />

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/20 to-transparent opacity-90" />

                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                    {/* Top badges */}

                    <div className="absolute left-4 top-4 flex items-center gap-2">

                      <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-200 backdrop-blur-xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {project.featured && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/20 bg-purple-500/20 px-3 py-1.5 text-[10px] font-bold text-purple-200 backdrop-blur-xl">
                          <SparkleIcon />
                          Featured
                        </span>
                      )}

                    </div>

                    {/* Live Preview */}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live`}
                        className="live-preview absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:text-black"
                      >
                        <ExternalIcon size={17} />
                      </a>
                    )}

                    {/* Image Title */}

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">

                      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2 className="text-xl font-black tracking-tight text-white md:text-2xl">
                        {project.title}
                      </h2>

                    </div>

                  </div>

                ) : (

                  /* =================================
                     NO IMAGE
                  ================================= */

                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950/40 via-[#09090d] to-cyan-950/30">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_55%)]" />

                    <div className="relative text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-gray-400">
                        <CodeIcon />
                      </div>

                      <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
                        Project {String(index + 1).padStart(2, "0")}
                      </span>

                      <h2 className="mt-2 px-6 text-xl font-black text-white">
                        {project.title}
                      </h2>

                    </div>

                    {project.featured && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-purple-400/20 bg-purple-500/20 px-3 py-1.5 text-[10px] font-bold text-purple-200">
                        <SparkleIcon />
                        Featured
                      </span>
                    )}

                  </div>

                )}

                {/* =================================
                    CONTENT
                ================================= */}

                <div className="p-5 md:p-6">

                  {/* Description */}

                  <p className="text-sm leading-6.5 text-gray-400">
                    {project.description}
                  </p>

                  {/* Technologies */}

                  {project.technologies?.length > 0 && (
                    <div className="mt-6">

                      <div className="mb-3 flex items-center gap-2">

                        <span className="text-gray-500">
                          <CodeIcon />
                        </span>

                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
                          Technologies
                        </p>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {project.technologies.map((technology) => (

                          <span
                            key={technology}
                            className="technology-pill rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium text-gray-300"
                          >
                            {technology}
                          </span>

                        ))}

                      </div>

                    </div>
                  )}

                  {/* Divider */}

                  <div className="my-6 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                  {/* =================================
                      ACTIONS
                  ================================= */}

                  <div className="flex flex-wrap gap-2.5">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-button inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-gray-200"
                      >

                        <GithubIcon />

                        GitHub

                        <ExternalIcon size={13} />

                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-button project-live inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/10"
                      >
                        Live Demo

                        <ArrowIcon />

                      </a>
                    )}

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* =========================================
          CSS
      ========================================= */}

      <style>{`

        /* HERO */

        .projects-hero {
          animation: projectsHeroIn 0.75s ease-out both;
        }

        /* CARDS */

        .project-card {
          animation: projectCardIn 0.65s ease-out both;

          transition:
            transform 300ms ease,
            border-color 300ms ease,
            background-color 300ms ease,
            box-shadow 300ms ease;
        }

        .project-card:nth-child(1) {
          animation-delay: 0.05s;
        }

        .project-card:nth-child(2) {
          animation-delay: 0.12s;
        }

        .project-card:nth-child(3) {
          animation-delay: 0.19s;
        }

        .project-card:nth-child(4) {
          animation-delay: 0.26s;
        }

        .project-card:nth-child(5) {
          animation-delay: 0.33s;
        }

        .project-card:nth-child(6) {
          animation-delay: 0.40s;
        }

        .project-card:hover {
          transform: translateY(-7px);

          border-color: rgba(103, 232, 249, 0.2);

          background-color: rgba(255, 255, 255, 0.05);

          box-shadow:
            0 25px 65px rgba(0, 0, 0, 0.28),
            0 0 35px rgba(103, 232, 249, 0.035);
        }

        /* IMAGE */

        .project-image {
          transition:
            transform 700ms cubic-bezier(0.2, 0.65, 0.3, 1),
            filter 500ms ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.06);

          filter: saturate(1.08);
        }

        /* LIVE BUTTON */

        .live-preview {
          transform: scale(0.85);
        }

        .project-card:hover .live-preview {
          transform: scale(1);
        }

        /* TECHNOLOGIES */

        .technology-pill {
          transition:
            transform 200ms ease,
            border-color 200ms ease,
            background-color 200ms ease,
            color 200ms ease;
        }

        .technology-pill:hover {
          transform: translateY(-2px);

          border-color: rgba(168, 85, 247, 0.35);

          background-color: rgba(168, 85, 247, 0.08);

          color: rgb(216, 180, 254);
        }

        /* BUTTONS */

        .project-button {
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            color 220ms ease,
            box-shadow 220ms ease;
        }

        .project-button:hover {
          transform: translateY(-3px) scale(1.025);
        }

        .project-button:active {
          transform: translateY(0) scale(0.97);
        }

        .project-live:hover {
          box-shadow:
            0 15px 35px rgba(168, 85, 247, 0.18);

          opacity: 0.92;
        }

        /* BACKGROUND */

        .projects-purple {
          animation: projectsPurpleFloat 12s ease-in-out infinite;
        }

        .projects-cyan {
          animation: projectsCyanFloat 14s ease-in-out infinite;
        }

        .projects-pink {
          animation: projectsPinkFloat 10s ease-in-out infinite;
        }

        /* ANIMATIONS */

        @keyframes projectsHeroIn {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @keyframes projectCardIn {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @keyframes projectsPurpleFloat {

          0%,
          100% {
            transform: translate(0, 0);
          }

          33% {
            transform: translate(30px, -25px);
          }

          66% {
            transform: translate(-15px, 20px);
          }

        }

        @keyframes projectsCyanFloat {

          0%,
          100% {
            transform: translate(0, 0);
          }

          33% {
            transform: translate(-30px, 25px);
          }

          66% {
            transform: translate(15px, -20px);
          }

        }

        @keyframes projectsPinkFloat {

          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(25px, -30px);
          }

        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {

          .projects-hero,
          .project-card,
          .projects-purple,
          .projects-cyan,
          .projects-pink {
            animation: none;
          }

          .project-card,
          .project-image,
          .project-button,
          .technology-pill {
            transition: none;
          }

        }

        /* MOBILE */

        @media (max-width: 640px) {

          .project-card:hover {
            transform: translateY(-4px);
          }

          .live-preview {
            opacity: 1;
            transform: scale(1);
          }

        }

      `}</style>

    </main>
  )
}

export default Projects