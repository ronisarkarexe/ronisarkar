"use client";

import { useState, useEffect } from "react";

export interface RepoStats {
  stars: number;
  forks: number;
  contributors: number;
  openIssues: number;
  description?: string;
  topics?: string[];
  updatedAt?: string;
  error?: boolean;
}

export interface GithubStatsMap {
  [key: string]: RepoStats;
}

interface UseGithubStatsResult {
  stats: GithubStatsMap | null;
  loading: boolean;
  error: boolean;
}

export function useGithubStats(): UseGithubStatsResult {
  const [stats, setStats] = useState<GithubStatsMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (!res.ok) throw new Error("Failed");
        const data: GithubStatsMap = await res.json();
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}
