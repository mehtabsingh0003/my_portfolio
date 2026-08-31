const Profile = require("../models/Profile")

// =====================================================
// GITHUB STATS
// =====================================================

const getGithubStats = async (username) => {
  if (!username || !username.trim()) {
    throw new Error("GitHub username is not configured")
  }

  const cleanUsername = username.trim()

  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  const userResponse = await fetch(
    `https://api.github.com/users/${encodeURIComponent(
      cleanUsername
    )}`,
    { headers }
  )

  if (!userResponse.ok) {
    throw new Error(
      `GitHub API ${userResponse.status}`
    )
  }

  const user = await userResponse.json()

  // ===================================================
  // REPOSITORIES
  // ===================================================

  const repoResponse = await fetch(
    `https://api.github.com/users/${encodeURIComponent(
      cleanUsername
    )}/repos?per_page=100&sort=updated`,
    { headers }
  )

  const repositories = repoResponse.ok
    ? await repoResponse.json()
    : []

  // ===================================================
  // LANGUAGES
  // ===================================================

  const languageMap = {}

  repositories.forEach((repo) => {
    if (!repo.language) return

    languageMap[repo.language] =
      (languageMap[repo.language] || 0) + 1
  })

  const topLanguages = Object.entries(languageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      count,
    }))

  // ===================================================
  // RECENT REPOSITORIES
  // ===================================================

  const recentRepositories = repositories
    .filter((repo) => !repo.fork)
    .sort(
      (a, b) =>
        new Date(b.updated_at) -
        new Date(a.updated_at)
    )
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      htmlUrl: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
    }))

  // ===================================================
  // CONTRIBUTIONS
  // ===================================================

  let contributionCalendar = null

  if (process.env.GITHUB_TOKEN) {
    try {
      const query = `
        query ($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                colors
                weeks {
                  firstDay
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                    weekday
                  }
                }
              }
            }
          }
        }
      `

      const response = await fetch(
        "https://api.github.com/graphql",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          body: JSON.stringify({
            query,
            variables: {
              username: cleanUsername,
            },
          }),
        }
      )

      const result = await response.json()

      if (
        response.ok &&
        !result.errors &&
        result.data?.user
      ) {
        contributionCalendar =
          result.data.user
            .contributionsCollection
            .contributionCalendar
      }
    } catch (error) {
      console.error(
        "GitHub contribution error:",
        error.message
      )
    }
  }

  return {
    username: user.login,
    name: user.name || cleanUsername,
    avatar: user.avatar_url,
    profileUrl: user.html_url,
    bio: user.bio || "",

    publicRepositories: user.public_repos,
    followers: user.followers,
    following: user.following,
    publicGists: user.public_gists,

    topLanguages,
    recentRepositories,
    contributionCalendar,
  }
}


// =====================================================
// LEETCODE STATS
// =====================================================

