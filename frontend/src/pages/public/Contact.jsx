import { useState } from "react"
import { sendMessage } from "../../services/messageService"

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setStatus("sending")
    setError("")

    try {
      await sendMessage(form)

      setStatus("success")
      setForm(initialForm)
    } catch (err) {
      setStatus("error")
      setError(
        err.message ||
          "Something went wrong. Please try again."
      )
    }
  }

  const handleSendAnother = () => {
    setStatus("idle")
    setError("")
  }

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* =========================
          BACKGROUND DECORATION
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/5 blur-3xl" />

      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">

        {/* Header */}

        <div className="mb-14 max-w-3xl">

          <div className="flex items-center gap-3">

            <span className="h-px w-8 bg-gradient-to-r from-purple-400 to-cyan-400" />

            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Get in Touch
            </p>

          </div>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-white md:text-6xl">

            Let&apos;s work{" "}

            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              together
            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Have a project in mind, a question, or
            just want to say hello? Send me a message
            and I&apos;ll get back to you as soon as I can.
          </p>

        </div>

        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =========================
              LEFT INFORMATION
          ========================= */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-7 backdrop-blur-sm md:p-8">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
              Let&apos;s connect
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Tell me about your idea.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Whether you&apos;re looking to build something
              new, improve an existing project, or simply
              have a conversation, I&apos;d love to hear from
              you.
            </p>

            {/* Contact details */}

            <div className="mt-10 space-y-5">

              {/* Email */}

              <div className="flex items-start gap-4 rounded-2xl border border-gray-800 bg-gray-950/40 p-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  @
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-gray-200">
                    Get in touch through the form
                  </p>
                </div>

              </div>

              {/* Response */}

              <div className="flex items-start gap-4 rounded-2xl border border-gray-800 bg-gray-950/40 p-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  ↗
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Response
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-200">
                    I&apos;ll get back to you soon
                  </p>
                </div>

              </div>

              {/* Projects */}

              <div className="flex items-start gap-4 rounded-2xl border border-gray-800 bg-gray-950/40 p-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
                  ✦
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Projects
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-200">
                    Web apps &amp; digital products
                  </p>
                </div>

              </div>

            </div>

            {/* Bottom note */}

            <div className="mt-8 rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-500/10 to-cyan-500/5 p-5">

              <p className="text-sm leading-6 text-gray-400">
                Have enough details? Great. Tell me
                what you&apos;re building, what you need, and
                how I can help.
              </p>

            </div>

          </div>

          {/* =========================
              CONTACT FORM
          ========================= */}

          <div className="rounded-3xl border border-gray-800 bg-gray-900/70 p-7 shadow-2xl shadow-black/10 backdrop-blur-sm md:p-8">

            {status === "success" ? (

              /* =========================
                 SUCCESS
              ========================= */

              <div className="flex min-h-[560px] flex-col items-center justify-center text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 text-3xl text-green-400 ring-1 ring-green-500/20">
                  ✓
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-green-400">
                  Message Sent
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  Thanks for reaching out!
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
                  Your message has been sent successfully.
                  I&apos;ll review it and get back to you as
                  soon as I can.
                </p>

                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="mt-8 rounded-xl border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-semibold text-white transition hover:border-gray-600 hover:bg-gray-700"
                >
                  Send another message
                </button>

              </div>

            ) : (

              /* =========================
                 FORM
              ========================= */

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Form heading */}

                <div className="mb-8">

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
                    Contact Form
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-white">
                    Start a conversation
                  </h2>

                </div>

                {/* Name + Email */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Name */}

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-gray-800 bg-gray-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-gray-950 focus:ring-4 focus:ring-purple-500/10"
                    />

                  </div>

                  {/* Email */}

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-800 bg-gray-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-500/60 focus:bg-gray-950 focus:ring-4 focus:ring-cyan-500/10"
                    />

                  </div>

                </div>

                {/* Subject */}

                <div>

                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Subject{" "}
                    <span className="font-normal text-gray-600">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    className="w-full rounded-xl border border-gray-800 bg-gray-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-gray-950 focus:ring-4 focus:ring-purple-500/10"
                  />

                </div>

                {/* Message */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-300"
                    >
                      Message
                    </label>

                    <span className="text-xs text-gray-600">
                      {form.message.length} characters
                    </span>

                  </div>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me a little about your project..."
                    className="w-full resize-none rounded-xl border border-gray-800 bg-gray-950/70 px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-gray-950 focus:ring-4 focus:ring-purple-500/10"
                  />

                </div>

                {/* Error */}

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                    <p className="text-sm leading-6 text-red-400">
                      {error}
                    </p>

                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  disabled={
                    status === "sending"
                  }
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/10 transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message

                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}

                </button>

                <p className="text-center text-xs leading-5 text-gray-600">
                  Your information will only be used
                  to respond to your message.
                </p>

              </form>

            )}

          </div>

        </div>

      </section>

    </main>
  )
}

export default Contact