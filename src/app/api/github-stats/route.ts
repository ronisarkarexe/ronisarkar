import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour, auto-refreshes

const REPOS = [
  {
    key: "story-spark-ai",
    owner: "ronisarkarexe",
    repo: "story-spark-ai",
  },
  {
    key: "first-issue",
    owner: "ronisarkarexe",
    repo: "first-issue",
  },
];

async function fetchRepoStats(owner: string, repo: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  const [repoRes, contributorsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&anon=0`,
      { headers, next: { revalidate: 3600 } }
    ),
  ]);

  if (!repoRes.ok) {
    return { stars: 0, forks: 0, contributors: 0, openIssues: 0, error: true };
  }

  const repoData = await repoRes.json();
  let contributorCount = 0;

  if (contributorsRes.ok) {
    const contributors = await contributorsRes.json();
    contributorCount = Array.isArray(contributors) ? contributors.length : 0;
  }

  return {
    stars: repoData.stargazers_count ?? 0,
    forks: repoData.forks_count ?? 0,
    openIssues: repoData.open_issues_count ?? 0,
    contributors: contributorCount,
    description: repoData.description ?? "",
    topics: repoData.topics ?? [],
    updatedAt: repoData.updated_at ?? null,
  };
}

export async function GET() {
  try {
    const results = await Promise.all(
      REPOS.map(async ({ key, owner, repo }) => {
        const stats = await fetchRepoStats(owner, repo);
        return [key, stats] as const;
      })
    );

    const data = Object.fromEntries(results);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
