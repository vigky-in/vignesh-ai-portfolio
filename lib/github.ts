// Fetches live public stats from GitHub's REST API — no auth needed,
// cached for 1 hour (revalidate) so we don't hit GitHub's rate limit
// (60 unauthenticated requests/hour per IP) on every page load.

type LiveGithubStats = {
  publicRepos: number;
  followers: number;
  topLanguages: string[];
} | null;

export async function fetchLiveGithubStats(username: string): Promise<LiveGithubStats> {
  if (!username) return null;

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!userRes.ok) return null;
    const user = await userRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } }
    );
    const repos = reposRes.ok ? await reposRes.json() : [];

    const langCounts: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang]) => lang);

    return {
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      topLanguages,
    };
  } catch {
    return null; // fall back to manually-entered admin values
  }
}
