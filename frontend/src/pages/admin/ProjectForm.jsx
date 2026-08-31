import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import {
  getProject,
  createProject,
  updateProject,
} from "../../services/projectService"


// ==================================================
// ICONS
// ==================================================

const icons = {
  arrowLeft: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12H5M11 18l-6-6 6-6"
      />
    </svg>
  ),

  image: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.5"
      />
      <circle cx="8.5" cy="9" r="1.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4 18 5-5 3 3 3-3 5 5"
      />
    </svg>
  ),

  github: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="M12 .7A11.3 11.3 0 0 0 8.4 22.1c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.16-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.35-5.22 5.63.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  ),

  link: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 7 20l1.1-1.1"
      />
    </svg>
  ),

  check: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 12 4 4L19 6"
      />
    </svg>
  ),

  alert: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 21 20H3L12 3Z"
      />
      <path
        strokeLinecap="round"
        d="M12 9v4"
      />
      <path
        strokeLinecap="round"
        d="M12 16h.01"
      />
    </svg>
  ),
}


// ==================================================
// EMPTY FORM
// ==================================================

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  published: true,
}


// ==================================================
// INPUT STYLES
// ==================================================

const inputClass = `
  w-full rounded-xl
  border border-gray-200
  bg-white
  px-4 py-3
  text-sm text-gray-900
  outline-none
  transition-all duration-200
  placeholder:text-gray-400
  focus:border-purple-400
  focus:ring-4 focus:ring-purple-500/[0.07]
`

const labelClass = `
  mb-2 block
  text-xs font-semibold
  uppercase tracking-wider
  text-gray-500
`


// ==================================================
// COMPONENT
// ==================================================

