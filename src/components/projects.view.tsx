"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";

const projects = [
  {
    name: "First-Issue",
    description:
      "Open-source platform for beginners to discover and contribute to OSS. Manages 20+ repositories with issue difficulty tiers, making open source more accessible.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS", "ExpressJS"],
    links: {
      github: "https://github.com/ronisarkarexe",
      live: "#",
    },
    highlight: true,
    badge: "Open Source",
  },
  {
    name: "Story Spark AI",
    description:
      "AI-powered story generator where users receive 2–3 unique stories per prompt, with real-time streaming, edit & publish capabilities.",
    tags: ["React", "TypeScript", "OpenAI", "Socket.io", "Node.js", "MongoDB", "TailwindCSS"],
    links: {
      github: "https://github.com/ronisarkarexe",
    },
    highlight: false,
    badge: "AI / LLM",
  },
  {
    name: "Remit & Go",
    description:
      "Cross-border finance & remittance mobile app backend. Features multi-gateway payments, ERC-20 smart contracts, wallet system, and real-time WebSocket notifications.",
    tags: ["NestJS", "PostgreSQL", "Redis", "BullMQ", "Stripe", "Web3", "Ethereum", "WebSocket"],
    links: {},
    highlight: false,
    badge: "Fintech · Work",
  },
  {
    name: "PDF Annotation Platform",
    description:
      "Full-stack PDF annotation tool with collaborative session management, built from scratch for The Boring People. Features REST API backend and interactive frontend.",
    tags: ["Next.js", "TypeScript", "Flask", "Python", "MongoDB"],
    links: {},
    highlight: false,
    badge: "Client Project",
  },
];

const ProjectsView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((project, index) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col ${
            project.highlight
              ? "border-cyan-500/25 bg-cyan-500/5 hover:border-cyan-500/40"
              : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
          }`}
        >
          {/* Badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400">
              {project.badge}
            </span>
            <div className="flex items-center gap-2">
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
              {project.links.live && project.links.live !== "#" && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                  title="Live"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {project.name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

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
      ))}
    </div>
  );
};

export default ProjectsView;
