import { useEffect, useState } from "react"
import {
  getMessages,
  markMessageRead,
  deleteMessage,
} from "../../services/messageService"


// ==================================================
// ICONS
// ==================================================

const icons = {
  mail: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4 7 8 6 8-6"
      />
    </svg>
  ),

  unread: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  read: (
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
        d="m5 12 4 4L19 6"
      />
    </svg>
  ),

  refresh: (
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
        d="M20 11a8 8 0 0 0-14.9-3M4 5v4h4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 13a8 8 0 0 0 14.9 3M20 19v-4h-4"
      />
    </svg>
  ),

  check: (
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
        d="m5 12 4 4L19 6"
      />
    </svg>
  ),

  trash: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        d="M4 7h16"
      />
      <path
        strokeLinecap="round"
        d="M10 11v6M14 11v6"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 7l1 14h10l1-14M9 7V4h6v3"
      />
    </svg>
  ),

  close: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        d="m6 6 12 12M18 6 6 18"
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

  user: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path
        strokeLinecap="round"
        d="M5.5 20c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5"
      />
    </svg>
  ),
}


// ==================================================
// COMPONENT
// ==================================================

function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [deletingMessage, setDeletingMessage] = useState(null)
  const [deleting, setDeleting] = useState(false)


  // ==================================================
  // FETCH MESSAGES
  // ==================================================

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError("")

      const data = await getMessages()

      setMessages(
        Array.isArray(data)
          ? data
          : []
      )
    } catch (err) {
      setError(
        err?.message ||
        "Unable to load messages."
      )
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    queueMicrotask(fetchMessages)
  }, [])


  // ==================================================
  // MARK AS READ
  // ==================================================

  const handleMarkRead = async (id) => {
    try {
      setError("")

      const updated = await markMessageRead(id)

      setMessages((prev) =>
        prev.map((message) =>
          message._id === id
            ? updated
            : message
        )
      )
    } catch (err) {
      setError(
        err?.message ||
        "Unable to mark message as read."
      )
    }
  }


  // ==================================================
  // DELETE MODAL
  // ==================================================

  const openDeleteModal = (message) => {
    setDeletingMessage(message)
    setError("")
  }


  const closeDeleteModal = () => {
    if (deleting) return

    setDeletingMessage(null)
  }


  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = async () => {
    if (!deletingMessage) return

    try {
      setDeleting(true)
      setError("")

      await deleteMessage(
        deletingMessage._id
      )

      setMessages((prev) =>
        prev.filter(
          (message) =>
            message._id !==
            deletingMessage._id
        )
      )

      setDeletingMessage(null)
    } catch (err) {
      setError(
        err?.message ||
        "Unable to delete message."
      )
    } finally {
      setDeleting(false)
    }
  }


  // ==================================================
  // STATISTICS
  // ==================================================

  const totalMessages = messages.length

  const unreadMessages =
    messages.filter(
      (message) => !message.read
    ).length

  const readMessages =
    messages.filter(
      (message) => message.read
    ).length


  // ==================================================
  // DATE
  // ==================================================

  const formatDate = (date) => {
    if (!date) return ""

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return ""
    }

    return parsedDate.toLocaleString(
      undefined,
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    )
  }


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#f7f8fc]">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-500/[0.07] blur-[100px]" />

          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[100px]" />

        </div>


        <div className="relative">

          <div className="mb-8">

            <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />

            <div className="mt-4 h-10 w-48 animate-pulse rounded-xl bg-gray-200" />

            <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded-full bg-gray-100" />

          </div>


          <div className="grid gap-4 md:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-white"
              />
            ))}

          </div>


          <div className="mt-8 space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl border border-gray-200 bg-white"
              />
            ))}

          </div>

        </div>

      </div>
    )
  }


  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8fc]">


      {/* ==================================================
          BACKGROUND
          ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-48 -top-48 h-[32rem] w-[32rem] rounded-full bg-purple-500/[0.055] blur-[120px]" />

        <div className="absolute -right-48 top-20 h-[32rem] w-[32rem] rounded-full bg-cyan-500/[0.05] blur-[120px]" />

      </div>


      <div className="relative">


        {/* ==================================================
            HEADER
            ================================================== */}

        <header className="mb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-600">
                  Inbox
                </p>

              </div>


              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                Messages
              </h1>


              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Manage messages and enquiries submitted
                through your portfolio.
              </p>

            </div>


            {/* Refresh */}

            <button
              type="button"
              onClick={fetchMessages}
              disabled={loading}
              className="
                group flex w-fit items-center gap-2
                rounded-xl border border-gray-200
                bg-white px-4 py-2.5
                text-xs font-semibold text-gray-600
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-gray-300
                hover:text-gray-950
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <span className="transition-transform duration-500 group-hover:rotate-180">
                {icons.refresh}
              </span>

              Refresh
            </button>

          </div>

        </header>


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

            <button
              type="button"
              onClick={() => setError("")}
              className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
              aria-label="Close error"
            >
              {icons.close}
            </button>

          </div>

        )}


        {/* ==================================================
            STATISTICS
            ================================================== */}

        <div className="grid gap-4 md:grid-cols-3">


          {/* Total */}

          <div className="group rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Total messages
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                  {totalMessages}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition group-hover:bg-gray-900 group-hover:text-white">
                {icons.mail}
              </div>

            </div>


            <p className="mt-4 text-xs text-gray-400">
              All contact submissions
            </p>

          </div>


          {/* Unread */}

          <div className="group rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Unread
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-purple-600">
                  {unreadMessages}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                {icons.unread}
              </div>

            </div>


            <p className="mt-4 text-xs text-gray-400">
              Waiting for your review
            </p>

          </div>


          {/* Read */}

          <div className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Read
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-600">
                  {readMessages}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                {icons.read}
              </div>

            </div>


            <p className="mt-4 text-xs text-gray-400">
              Already reviewed
            </p>

          </div>

        </div>


        {/* ==================================================
            EMPTY STATE
            ================================================== */}

        {messages.length === 0 ? (

          <div className="mt-6 overflow-hidden rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              {icons.mail}
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-950">
              No messages yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Messages submitted through your portfolio
              contact form will appear here.
            </p>

          </div>

        ) : (


          /* ==================================================
             MESSAGE LIST
             ================================================== */

          <div className="mt-6 space-y-4">

            {messages.map((msg) => (

              <article
                key={msg._id}
                className={`
                  group relative overflow-hidden rounded-2xl
                  border bg-white shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg
                  ${
                    !msg.read
                      ? "border-purple-200/80"
                      : "border-gray-200/80"
                  }
                `}
              >


                {/* Unread accent */}

                {!msg.read && (
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400" />
                )}


                <div className="p-5 sm:p-6">


                  {/* ==================================================
                      MESSAGE HEADER
                      ================================================== */}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex min-w-0 items-start gap-3.5">


                      {/* Avatar */}

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-cyan-100 text-sm font-bold text-purple-600">
                        {msg.name
                          ?.charAt(0)
                          ?.toUpperCase() || "?"}
                      </div>


                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h2 className="truncate text-sm font-bold text-gray-950 sm:text-base">
                            {msg.name || "Unknown sender"}
                          </h2>


                          {!msg.read && (

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-purple-600">

                              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />

                              New

                            </span>

                          )}

                        </div>


                        <p className="mt-1 flex items-center gap-1.5 break-all text-xs text-gray-500">

                          <span className="text-gray-400">
                            {icons.user}
                          </span>

                          {msg.email}

                        </p>

                      </div>

                    </div>


                    {/* Date */}

                    <time className="shrink-0 text-[11px] font-medium text-gray-400">
                      {formatDate(msg.createdAt)}
                    </time>

                  </div>


                  {/* ==================================================
                      SUBJECT
                      ================================================== */}

                  {msg.subject && (

                    <div className="mt-6">

                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        Subject
                      </p>

                      <h3 className="mt-1.5 text-sm font-semibold text-gray-800">
                        {msg.subject}
                      </h3>

                    </div>

                  )}


                  {/* ==================================================
                      MESSAGE BODY
                      ================================================== */}

                  <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-4">

                    <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                      {msg.message}
                    </p>

                  </div>


                  {/* ==================================================
                      ACTIONS
                      ================================================== */}

                  <div className="mt-5 flex flex-wrap items-center gap-2.5">


                    {!msg.read ? (

                      <button
                        type="button"
                        onClick={() =>
                          handleMarkRead(msg._id)
                        }
                        className="
                          inline-flex items-center gap-2
                          rounded-xl border border-emerald-200
                          bg-emerald-50 px-3.5 py-2.5
                          text-xs font-semibold text-emerald-600
                          transition-all duration-200
                          hover:bg-emerald-100
                          hover:shadow-sm
                        "
                      >
                        {icons.check}
                        Mark as read
                      </button>

                    ) : (

                      <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs font-medium text-gray-400">
                        {icons.check}
                        Read
                      </span>

                    )}


                    <button
                      type="button"
                      onClick={() =>
                        openDeleteModal(msg)
                      }
                      className="
                        inline-flex items-center gap-2
                        rounded-xl border border-red-200
                        bg-red-50 px-3.5 py-2.5
                        text-xs font-semibold text-red-600
                        transition-all duration-200
                        hover:bg-red-100
                        hover:shadow-sm
                      "
                    >
                      {icons.trash}
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>


      {/* ==================================================
          DELETE MODAL
          ================================================== */}

      {deletingMessage && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4 backdrop-blur-sm">


          {/* Modal */}

          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">


            {/* Top accent */}

            <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-600" />


            <div className="p-6 sm:p-7">


              {/* Icon */}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                {icons.trash}
              </div>


              <h2 className="mt-5 text-xl font-bold tracking-tight text-gray-950">
                Delete message?
              </h2>


              <p className="mt-2 text-sm leading-6 text-gray-500">
                You are about to permanently delete the
                message from{" "}
                <span className="font-semibold text-gray-800">
                  {deletingMessage.name}
                </span>
                .
              </p>


              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3">

                <p className="text-xs font-medium text-red-600">
                  This action cannot be undone.
                </p>

              </div>


              {/* Buttons */}

              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  className="
                    flex-1 rounded-xl
                    border border-gray-200
                    bg-white px-4 py-3
                    text-sm font-semibold text-gray-600
                    transition hover:bg-gray-50
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="
                    flex-1 inline-flex
                    items-center justify-center gap-2
                    rounded-xl bg-red-600
                    px-4 py-3
                    text-sm font-semibold text-white
                    shadow-lg shadow-red-600/10
                    transition-all
                    hover:bg-red-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  {deleting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {deleting
                    ? "Deleting..."
                    : "Delete message"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Messages