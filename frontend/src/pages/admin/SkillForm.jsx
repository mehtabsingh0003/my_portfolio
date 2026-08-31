import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getSkills,
  createSkill,
  updateSkill,
} from "../../services/skillService"

const initialForm = {
  name: "",
  category: "",
  icon: "",
  order: 0,
  published: true,
}

function SkillForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editing = Boolean(id)

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!editing) return

    const loadSkill = async () => {
      try {
        setLoading(true)
        const data = await getSkills()
        const skill = data.find((item) => item._id === id)

        if (!skill) {
          throw new Error("Skill not found")
        }

        setForm({
          name: skill.name || "",
          category: skill.category || "",
          icon: skill.icon || "",
          order: skill.order ?? 0,
          published: skill.published ?? true,
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadSkill()
  }, [editing, id])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSaving(true)
    setError("")

    try {
      const skillData = {
        name: form.name.trim(),
        category: form.category.trim(),
        icon: form.icon.trim(),
        order: Number(form.order) || 0,
        published: form.published,
      }

      if (!skillData.name || !skillData.category) {
        throw new Error("Skill name and category are required")
      }

      if (editing) {
        await updateSkill(id, skillData)
      } else {
        await createSkill(skillData)
      }

      navigate("/admin/skills")
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl animate-pulse rounded-3xl border border-slate-200 bg-white p-8">
          <div className="h-10 w-48 rounded bg-slate-200" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-14 rounded-xl bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-500">
              Skills
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {editing ? "Edit Skill" : "Add New Skill"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {editing
                ? "Update the selected skill."
                : "Add a technical skill to your portfolio."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/skills")}
            className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50"
          >
            ← Back to Skills
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* Separate form card */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-lg font-bold text-white">
                {editing ? "✎" : "+"}
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
                  Skill Details
                </p>
                <h2 className="mt-0.5 text-xl font-bold text-slate-950">
                  {editing ? "Update information" : "Create information"}
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Skill Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="React"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                placeholder="Frontend Development"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="icon"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Icon
              </label>
              <input
                id="icon"
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="react"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
              />
              <p className="mt-2 text-xs text-slate-400">
                Enter the icon name used by your frontend.
              </p>
            </div>

            <div>
              <label
                htmlFor="order"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Display Order
              </label>
              <input
                id="order"
                name="order"
                type="number"
                min="0"
                value={form.order}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
              <p className="mt-2 text-xs text-slate-400">
                Lower numbers appear first.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Publish Skill
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Show this skill on your public portfolio.
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-cyan-400" />
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 p-6 sm:flex-row sm:justify-end sm:p-8">
            <button
              type="button"
              onClick={() => navigate("/admin/skills")}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editing
                  ? "Update Skill"
                  : "Create Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SkillForm
