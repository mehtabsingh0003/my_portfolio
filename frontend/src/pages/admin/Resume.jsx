import { useEffect, useState } from "react"
import {
  getResumes,
  uploadResume,
  updateResume,
  deleteResume,
} from "../../services/resumeService"
import { API_URL } from "../../services/apiClient"

function Resume() {
  const [resumes, setResumes] = useState([])

  // Upload state
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)

  // Loading state
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Messages
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  // Edit state
  const [editingResume, setEditingResume] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editFile, setEditFile] = useState(null)

  // Delete state
  const [deletingResume, setDeletingResume] = useState(null)

  const loadResumes = async () => {
    try {
      const data = await getResumes()
      setResumes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    queueMicrotask(loadResumes)
  }, [])

  // =========================
  // FILE VALIDATION
  // =========================

  const validatePdf = (selectedFile) => {
    if (!selectedFile) {
      return "Please select a PDF file"
    }

    if (selectedFile.type !== "application/pdf") {
      return "Only PDF files are allowed"
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      return "PDF file must be smaller than 10 MB"
    }

    return ""
  }

  // =========================
  // UPLOAD
  // =========================

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0] || null

    setMessage("")
    setError("")

    if (!selectedFile) {
      setFile(null)
      return
    }

    const validationError =
      validatePdf(selectedFile)

    if (validationError) {
      setFile(null)
      setError(validationError)
      event.target.value = ""
      return
    }

    setFile(selectedFile)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage("")
    setError("")

    if (!file) {
      setError("Please select a PDF file")
      return
    }

    const validationError =
      validatePdf(file)

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setUploading(true)

      const formData = new FormData()

      formData.append(
        "title",
        title.trim() || "My Resume"
      )

      formData.append("resume", file)

      await uploadResume(formData)

      setTitle("")
      setFile(null)

      const input =
        document.getElementById("resume")

      if (input) {
        input.value = ""
      }

      setMessage(
        "Resume uploaded successfully"
      )

      await loadResumes()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  // =========================
  // VIEW / DOWNLOAD URL
  // =========================

  const getViewUrl = (resumeId) => {
    if (!resumeId) {
      return ""
    }

    return `${API_URL}/resume/${resumeId}/view`
  }

  const getDownloadUrl = (resumeId) => {
    if (!resumeId) {
      return ""
    }

    return `${API_URL}/resume/${resumeId}/download`
  }

  // =========================
  // EDIT
  // =========================

  const openEditModal = (resume) => {
    setEditingResume(resume)
    setEditTitle(resume.title || "")
    setEditFile(null)

    setMessage("")
    setError("")
  }

  const closeEditModal = () => {
    if (saving) {
      return
    }

    setEditingResume(null)
    setEditTitle("")
    setEditFile(null)
  }

  const handleEditFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0] || null

    setError("")

    if (!selectedFile) {
      setEditFile(null)
      return
    }

    const validationError =
      validatePdf(selectedFile)

    if (validationError) {
      setEditFile(null)
      setError(validationError)
      event.target.value = ""
      return
    }

    setEditFile(selectedFile)
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    setMessage("")
    setError("")

    if (!editingResume) {
      return
    }

    if (!editTitle.trim()) {
      setError("Resume title is required")
      return
    }

    if (editFile) {
      const validationError =
        validatePdf(editFile)

      if (validationError) {
        setError(validationError)
        return
      }
    }

    try {
      setSaving(true)

      const formData = new FormData()

      formData.append(
        "title",
        editTitle.trim()
      )

      if (editFile) {
        formData.append(
          "resume",
          editFile
        )
      }

      await updateResume(
        editingResume._id,
        formData
      )

      setEditingResume(null)
      setEditTitle("")
      setEditFile(null)

      setMessage(
        "Resume updated successfully"
      )

      await loadResumes()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // =========================
  // DELETE
  // =========================

  const openDeleteModal = (resume) => {
    setDeletingResume(resume)
    setMessage("")
    setError("")
  }

  const closeDeleteModal = () => {
    if (deleting) {
      return
    }

    setDeletingResume(null)
  }

  const handleDelete = async () => {
    if (!deletingResume) {
      return
    }

    try {
      setDeleting(true)

      await deleteResume(
        deletingResume._id
      )

      setDeletingResume(null)

      setMessage(
        "Resume deleted successfully"
      )

      await loadResumes()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  // =========================
  // DATA
  // =========================

  const currentResume =
    resumes.find(
      (resume) => resume.isCurrent
    ) || null

  const previousResumes =
    resumes.filter(
      (resume) => !resume.isCurrent
    )

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "PDF"
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Background accents */}
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
                  Content Management
                </p>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Resume Manager
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Upload, update and organize the resume versions displayed on your portfolio.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total versions
                </p>
                <p className="mt-0.5 text-lg font-bold text-slate-900">
                  {resumes.length}
                </p>
              </div>

              {currentResume && (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-700">
                    Live
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Global messages */}
        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              ✓
            </div>
            <p className="text-sm font-semibold text-emerald-700">{message}</p>
          </div>
        )}

        {error && !editingResume && !deletingResume && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
              !
            </div>
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}

        {/* Main cards */}
        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          {/* Upload */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-xl text-violet-600">
                ↑
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-violet-500">
                  New version
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">
                  Upload Resume
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add a new PDF to your resume library.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Resume title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Mehtab Singh Rathore - Resume"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="resume"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Resume PDF
                </label>

                <label
                  htmlFor="resume"
                  className="group block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-7 text-center transition hover:border-violet-300 hover:bg-violet-50/50"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-xs font-black text-red-500 shadow-sm ring-1 ring-red-100 transition group-hover:scale-105">
                    PDF
                  </div>

                  <p className="mt-4 truncate text-sm font-bold text-slate-700">
                    {file ? file.name : "Choose your resume PDF"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Click to browse · PDF only · Maximum 10 MB
                  </p>

                  <input
                    id="resume"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {file && (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[9px] font-black text-red-500">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {file.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFile(null)
                      const input = document.getElementById("resume")
                      if (input) input.value = ""
                    }}
                    className="shrink-0 rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                  >
                    Remove
                  </button>
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading || !file}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-white" />
                    Uploading...
                  </>
                ) : (
                  <>
                    Upload Resume
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Current resume */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">
                  Published version
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">
                  Current Resume
                </h2>
              </div>

              {currentResume && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Current
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-slate-50">
                <div className="text-center">
                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-violet-500" />
                  <p className="mt-4 text-sm font-medium text-slate-400">
                    Loading resume...
                  </p>
                </div>
              </div>
            ) : currentResume ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="bg-slate-950 p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-xs font-black text-red-400 ring-1 ring-red-500/20">
                      PDF
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Active document
                      </p>
                      <h3 className="truncate text-lg font-bold text-white">
                        {currentResume.title}
                      </h3>
                      <p className="mt-2 text-sm leading-5 text-slate-400">
                        This version is currently displayed on your public portfolio.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
                      PDF Document
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                      ● Live on portfolio
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-white p-4 sm:grid-cols-4">
                  <a
                    href={getViewUrl(currentResume._id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                  >
                    View
                  </a>

                  <a
                    href={getDownloadUrl(currentResume._id)}
                    className="rounded-xl bg-slate-950 px-3 py-3 text-center text-xs font-bold text-white transition hover:bg-slate-800"
                  >
                    Download
                  </a>

                  <button
                    type="button"
                    onClick={() => openEditModal(currentResume)}
                    className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-3 text-center text-xs font-bold text-violet-600 transition hover:bg-violet-100"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => openDeleteModal(currentResume)}
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-center text-xs font-bold text-red-600 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-xs font-black text-violet-500">
                  PDF
                </div>
                <h3 className="mt-5 font-bold text-slate-800">
                  No resume uploaded
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-5 text-slate-400">
                  Upload your first resume using the form to make it available on your portfolio.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Archive */}
        {!loading && previousResumes.length > 0 && (
          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Archive
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                  Previous Resumes
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Older versions saved for reference.
                </p>
              </div>

              <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 sm:block">
                {previousResumes.length} archived
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {previousResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[9px] font-black text-red-500">
                      PDF
                    </div>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Archived
                    </span>
                  </div>

                  <h3 className="mt-5 min-h-[48px] line-clamp-2 text-base font-bold leading-6 text-slate-900">
                    {resume.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Previous version
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <a
                      href={getViewUrl(resume._id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-slate-200 px-3 py-2.5 text-center text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      View
                    </a>

                    <a
                      href={getDownloadUrl(resume._id)}
                      className="rounded-xl bg-slate-950 px-3 py-2.5 text-center text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      Download
                    </a>

                    <button
                      type="button"
                      onClick={() => openEditModal(resume)}
                      className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-center text-xs font-bold text-violet-600 transition hover:bg-violet-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeleteModal(resume)}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-center text-xs font-bold text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Edit modal */}
      {editingResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-500">
                    Manage Resume
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-950">
                    Edit Resume
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Update the title or replace the PDF file.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={saving}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5 p-6 sm:p-7">
              <div>
                <label
                  htmlFor="edit-title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Resume title
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current file
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[9px] font-black text-red-500">
                    PDF
                  </div>
                  <p className="truncate text-sm font-semibold text-slate-700">
                    {editingResume.title}.pdf
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="edit-resume"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Replace PDF
                  <span className="ml-2 font-normal text-slate-400">Optional</span>
                </label>

                <label
                  htmlFor="edit-resume"
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-violet-300 hover:bg-violet-50/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[9px] font-black text-red-500">
                    PDF
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-700">
                      {editFile ? editFile.name : "Choose replacement PDF"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      PDF only · Maximum 10 MB
                    </p>
                  </div>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-500 shadow-sm">
                    Browse
                  </span>

                  <input
                    id="edit-resume"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleEditFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={saving}
                  className="flex-1 rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deletingResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-bold text-red-500">
              !
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-950">
              Delete Resume?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-800">
                "{deletingResume.title}"
              </span>
              ?
            </p>

            <p className="mt-2 text-sm font-medium text-red-500">
              This action cannot be undone.
            </p>

            {deletingResume.isCurrent && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs leading-5 text-amber-700">
                  This is your current resume. If you delete it, the newest remaining
                  resume will automatically become current.
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
            )}

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="flex-1 rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Resume"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Resume
