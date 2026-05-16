"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Users, CircleDot } from "lucide-react";
import { useGithubStats } from "@/hooks/useGithubStats";

const projects = [
  {
    name: "Story Spark AI",
    repoKey: "story-spark-ai",
    description:
      "Open-source AI-powered story generator. Users get 2–3 unique story variations per prompt with real-time streaming, edit & publish capabilities.",
    tags: ["React", "TypeScript", "OpenAI", "Socket.io", "Node.js", "MongoDB", "TailwindCSS"],
    links: {
      github: "https://github.com/ronisarkarexe/story-spark-ai",
      live: "https://storysparkai.vercel.app",
    },
    gssoc: true,
    badge: "Open Source · GSSoC 2026",
    highlight: true,
    badgeColor: "cyan",
  },
  {
    name: "First-Issue",
    repoKey: "first-issue",
    description:
      "Open-source platform for beginners to discover and contribute to OSS. Manages 20+ repositories with difficulty-tiered issues.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS", "ExpressJS"],
    links: {
      github: "https://github.com/ronisarkarexe/first-issue",
    },
    gssoc: false,
    badge: "Open Source",
    highlight: false,
    badgeColor: "violet",
  },
  {
    name: "Remit & Go",
    repoKey: null,
    description:
      "Cross-border finance & remittance mobile app backend. Multi-gateway payments (Stripe, Fin.com, Transfi), ERC-20 smart contracts, wallet system, real-time WebSocket notifications.",
    tags: ["NestJS", "PostgreSQL", "Redis", "BullMQ", "Stripe", "Web3", "Ethereum", "WebSocket"],
    links: {},
    gssoc: false,
    badge: "Fintech · Work",
    highlight: false,
    badgeColor: "orange",
  },
  {
    name: "PDF Annotation Platform",
    repoKey: null,
    description:
      "Full-stack PDF annotation tool with collaborative session management. Built from scratch with Next.js frontend and Flask REST API backend.",
    tags: ["Next.js", "TypeScript", "Flask", "Python", "MongoDB"],
    links: {},
    gssoc: false,
    badge: "Client Project",
    highlight: false,
    badgeColor: "emerald",
  },
];

const badgeColors: Record<string, string> = {
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  violet: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

function StatPill({
  icon: Icon,
  value,
  label,
  loading,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  loading: boolean;
}) {
  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/[0.07] text-xs text-slate-400"
      title={label}
    >
      <Icon className="w-3 h-3" />
      {loading ? (
        <span className="w-5 h-3 rounded bg-white/10 animate-pulse inline-block" />
      ) : (
        <span className="font-medium text-white">{value}</span>
      )}
      <span className="text-slate-600 hidden sm:inline">{label}</span>
    </div>
  );
}

const ProjectsView = () => {
  const { stats, loading } = useGithubStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((project, index) => {
        const repoStats = project.repoKey ? stats?.[project.repoKey] : null;
        const isLoading = loading && !!project.repoKey;

        return (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col ${
              project.highlight
                ? "border-cyan-500/25 bg-cyan-500/[0.04] hover:border-cyan-500/40"
                : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
            }`}
          >
            {/* GSSoC ribbon */}
            {project.gssoc && (
              <div className="absolute -top-px left-5 right-5 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            )}

            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    badgeColors[project.badgeColor]
                  }`}
                >
                  {project.badge}
                </span>
                {project.gssoc && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    GSSoC &apos;26
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white transition-colors"
                    title="Live site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Live GitHub stats — only for tracked repos */}
            {project.repoKey && (
              <div className="flex flex-wrap gap-2 mb-4">
                <StatPill
                  icon={Star}
                  value={repoStats?.stars ?? 0}
                  label="stars"
                  loading={isLoading}
                />
                <StatPill
                  icon={GitFork}
                  value={repoStats?.forks ?? 0}
                  label="forks"
                  loading={isLoading}
                />
                <StatPill
                  icon={Users}
                  value={repoStats?.contributors ?? 0}
                  label="contributors"
                  loading={isLoading}
                />
                <StatPill
                  icon={CircleDot}
                  value={repoStats?.openIssues ?? 0}
                  label="open issues"
                  loading={isLoading}
                />
              </div>
            )}

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white/5 text-slate-500 border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectsView;
