import { useMemo } from "react"
import {
  FaGithub,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaStar,
  FaCodeBranch,
  FaUsers,
  FaUserPlus,
} from "react-icons/fa"

import { usePublicProfile } from "./usePublicProfile"

function formatNumber(number) {
  if (number === null || number === undefined) {
    return "-"
  }

  return new Intl.NumberFormat("en-IN").format(number)
}

function getGithubLevel(level) {
  if (!level || level === "NONE") return 0
  if (level === "FIRST_QUARTILE") return 1
  if (level === "SECOND_QUARTILE") return 2
  if (level === "THIRD_QUARTILE") return 3
  if (level === "FOURTH_QUARTILE") return 4

  return 0
}

const githubColors = [
  "bg-gray-900",
  "bg-green-950",
  "bg-green-800",
  "bg-green-600",
  "bg-green-400",
]

function Github() {
  const {
    profile,
    github,
    loading,
    githubLoading,
    error,
    githubError,
  } = usePublicProfile()

  const githubWeeks =
    github?.contributionCalendar?.weeks || []

  const githubTotal =
    github?.contributionCalendar
      ?.totalContributions || 0

  const languageRows = useMemo(() => {
    if (!github?.topLanguages?.length) {
      return []
    }

    const max =
      github.topLanguages[0]?.count || 1

    return github.topLanguages.map((language) => ({
      ...language,
      percentage: Math.min(
        100,
        (language.count / max) * 100
      ),
    }))
  }, [github])

  // =====================================================
  // LOADING
  // =====================================================

  if (loading || githubLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-32 rounded bg-gray-800" />
            <div className="h-14 w-96 rounded bg-gray-800" />
            <div className="h-8 w-2/3 rounded bg-gray-900" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="h-32 rounded-2xl bg-gray-900" />
              <div className="h-32 rounded-2xl bg-gray-900" />
              <div className="h-32 rounded-2xl bg-gray-900" />
              <div className="h-32 rounded-2xl bg-gray-900" />
            </div>

            <div className="h-72 rounded-3xl bg-gray-900" />
          </div>
        </div>
      </div>
    )
  }

  // =====================================================
  // PROFILE ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10">
            <FaGithub className="h-10 w-10 text-red-400" />

            <h1 className="mt-6 text-3xl font-bold">
              Unable to load profile
            </h1>

            <p className="mt-3 text-red-400">
              {error}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // =====================================================
  // GITHUB ERROR
  // =====================================================

  if (githubError) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900">
              <FaGithub className="h-8 w-8 text-red-400" />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              GitHub unavailable
            </h1>

            <p className="mt-3 leading-7 text-red-400">
              {githubError}
            </p>

            {profile?.github?.username && (
              <a
                href={
                  profile.github.url ||
                  `https://github.com/${profile.github.username}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-950 transition hover:-translate-y-1 hover:bg-gray-200"
              >
                <FaGithub />
                View GitHub
                <FaExternalLinkAlt className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // =====================================================
  // NO DATA
  // =====================================================

  if (!github) {
    return (
      <div className="min-h-screen bg-gray-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/[0.08] bg-[#080f20] p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-900">
              <FaGithub className="h-10 w-10 text-gray-500" />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              GitHub
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              GitHub statistics are not available yet.
            </p>

            {profile?.github?.username && (
              <a
                href={
                  profile.github.url ||
                  `https://github.com/${profile.github.username}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-950 transition hover:-translate-y-1 hover:bg-gray-200"
              >
                <FaGithub />
                View GitHub Profile
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

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/[0.06]">

        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-3">
                <FaGithub className="h-6 w-6 text-cyan-400" />

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  GitHub
                </p>
              </div>

              <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
                Open source
                <br />

                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  & development
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                Explore my repositories, contribution
                activity and the technologies I use to
                build software.
              </p>

              <p className="mt-4 text-sm text-gray-600">
                @{github.username}
              </p>

            </div>

            {github.profileUrl && (
              <a
                href={github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 font-semibold text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-white"
              >
                <FaGithub />
                View GitHub
                <FaExternalLinkAlt className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            )}

          </div>

        </div>
      </section>


      {/* STATS */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<FaFolderOpen />}
            label="Repositories"
            value={github.publicRepositories}
            iconClass="text-purple-400 bg-purple-500/10"
          />

          <StatCard
            icon={<FaUsers />}
            label="Followers"
            value={github.followers}
            iconClass="text-cyan-400 bg-cyan-500/10"
          />

          <StatCard
            icon={<FaUserPlus />}
            label="Following"
            value={github.following}
            iconClass="text-fuchsia-400 bg-fuchsia-500/10"
          />

          <StatCard
            icon={<FaCodeBranch />}
            label="Contributions"
            value={githubTotal}
            iconClass="text-green-400 bg-green-500/10"
          />

        </div>


        {/* CONTRIBUTION GRAPH */}

        {githubWeeks.length > 0 && (
          <div className="mt-8 rounded-3xl border border-white/[0.08] bg-[#080f20] p-7">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Contribution activity
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  GitHub activity over the last year
                </p>
              </div>

              <span className="text-sm font-medium text-gray-400">
                {formatNumber(githubTotal)} contributions
              </span>

            </div>

            <div className="mt-8 overflow-x-auto pb-3">

              <div className="min-w-[900px]">

                <div className="flex gap-1 pl-8">

                  {githubWeeks.map((week, index) => {

                    const date = new Date(
                      `${week.firstDay}T00:00:00`
                    )

                    const previous =
                      index > 0
                        ? new Date(
                            `${githubWeeks[index - 1].firstDay}T00:00:00`
                          )
                        : null

                    const showMonth =
                      !previous ||
                      date.getMonth() !==
                        previous.getMonth()

                    return (
                      <div
                        key={week.firstDay}
                        className="w-3 shrink-0"
                      >
                        {showMonth && (
                          <span className="text-[9px] text-gray-600">
                            {date.toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                              }
                            )}
                          </span>
                        )}
                      </div>
                    )
                  })}

                </div>

                <div className="mt-2 flex">

                  <div className="mr-2 flex w-6 flex-col justify-between py-1">

                    <span className="text-[9px] text-gray-600">
                      Mon
                    </span>

                    <span className="text-[9px] text-gray-600">
                      Wed
                    </span>

                    <span className="text-[9px] text-gray-600">
                      Fri
                    </span>

                  </div>

                  <div className="flex gap-1">

                    {githubWeeks.map((week) => (

                      <div
                        key={week.firstDay}
                        className="flex flex-col gap-1"
                      >

                        {week.contributionDays.map(
                          (day) => {

                            const level =
                              getGithubLevel(
                                day.contributionLevel
                              )

                            return (
                              <div
                                key={day.date}
                                title={`${day.contributionCount} contributions on ${day.date}`}
                                className={`h-3 w-3 rounded-[3px] ${githubColors[level]} transition duration-200 hover:scale-125 hover:ring-2 hover:ring-white/50`}
                              />
                            )
                          }
                        )}

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-end gap-2 text-xs text-gray-600">

              <span>Less</span>

              {githubColors.map((color, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-[3px] ${color}`}
                />
              ))}

              <span>More</span>

            </div>

          </div>
        )}


        {/* LANGUAGES */}

        {languageRows.length > 0 && (
          <div className="mt-8 rounded-3xl border border-white/[0.08] bg-[#080f20] p-7">

            <h2 className="text-xl font-bold">
              Top Languages
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Languages detected from your repositories
            </p>

            <div className="mt-7 space-y-5">

              {languageRows.map((language) => (

                <div key={language.name}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-gray-300">
                      {language.name}
                    </span>

                    <span className="text-xs text-gray-500">
                      {language.count} repos
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-800">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-700"
                      style={{
                        width: `${language.percentage}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}


        {/* RECENT REPOSITORIES */}

        {github.recentRepositories?.length > 0 && (
          <div className="mt-12">

            <div className="mb-7">

              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                Projects
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Recent repositories
              </h2>

              <p className="mt-2 text-gray-500">
                Latest public repositories from GitHub.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {github.recentRepositories.map(
                (repo) => (

                  <a
                    key={repo.name}
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-white/[0.08] bg-[#080f20] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-[#0b1327]"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition group-hover:bg-purple-500/20">
                        <FaFolderOpen />
                      </div>

                      <FaExternalLinkAlt className="h-3.5 w-3.5 text-gray-600 transition group-hover:translate-x-1 group-hover:text-white" />

                    </div>

                    <h3 className="mt-6 font-semibold text-white">
                      {repo.name}
                    </h3>

                    {repo.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {repo.description}
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">

                      {repo.language && (
                        <span>
                          ● {repo.language}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1">
                        <FaStar />
                        {repo.stars}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <FaCodeBranch />
                        {repo.forks}
                      </span>

                    </div>

                  </a>

                )
              )}

            </div>

          </div>
        )}

      </section>

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
  iconClass,
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-[#080f20] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.15]">

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
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

export default Github