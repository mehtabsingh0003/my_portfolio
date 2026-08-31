import { useEffect, useState } from "react"
import { getResumes } from "../../services/resumeService"
import { API_URL } from "../../services/apiClient"

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
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
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function Resume() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const data = await getResumes()
        setResumes(data)
      } catch (err) {
        setError(err?.message || "Unable to load resume.")
      } finally {
        setLoading(false)
      }
    }

    loadResumes()
  }, [])

  const getViewUrl = (resumeId) => {
    if (!resumeId) return ""
    return `${API_URL}/resume/${resumeId}/view`
  }

  const getDownloadUrl = (resumeId) => {
    if (!resumeId) return ""
    return `${API_URL}/resume/${resumeId}/download`
  }

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070b] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-700 border-t-cyan-400" />
            </div>

            <p className="mt-5 text-sm font-semibold text-gray-300">
              Loading resume...
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Preparing your document
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error) {
    return (
      <div className="min-h-screen bg-[#07070b] px-6 py-24 text-white">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-red-500/20 bg-red-500/[0.04] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <FileIcon />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-red-400">
            Resume
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Resume unavailable
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400">
            {error}
          </p>
        </div>
      </div>
    )
  }

  /* =========================================
     EMPTY STATE
  ========================================= */

  if (resumes.length === 0) {
    return (
      <div className="min-h-screen bg-[#07070b] px-6 py-24 text-white">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.03] p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05] text-gray-400">
            <FileIcon />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            No resume available
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
            No resume has been uploaded yet.
          </p>
        </div>
      </div>
    )
  }

  const currentResume =
    resumes.find((resume) => resume.isCurrent) || resumes[0]

  const otherResumes = resumes.filter(
    (resume) => resume._id !== currentResume._id
  )

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07070b] text-white">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="resume-blob resume-blob-purple absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="resume-blob resume-blob-cyan absolute -right-40 top-[30rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="resume-blob resume-blob-pink absolute left-1/2 top-[70rem] h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/5 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%)]" />
      </div>

      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 md:pb-20 md:pt-28">

        <div className="resume-fade-in">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-300 backdrop-blur-xl">

            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />

            My Resume
          </div>

          {/* Heading */}

          <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-8xl">

            Professional{" "}

            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Resume
            </span>

          </h1>

          {/* Description */}

          <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
            Explore my professional background, technical skills,
            education, projects and experience.
          </p>

          {/* =========================================
              BUTTONS
          ========================================= */}

          <div className="mt-9 flex flex-wrap gap-3">

            <a
              href={getDownloadUrl(currentResume._id)}
              className="resume-button resume-primary inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-500/10"
            >
              <DownloadIcon />

              Download CV
            </a>

            <a
              href={getViewUrl(currentResume._id)}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl"
            >
              <ExternalIcon />

              Open Full PDF
            </a>

          </div>

          {/* =========================================
              STATS
          ========================================= */}

          <div className="mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">

            {/* Current */}

            <div className="resume-card rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckIcon />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Current Resume
                  </p>
                </div>

              </div>

            </div>

            {/* Versions */}

            <div className="resume-card rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-lg font-bold text-purple-400">
                  {resumes.length}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Available
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Version{resumes.length !== 1 ? "s" : ""}
                  </p>
                </div>

              </div>

            </div>

            {/* Format */}

            <div className="resume-card col-span-2 rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:col-span-1">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-xs font-black text-red-400">
                  PDF
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Format
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    PDF Document
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          PDF VIEWER
      ========================================= */}

      <section className="relative px-4 pb-24 sm:px-6">

        <div className="mx-auto max-w-7xl resume-slide-up">

          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40 backdrop-blur-xl">

            {/* =========================================
                TOOLBAR
            ========================================= */}

            <div className="flex flex-col gap-5 border-b border-white/10 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-7">

              {/* File information */}

              <div className="flex min-w-0 items-center gap-4">

                <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 ring-1 ring-red-500/10">

                  <FileIcon />

                  <span className="absolute -bottom-1 -right-1 rounded bg-red-500 px-1.5 py-0.5 text-[7px] font-black text-white">
                    PDF
                  </span>

                </div>

                <div className="min-w-0">

                  <div className="flex items-center gap-2">

                    <h2 className="truncate text-base font-bold text-white">
                      {currentResume.title}
                    </h2>

                    <span className="hidden rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 sm:inline-flex">
                      Current
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Professional resume · PDF document
                  </p>

                </div>

              </div>

              {/* Toolbar buttons */}

              <div className="flex gap-2">

                <a
                  href={getViewUrl(currentResume._id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-button inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-gray-300"
                >
                  <ExternalIcon />

                  Open
                </a>

                <a
                  href={getDownloadUrl(currentResume._id)}
                  className="resume-button inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-gray-950"
                >
                  <DownloadIcon />

                  Download
                </a>

              </div>

            </div>

            {/* =========================================
                PDF
            ========================================= */}

            <div className="bg-gradient-to-b from-white/[0.025] to-black/20 p-2 sm:p-4 md:p-6">

              <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-white shadow-2xl">

                <iframe
                  src={getViewUrl(currentResume._id)}
                  title={currentResume.title}
                  className="h-[700px] w-full border-0 sm:h-[850px] md:h-[1000px] lg:h-[1100px]"
                />

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          OTHER RESUMES
      ========================================= */}

      {otherResumes.length > 0 && (
        <section className="relative border-t border-white/10 px-5 py-20 sm:px-8 md:py-28">

          <div className="mx-auto max-w-7xl">

            {/* Header */}

            <div className="mb-10">

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-gradient-to-r from-purple-400 to-cyan-400" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                  Resume Archive
                </p>

              </div>

              <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">

                Other{" "}

                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Versions
                </span>

              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
                Different versions of my resume tailored
                for different opportunities.
              </p>

            </div>

            {/* Cards */}

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {otherResumes.map((resume, index) => (

                <div
                  key={resume._id}
                  className="resume-version-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl"
                >

                  {/* Glow */}

                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/15" />

                  {/* Icon */}

                  <div className="relative flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                      <FileIcon />
                    </div>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                      PDF
                    </span>

                  </div>

                  {/* Content */}

                  <div className="relative mt-8">

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                      Version {String(index + 2).padStart(2, "0")}
                    </p>

                    <h3 className="mt-2 min-h-[56px] text-lg font-bold leading-7 text-white">
                      {resume.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Resume document
                    </p>

                  </div>

                  {/* Button */}

                  <a
                    href={getViewUrl(resume._id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-button relative mt-7 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-gray-300"
                  >
                    View Resume

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>

                  </a>

                </div>

              ))}

            </div>

          </div>
        </section>
      )}

      {/* =========================================
          LOCAL CSS ANIMATIONS
      ========================================= */}

      <style>{`
        .resume-fade-in {
          animation: resumeFadeIn 0.7s ease-out both;
        }

        .resume-slide-up {
          animation: resumeSlideUp 0.8s ease-out both;
        }

        .resume-blob-purple {
          animation: purpleFloat 12s ease-in-out infinite;
        }

        .resume-blob-cyan {
          animation: cyanFloat 14s ease-in-out infinite;
        }

        .resume-blob-pink {
          animation: pinkFloat 10s ease-in-out infinite;
        }

        .resume-button {
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            color 220ms ease;
        }

        .resume-button:hover {
          transform: translateY(-4px) scale(1.03);
        }

        .resume-button:active {
          transform: translateY(0) scale(0.97);
        }

        .resume-primary:hover {
          box-shadow: 0 18px 45px rgba(168, 85, 247, 0.18);
        }

        .resume-card {
          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background-color 250ms ease,
            box-shadow 250ms ease;
        }

        .resume-card:hover {
          transform: translateY(-5px) scale(1.015);
          border-color: rgba(255, 255, 255, 0.16);
          background-color: rgba(255, 255, 255, 0.055);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
        }

        .resume-version-card {
          transition:
            transform 280ms ease,
            border-color 280ms ease,
            background-color 280ms ease,
            box-shadow 280ms ease;
        }

        .resume-version-card:hover {
          transform: translateY(-7px);
          border-color: rgba(103, 232, 249, 0.2);
          background-color: rgba(255, 255, 255, 0.055);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
        }

        @keyframes resumeFadeIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes resumeSlideUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes purpleFloat {
          0%,
          100% {
            transform: translate(0, 0);
          }

          33% {
            transform: translate(30px, -25px);
          }

          66% {
            transform: translate(-10px, 15px);
          }
        }

        @keyframes cyanFloat {
          0%,
          100% {
            transform: translate(0, 0);
          }

          33% {
            transform: translate(-25px, 20px);
          }

          66% {
            transform: translate(10px, -15px);
          }
        }

        @keyframes pinkFloat {
          0%,
          100% {
            transform: translate(-50%, 0);
          }

          50% {
            transform: translate(-50%, -30px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .resume-fade-in,
          .resume-slide-up,
          .resume-blob-purple,
          .resume-blob-cyan,
          .resume-blob-pink {
            animation: none;
          }

          .resume-button,
          .resume-card,
          .resume-version-card {
            transition: none;
          }
        }
      `}</style>

    </main>
  )
}

export default Resume