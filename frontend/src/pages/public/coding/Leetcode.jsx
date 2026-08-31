import { useMemo } from "react"
import {
  FaCode,
  FaExternalLinkAlt,
  FaTrophy,
  FaChartLine,
  FaCheckCircle,
  FaFire,
  FaMedal,
} from "react-icons/fa"

import { usePublicProfile } from "./usePublicProfile"

function formatNumber(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "0"
  }

  return new Intl.NumberFormat("en-IN").format(
    Number(value)
  )
}

function getPercentage(solved, total) {
  if (!total || total <= 0) {
    return 0
  }

  return Math.min(
    100,
    Math.round((solved / total) * 100)
  )
}

function DifficultyCard({
  title,
  solved,
  total,
  icon,
}) {
  const percentage = getPercentage(
    solved,
    total
  )

  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-[#080f20] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16]">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-gray-300">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {title}
            </h3>

            <p className="text-xs text-gray-500">
              Problems solved
            </p>
          </div>

        </div>

        <span className="text-2xl font-black text-white">
          {formatNumber(solved)}
        </span>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Progress
          </span>

          <span className="text-gray-400">
            {percentage}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <p className="mt-2 text-xs text-gray-600">
          {formatNumber(solved)} /{" "}
          {formatNumber(total)}
        </p>

      </div>

    </div>
  )
}