function ProjectForm() {
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [existingImage, setExistingImage] = useState("")

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")


  // ==================================================
  // LOAD PROJECT
  // ==================================================

  useEffect(() => {
    if (!isEditMode) return

    const loadProject = async () => {
      try {
        setLoading(true)
        setError("")

        const project = await getProject(id)

        setForm({
          title: project.title || "",
          description: project.description || "",
          technologies: (
            project.technologies || []
          ).join(", "),
          githubUrl: project.githubUrl || "",
          liveUrl: project.liveUrl || "",
          featured: !!project.featured,
          published: !!project.published,
        })

        setExistingImage(
          project.image || ""
        )
      } catch (err) {
        setError(
          err?.message ||
          "Unable to load project."
        )
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id, isEditMode])


  // ==================================================
  // INPUT CHANGE
  // ==================================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }))

    if (error) {
      setError("")
    }
  }


  // ==================================================
  // IMAGE
  // ==================================================

  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0] || null

    setImageFile(file)

    if (file) {
      setError("")
    }
  }


  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError("")
    setSaving(true)

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),

      technologies: form.technologies
        .split(",")
        .map((technology) =>
          technology.trim()
        )
        .filter(Boolean),

      githubUrl: form.githubUrl.trim(),
      liveUrl: form.liveUrl.trim(),

      featured: form.featured,
      published: form.published,

      imageFile,
    }

    try {
      if (isEditMode) {
        await updateProject(
          id,
          payload
        )
      } else {
        await createProject(payload)
      }

      navigate("/admin/projects")
    } catch (err) {
      setError(
        err?.message ||
        "Unable to save project."
      )
    } finally {
      setSaving(false)
    }
  }


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="min-h-[70vh]">

        <div className="animate-pulse">

          <div className="h-4 w-28 rounded bg-gray-200" />

          <div className="mt-5 h-9 w-64 rounded-xl bg-gray-200" />

          <div className="mt-3 h-4 w-96 max-w-full rounded bg-gray-100" />


          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

            <div className="space-y-5">

              <div className="h-12 rounded-xl bg-gray-100" />
              <div className="h-28 rounded-xl bg-gray-100" />
              <div className="h-12 rounded-xl bg-gray-100" />

            </div>

          </div>

        </div>

      </div>
    )
  }


  return (
    <div className="relative min-h-screen">


      {/* ==================================================
          BACKGROUND
          ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-500/[0.045] blur-[110px]" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-500/[0.045] blur-[110px]" />

      </div>


      <div className="relative">


        {/* ==================================================
            HEADER
            ================================================== */}

        <div className="mb-8">


          <Link
            to="/admin/projects"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-gray-950"
          >

            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              {icons.arrowLeft}
            </span>

            Back to projects

          </Link>


          <div className="mt-5">

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-600">
                Project management
              </p>

            </div>


            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
              {isEditMode
                ? "Edit Project"
                : "Create Project"}
            </h1>


            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              {isEditMode
                ? "Update your project details, links, image, and visibility settings."
                : "Add a new project to your portfolio with its technologies, links, and visibility settings."}
            </p>

          </div>

        </div>


        {/* ==================================================
            ERROR
            ================================================== */}

        {error && (

          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5">

            <span className="mt-0.5 shrink-0 text-red-500">
              {icons.alert}
            </span>

            <p className="flex-1 text-sm font-medium leading-5 text-red-600">
              {error}
            </p>

          </div>

        )}


        {/* ==================================================
            FORM
            ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]"
        >


          {/* ==================================================
              MAIN FORM
              ================================================== */}

          <div className="space-y-6">


            {/* ==================================================
                BASIC INFORMATION
                ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

                <h2 className="text-sm font-bold text-gray-900">
                  Basic information
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Add the main information about your project.
                </p>

              </div>


              <div className="space-y-5 p-5 sm:p-6">


                {/* Title */}

                <div>

                  <label
                    htmlFor="title"
                    className={labelClass}
                  >
                    Project title
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Digital Agency Platform"
                    className={inputClass}
                  />

                </div>


                {/* Description */}

                <div>

                  <label
                    htmlFor="description"
                    className={labelClass}
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe what the project does, the problem it solves, and your role."
                    className={`${inputClass} resize-y leading-6`}
                  />

                  <p className="mt-2 text-[11px] text-gray-400">
                    Keep the description clear and focused on the project's value.
                  </p>

                </div>


                {/* Technologies */}

                <div>

                  <label
                    htmlFor="technologies"
                    className={labelClass}
                  >
                    Technologies
                  </label>

                  <input
                    id="technologies"
                    name="technologies"
                    type="text"
                    placeholder="React, Node.js, MongoDB, Tailwind CSS"
                    value={form.technologies}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <p className="mt-2 text-[11px] text-gray-400">
                    Separate each technology with a comma.
                  </p>

                </div>

              </div>

            </section>


            {/* ==================================================
                LINKS
                ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

                <h2 className="text-sm font-bold text-gray-900">
                  Project links
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Add links where visitors can explore the project.
                </p>

              </div>


              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">


                {/* GitHub */}

                <div>

                  <label
                    htmlFor="githubUrl"
                    className={labelClass}
                  >
                    GitHub URL
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      {icons.github}
                    </span>

                    <input
                      id="githubUrl"
                      name="githubUrl"
                      type="url"
                      value={form.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className={`${inputClass} pl-10`}
                    />

                  </div>

                </div>


                {/* Live URL */}

                <div>

                  <label
                    htmlFor="liveUrl"
                    className={labelClass}
                  >
                    Live URL
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      {icons.link}
                    </span>

                    <input
                      id="liveUrl"
                      name="liveUrl"
                      type="url"
                      value={form.liveUrl}
                      onChange={handleChange}
                      placeholder="https://your-project.com"
                      className={`${inputClass} pl-10`}
                    />

                  </div>

                </div>

              </div>

            </section>


            {/* ==================================================
                IMAGE
                ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    {icons.image}
                  </div>

                  <div>

                    <h2 className="text-sm font-bold text-gray-900">
                      Project image
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      Upload a visual for your project.
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-5 sm:p-6">


                {/* Existing / selected image */}

                {(existingImage || imageFile) && (

                  <div className="mb-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

                    {imageFile ? (

                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Selected project"
                        className="h-56 w-full object-cover"
                      />

                    ) : (

                      <img
                        src={existingImage}
                        alt="Current project"
                        className="h-56 w-full object-cover"
                      />

                    )}

                  </div>

                )}


                {/* File input */}

                <label
                  htmlFor="image"
                  className="
                    group flex cursor-pointer flex-col
                    items-center justify-center
                    rounded-2xl border-2 border-dashed
                    border-gray-200 bg-gray-50
                    px-6 py-10 text-center
                    transition-all duration-200
                    hover:border-purple-300
                    hover:bg-purple-50/30
                  "
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm transition group-hover:text-purple-500">
                    {icons.image}
                  </div>


                  <p className="mt-4 text-sm font-semibold text-gray-700">
                    {imageFile
                      ? imageFile.name
                      : "Choose project image"}
                  </p>


                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG, WEBP or other image formats
                  </p>


                  <span className="mt-4 rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-semibold text-white transition group-hover:bg-purple-600">
                    Browse files
                  </span>


                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />

                </label>


                {isEditMode && (
                  <p className="mt-3 text-[11px] text-gray-400">
                    Leave the upload empty to keep the current image.
                  </p>
                )}

              </div>

            </section>

          </div>


          {/* ==================================================
              SIDEBAR SETTINGS
              ================================================== */}

          <div className="space-y-6">


            {/* Visibility */}

            <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">

              <h2 className="text-sm font-bold text-gray-900">
                Publishing
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Control how this project appears on your portfolio.
              </p>


              <div className="mt-5 space-y-3">


                {/* Published */}

                <label
                  htmlFor="published"
                  className={`
                    flex cursor-pointer items-center gap-3
                    rounded-xl border p-3.5
                    transition-all duration-200
                    ${
                      form.published
                        ? "border-emerald-200 bg-emerald-50/60"
                        : "border-gray-200 bg-gray-50"
                    }
                  `}
                >

                  <input
                    id="published"
                    name="published"
                    type="checkbox"
                    checked={form.published}
                    onChange={handleChange}
                    className="sr-only"
                  />


                  <span
                    className={`
                      flex h-5 w-5 shrink-0 items-center justify-center
                      rounded-md border
                      ${
                        form.published
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-gray-300 bg-white"
                      }
                    `}
                  >
                    {form.published && icons.check}
                  </span>


                  <span className="min-w-0">

                    <span className="block text-xs font-semibold text-gray-800">
                      Published
                    </span>

                    <span className="mt-0.5 block text-[10px] text-gray-400">
                      Visible on your public portfolio
                    </span>

                  </span>

                </label>


                {/* Featured */}

                <label
                  htmlFor="featured"
                  className={`
                    flex cursor-pointer items-center gap-3
                    rounded-xl border p-3.5
                    transition-all duration-200
                    ${
                      form.featured
                        ? "border-purple-200 bg-purple-50/60"
                        : "border-gray-200 bg-gray-50"
                    }
                  `}
                >

                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={handleChange}
                    className="sr-only"
                  />


                  <span
                    className={`
                      flex h-5 w-5 shrink-0 items-center justify-center
                      rounded-md border
                      ${
                        form.featured
                          ? "border-purple-500 bg-purple-500 text-white"
                          : "border-gray-300 bg-white"
                      }
                    `}
                  >
                    {form.featured && icons.check}
                  </span>


                  <span className="min-w-0">

                    <span className="block text-xs font-semibold text-gray-800">
                      Featured
                    </span>

                    <span className="mt-0.5 block text-[10px] text-gray-400">
                      Highlight this project
                    </span>

                  </span>

                </label>

              </div>

            </section>


            {/* Preview */}

            <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-4">

                <h2 className="text-sm font-bold text-gray-900">
                  Project status
                </h2>

              </div>


              <div className="p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-gray-500">
                    Visibility
                  </span>

                  <span
                    className={`
                      rounded-full px-2.5 py-1
                      text-[9px] font-bold uppercase tracking-wider
                      ${
                        form.published
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {form.published
                      ? "Published"
                      : "Draft"}
                  </span>

                </div>


                <div className="mt-4 flex items-center justify-between">

                  <span className="text-xs text-gray-500">
                    Featured
                  </span>

                  <span
                    className={`
                      rounded-full px-2.5 py-1
                      text-[9px] font-bold uppercase tracking-wider
                      ${
                        form.featured
                          ? "bg-purple-50 text-purple-600"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {form.featured
                      ? "Featured"
                      : "Standard"}
                  </span>

                </div>

              </div>

            </section>


            {/* ==================================================
                ACTIONS
                ================================================== */}

            <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm">

              <button
                type="submit"
                disabled={saving}
                className="
                  group flex w-full
                  items-center justify-center gap-2
                  rounded-xl
                  bg-gray-950
                  px-4 py-3
                  text-sm font-semibold text-white
                  shadow-lg shadow-gray-950/10
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-purple-600
                  hover:shadow-purple-600/20
                  disabled:cursor-not-allowed
                  disabled:translate-y-0
                  disabled:opacity-60
                "
              >

                {saving ? (

                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    {isEditMode
                      ? "Saving changes..."
                      : "Creating project..."}
                  </>

                ) : (

                  <>
                    {isEditMode
                      ? "Save changes"
                      : "Create project"}

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </>

                )}

              </button>


              <Link
                to="/admin/projects"
                className="
                  mt-2 flex w-full
                  items-center justify-center
                  rounded-xl border border-gray-200
                  bg-white px-4 py-3
                  text-sm font-semibold text-gray-600
                  transition-all duration-200
                  hover:bg-gray-50
                  hover:text-gray-950
                "
              >
                Cancel
              </Link>

            </div>

          </div>

        </form>

      </div>

    </div>
  )
}

export default ProjectForm