const getLeetcodeStats = async (username) => {
  if (!username || !username.trim()) {
    throw new Error(
      "LeetCode username is not configured"
    )
  }

  const cleanUsername = username.trim()

  // ===================================================
  // PROFILE + BASIC STATS
  // ===================================================

  const profileQuery = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username

        profile {
          realName
          userAvatar
          ranking
          reputation
        }

        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }

          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }

        submissionCalendar
      }
    }
  `

  const response = await fetch(
    "https://leetcode.com/graphql",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/",
        Origin: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0",
      },

      body: JSON.stringify({
        query: profileQuery,
        variables: {
          username: cleanUsername,
        },
      }),
    }
  )

  if (!response.ok) {
    throw new Error(
      `LeetCode API ${response.status}`
    )
  }

  const result = await response.json()

  if (
    result.errors ||
    !result.data?.matchedUser
  ) {
    throw new Error(
      "LeetCode user not found"
    )
  }

  const user = result.data.matchedUser

  const solvedStats =
    user.submitStatsGlobal?.acSubmissionNum || []

  const totalStats =
    user.submitStatsGlobal?.totalSubmissionNum || []

  const findDifficulty = (
    stats,
    difficulty
  ) =>
    stats.find(
      (item) =>
        item.difficulty === difficulty
    )

  const easySolved =
    findDifficulty(
      solvedStats,
      "Easy"
    )?.count || 0

  const mediumSolved =
    findDifficulty(
      solvedStats,
      "Medium"
    )?.count || 0

  const hardSolved =
    findDifficulty(
      solvedStats,
      "Hard"
    )?.count || 0

  const easyTotal =
    findDifficulty(
      totalStats,
      "Easy"
    )?.count || 0

  const mediumTotal =
    findDifficulty(
      totalStats,
      "Medium"
    )?.count || 0

  const hardTotal =
    findDifficulty(
      totalStats,
      "Hard"
    )?.count || 0

  const totalSolved =
    findDifficulty(
      solvedStats,
      "All"
    )?.count ||
    easySolved +
    mediumSolved +
    hardSolved

  const totalSubmissions =
    findDifficulty(
      solvedStats,
      "All"
    )?.submissions || 0

  // ===================================================
  // CONTEST
  // ===================================================

  let contest = null

  try {
    const contestQuery = `
      query userContestRankingInfo(
        $username: String!
      ) {
        userContestRanking(
          username: $username
        ) {
          rating
          globalRanking
          topPercentage
          attendedContestsCount
        }
      }
    `

    const contestResponse = await fetch(
      "https://leetcode.com/graphql",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com/",
          Origin: "https://leetcode.com",
          "User-Agent":
            "Mozilla/5.0",
        },

        body: JSON.stringify({
          query: contestQuery,
          variables: {
            username: cleanUsername,
          },
        }),
      }
    )

    const contestResult =
      await contestResponse.json()

    contest =
      contestResult.data
        ?.userContestRanking || null
  } catch (error) {
    console.error(
      "LeetCode contest error:",
      error.message
    )
  }

  // ===================================================
  // RETURN
  // ===================================================

  // ===================================================
  // SUBMISSION CALENDAR
  // ===================================================

  let submissionCalendar = {}

  try {
    if (user.submissionCalendar) {
      submissionCalendar =
        typeof user.submissionCalendar === "string"
          ? JSON.parse(user.submissionCalendar)
          : user.submissionCalendar
    }
  } catch (error) {
    console.error(
      "LeetCode submission calendar parse error:",
      error.message
    )

    submissionCalendar = {}
  }

  // ===================================================
  // RETURN
  // ===================================================

  return {
    username: user.username,

    name:
      user.profile?.realName ||
      user.username,

    avatar:
      user.profile?.userAvatar || "",

    ranking:
      user.profile?.ranking || 0,

    reputation:
      user.profile?.reputation || 0,

    totalSolved,

    totalSubmissions,

    easy: {
      solved: easySolved,
      total: easyTotal,
    },

    medium: {
      solved: mediumSolved,
      total: mediumTotal,
    },

    hard: {
      solved: hardSolved,
      total: hardTotal,
    },

    submissionCalendar,

    contest,
  }
}


// =====================================================
// GET PROFILE
// GET /api/profile
// =====================================================

const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne()

    if (!profile) {
      profile = await Profile.create({})
    }

    const profileData =
      profile.toObject()

    let github = null
    let leetcode = null

    // ===================================================
    // GITHUB
    // ===================================================

    if (profile.github?.username) {
      try {
        github = await getGithubStats(
          profile.github.username
        )
      } catch (error) {
        console.error(
          "GITHUB ERROR:",
          error.message
        )
      }
    }

    // ===================================================
    // LEETCODE
    // ===================================================

    if (profile.leetcode?.username) {
      try {
        leetcode =
          await getLeetcodeStats(
            profile.leetcode.username
          )
      } catch (error) {
        console.error(
          "LEETCODE ERROR:",
          error.message
        )
      }
    }

    // ===================================================
    // RESPONSE
    // ===================================================

    res.status(200).json({
      ...profileData,

      codingStats: {
        github,
        leetcode,
      },
    })
  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    )

    res.status(500).json({
      message:
        "Failed to fetch profile",
      error: error.message,
    })
  }
}


// =====================================================
// GET GITHUB
// GET /api/profile/github
// =====================================================

const getGithub = async (req, res) => {
  try {
    const profile =
      await Profile.findOne()

    if (!profile) {
      return res.status(404).json({
        message:
          "Profile not found",
      })
    }

    const username =
      profile.github?.username

    if (!username) {
      return res.status(400).json({
        message:
          "GitHub username is not configured in Admin Profile",
      })
    }

    const github =
      await getGithubStats(username)

    res.status(200).json(github)
  } catch (error) {
    console.error(
      "GET GITHUB ERROR:",
      error.message
    )

    res.status(500).json({
      message: error.message,
    })
  }
}


// =====================================================
// GET LEETCODE
// GET /api/profile/leetcode
// =====================================================

const getLeetcode = async (
  req,
  res
) => {
  try {
    const profile =
      await Profile.findOne()

    if (!profile) {
      return res.status(404).json({
        message:
          "Profile not found",
      })
    }

    const username =
      profile.leetcode?.username

    if (!username) {
      return res.status(400).json({
        message:
          "LeetCode username is not configured in Admin Profile",
      })
    }

    const leetcode =
      await getLeetcodeStats(username)

    res.status(200).json(
      leetcode
    )
  } catch (error) {
    console.error(
      "GET LEETCODE ERROR:",
      error.message
    )

    res.status(500).json({
      message: error.message,
    })
  }
}


// =====================================================
// UPDATE PROFILE
// PUT /api/profile
// =====================================================

const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      username,
      role,
      bio,
      github,
      linkedin,
      leetcode,
      codingProfile,
      email,
      location,
    } = req.body

    const updateData = {}

    if (name !== undefined) {
      updateData.name = name
    }

    if (username !== undefined) {
      updateData.username =
        username
    }

    if (role !== undefined) {
      updateData.role = role
    }

    if (bio !== undefined) {
      updateData.bio = bio
    }

    if (github !== undefined) {
      updateData.github = github
    }

    if (linkedin !== undefined) {
      updateData.linkedin =
        linkedin
    }

    if (leetcode !== undefined) {
      updateData.leetcode =
        leetcode
    }

    if (
      codingProfile !==
      undefined
    ) {
      updateData.codingProfile =
        codingProfile
    }

    if (email !== undefined) {
      updateData.email = email
    }

    if (location !== undefined) {
      updateData.location =
        location
    }

    let profile =
      await Profile.findOne()

    if (!profile) {
      profile =
        await Profile.create(
          updateData
        )
    } else {
      profile =
        await Profile.findByIdAndUpdate(
          profile._id,
          updateData,
          {
            returnDocument: "after",
            runValidators: true,
          }
        )
    }

    res.status(200).json({
      message:
        "Profile updated successfully",
      profile,
    })
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    )

    res.status(400).json({
      message:
        "Failed to update profile",
      error: error.message,
    })
  }
}


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getProfile,
  getGithub,
  getLeetcode,
  updateProfile,
}