function Leetcode() {
  const {
    profile,
    leetcode,
    leetcodeLoading,
    leetcodeError,
  } = usePublicProfile()

  const username =
    leetcode?.username ||
    profile?.leetcode?.username ||
    ""

  const profileUrl =
    profile?.leetcode?.url ||
    `https://leetcode.com/u/${username}/`

  const totalProblems = useMemo(() => {
    return (
      (leetcode?.easy?.total || 0) +
      (leetcode?.medium?.total || 0) +
      (leetcode?.hard?.total || 0)
    )
  }, [leetcode])

  // =====================================================
  // LOADING
  // =====================================================

  if (leetcodeLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="animate-pulse space-y-7">

            <div className="h-5 w-32 rounded bg-gray-800" />

            <div className="h-14 w-96 rounded bg-gray-800" />

            <div className="h-7 w-2/3 rounded bg-gray-900" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <div className="h-32 rounded-2xl bg-gray-900" />
              <div className="h-32 rounded-2xl bg-gray-900" />
              <div className="h-32 rounded-2xl bg-gray-900" />
              <div className="h-32 rounded-2xl bg-gray-900" />

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              <div className="h-44 rounded-2xl bg-gray-900" />
              <div className="h-44 rounded-2xl bg-gray-900" />
              <div className="h-44 rounded-2xl bg-gray-900" />

            </div>

          </div>

        </div>

      </div>
    )
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (leetcodeError) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-24 text-white">

        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900">
              <FaCode className="h-8 w-8 text-red-400" />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              LeetCode unavailable
            </h1>

            <p className="mt-3 leading-7 text-red-400">
              {leetcodeError}
            </p>

            {profile?.leetcode?.username && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-950 transition hover:-translate-y-1 hover:bg-gray-200"
              >
                <FaCode />
                View LeetCode
                <FaExternalLinkAlt className="h-3 w-3" />
              </a>
            )}

          </div>

        </div>

      </div>
    )
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (!leetcode) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-24 text-white">

        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl border border-white/[0.08] bg-[#080f20] p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-900">

              <FaCode className="h-10 w-10 text-gray-500" />

            </div>

            <h1 className="mt-6 text-3xl font-bold">
              LeetCode
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              LeetCode statistics are not available yet.
            </p>

            {profile?.leetcode?.username && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-950 transition hover:-translate-y-1 hover:bg-gray-200"
              >
                <FaCode />
                View LeetCode Profile
                <FaExternalLinkAlt className="h-3 w-3" />
              </a>
            )}

          </div>

        </div>

      </div>
    )
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* =================================================
          HERO
          ================================================= */}

      <section className="relative overflow-hidden border-b border-white/[0.06]">

        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <FaCode className="h-6 w-6 text-cyan-400" />

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  LeetCode
                </p>

              </div>

              <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">

                Problem
                <br />

                <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  solving
                </span>

              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                My LeetCode journey, problem-solving
                progress and competitive programming
                activity.
              </p>

              {username && (
                <p className="mt-4 text-sm text-gray-600">
                  @{username}
                </p>
              )}

            </div>

            {username && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 font-semibold text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-white"
              >

                <FaCode />

                View LeetCode

                <FaExternalLinkAlt className="h-3 w-3 transition-transform group-hover:translate-x-1" />

              </a>
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          OVERVIEW
          ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<FaCheckCircle />}
            label="Problems Solved"
            value={leetcode.totalSolved}
          />

          <StatCard
            icon={<FaChartLine />}
            label="Submissions"
            value={leetcode.totalSubmissions}
          />

          <StatCard
            icon={<FaTrophy />}
            label="Global Ranking"
            value={leetcode.ranking}
          />

          <StatCard
            icon={<FaMedal />}
            label="Reputation"
            value={leetcode.reputation}
          />

        </div>


        {/* =================================================
            DIFFICULTIES
            ================================================= */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <DifficultyCard
            title="Easy"
            solved={leetcode.easy?.solved || 0}
            total={leetcode.easy?.total || 0}
            icon={<FaCheckCircle />}
          />

          <DifficultyCard
            title="Medium"
            solved={leetcode.medium?.solved || 0}
            total={leetcode.medium?.total || 0}
            icon={<FaFire />}
          />

          <DifficultyCard
            title="Hard"
            solved={leetcode.hard?.solved || 0}
            total={leetcode.hard?.total || 0}
            icon={<FaTrophy />}
          />

        </div>


        {/* =================================================
            LEETCODE SUBMISSION HEATMAP
            ================================================= */}

        <LeetcodeHeatmap
          submissionCalendar={leetcode.submissionCalendar}
        />


        {/* =================================================
            SOLVING SUMMARY
            ================================================= */}

        <div className="mt-8 rounded-3xl border border-white/[0.08] bg-[#080f20] p-7">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.25em] text-purple-400">
                Progress
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Problem solving overview
              </h2>

            </div>

            <div className="text-sm text-gray-500">
              {formatNumber(leetcode.totalSolved)}
              {" "}
              solved
            </div>

          </div>

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-sm text-gray-400">
                Overall completion
              </span>

              <span className="font-semibold text-white">
                {getPercentage(
                  leetcode.totalSolved,
                  totalProblems
                )}
                %
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 transition-all duration-1000"
                style={{
                  width: `${getPercentage(
                    leetcode.totalSolved,
                    totalProblems
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* =================================================
            CODING FOCUS
            ================================================= */}

        {profile?.codingProfile && (
          <div className="mt-8">

            <div className="mb-7">

              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                Coding Focus
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                How I practice
              </h2>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              <FocusCard
                title="Focus"
                value={
                  profile.codingProfile.focus
                }
                icon={<FaCode />}
              />

              <FocusCard
                title="Practice"
                value={
                  profile.codingProfile.practice
                }
                icon={<FaChartLine />}
              />

              <FocusCard
                title="Goal"
                value={
                  profile.codingProfile.goal
                }
                icon={<FaTrophy />}
              />

            </div>

          </div>
        )}

      </section>

    </div>
  )
}


// =====================================================
// LEETCODE SUBMISSION HEATMAP
// =====================================================

function LeetcodeHeatmap({ submissionCalendar = {} }) {
  const days = useMemo(() => {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const start = new Date(today)
    start.setUTCDate(start.getUTCDate() - 364)

    // Move back to Sunday so the grid always has complete weeks.
    start.setUTCDate(start.getUTCDate() - start.getUTCDay())

    const result = []

    for (
      let date = new Date(start);
      date <= today;
      date.setUTCDate(date.getUTCDate() + 1)
    ) {
      const timestamp = Math.floor(date.getTime() / 1000)

      const count =
        Number(submissionCalendar[timestamp]) ||
        Number(submissionCalendar[String(timestamp)]) ||
        0

      result.push({
        date: new Date(date),
        count,
      })
    }

    return result
  }, [submissionCalendar])

  const weeks = useMemo(() => {
    const result = []

    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7))
    }

    return result
  }, [days])

  const maxSubmissions = useMemo(() => {
    return Math.max(1, ...days.map((day) => day.count))
  }, [days])

  const totalActivity = useMemo(() => {
    return days.reduce(
      (total, day) => total + day.count,
      0
    )
  }, [days])

  const getLevel = (count) => {
    if (count === 0) return "bg-gray-900"

    const first = Math.max(
      1,
      Math.ceil(maxSubmissions * 0.25)
    )

    const second = Math.max(
      first + 1,
      Math.ceil(maxSubmissions * 0.5)
    )

    const third = Math.max(
      second + 1,
      Math.ceil(maxSubmissions * 0.75)
    )

    if (count <= first) return "bg-green-950"
    if (count <= second) return "bg-green-800"
    if (count <= third) return "bg-green-600"

    return "bg-green-400"
  }

  return (
    <div className="mt-8 rounded-3xl border border-white/[0.08] bg-[#080f20] p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Activity
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            LeetCode submission activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your submission activity over the last year
          </p>
        </div>

        <span className="text-sm font-medium text-gray-400">
          {formatNumber(totalActivity)} submissions
        </span>
      </div>

      <div className="mt-8 overflow-x-auto pb-3">
        <div className="min-w-[900px]">
          <div className="flex">
            {/* Weekday labels */}
            <div className="mr-2 flex w-7 flex-col justify-between py-1">
              <span className="text-[9px] text-gray-600">
                Sun
              </span>

              <span className="text-[9px] text-gray-600">
                Tue
              </span>

              <span className="text-[9px] text-gray-600">
                Thu
              </span>

              <span className="text-[9px] text-gray-600">
                Sat
              </span>
            </div>

            {/* Calendar */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-col gap-1"
                >
                  {week.map((day) => (
                    <div
                      key={day.date.toISOString()}
                      title={`${day.count} submission${
                        day.count === 1 ? "" : "s"
                      } on ${day.date.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}`}
                      className={`h-3 w-3 rounded-[3px] ${getLevel(
                        day.count
                      )} transition duration-200 hover:scale-125 hover:ring-2 hover:ring-white/50`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center justify-end gap-2 text-xs text-gray-600">
        <span>Less</span>

        <span className="h-3 w-3 rounded-[3px] bg-gray-900" />
        <span className="h-3 w-3 rounded-[3px] bg-green-950" />
        <span className="h-3 w-3 rounded-[3px] bg-green-800" />
        <span className="h-3 w-3 rounded-[3px] bg-green-600" />
        <span className="h-3 w-3 rounded-[3px] bg-green-400" />

        <span>More</span>
      </div>
    </div>
  )
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-[#080f20] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.15]">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
        {icon}
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-4xl font-black">
        {formatNumber(value)}
      </p>

    </div>
  )
}


// =====================================================
// FOCUS CARD
// =====================================================

function FocusCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#080f20] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
        {icon}
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 font-semibold text-white">
        {value || "-"}
      </p>

    </div>
  )
}

export default Leetcode