"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getBlogPost, type Block } from "@/data/blog-posts";

const colorMap: Record<string, { badge: string; heading: string }> = {
  cyan: { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25", heading: "text-cyan-400" },
  violet: { badge: "bg-violet-500/10 text-violet-400 border-violet-500/25", heading: "text-violet-400" },
  orange: { badge: "bg-orange-500/10 text-orange-400 border-orange-500/25", heading: "text-orange-400" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", heading: "text-emerald-400" },
  pink: { badge: "bg-pink-500/10 text-pink-400 border-pink-500/25", heading: "text-pink-400" },
  blue: { badge: "bg-blue-500/10 text-blue-400 border-blue-500/25", heading: "text-blue-400" },
};

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={index} className="text-slate-300 leading-relaxed text-[15px]">
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2
          key={index}
          className="text-2xl font-bold text-white mt-10 mb-3 first:mt-0"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3
          key={index}
          className="text-xl font-semibold text-slate-100 mt-6 mb-2"
        >
          {block.text}
        </h3>
      );

    case "code":
      return (
        <div key={index} className="my-5 rounded-xl overflow-hidden border border-white/[0.08]">
          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.06]">
            <span className="text-xs text-slate-500 font-mono">{block.lang}</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>
          <pre className="p-5 bg-[#0d1117] overflow-x-auto">
            <code className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre">
              {block.code}
            </code>
          </pre>
        </div>
      );

    case "ul":
      return (
        <ul key={index} className="space-y-2 my-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-slate-300 text-[15px] leading-relaxed">
              <span className="text-cyan-500 mt-1 flex-shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div
          key={index}
          className="my-4 px-5 py-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-sm leading-relaxed"
        >
          <span className="font-semibold">💡 </span>
          {block.text}
        </div>
      );

    case "divider":
      return (
        <hr
          key={index}
          className="my-8 border-t border-white/[0.07]"
        />
      );

    default:
      return null;
  }
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#050816" }}
      >
        <p className="text-slate-400 mb-4">Post not found.</p>
        <button
          onClick={() => router.push("/")}
          className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to portfolio
        </button>
      </div>
    );
  }

  const colors = colorMap[post.color] ?? colorMap.cyan;

  if (post.comingSoon) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: "#050816" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="text-5xl mb-6">✍️</div>
          <h1 className="text-2xl font-bold text-white mb-3">{post.title}</h1>
          <p className="text-slate-400 text-sm mb-6">{post.excerpt}</p>
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-500 text-sm mb-8">
            Coming Soon
          </span>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-full border ${colors.badge}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => router.push("/#blog")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050816" }}>
      {/* Back nav */}
      <div className="sticky top-0 z-40 border-b border-white/[0.05] bg-[#050816]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <button
            onClick={() => router.push("/#blog")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </button>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-full border ${colors.badge} flex items-center gap-1`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
            {post.title}
          </h1>

          <p className="text-slate-400 text-base leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 pb-8 border-b border-white/[0.07]">
            <span className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center text-xs font-bold text-slate-900">
                R
              </div>
              Roni Sarkar
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-5"
        >
          {post.content.map((block, i) => renderBlock(block, i))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-10 border-t border-white/[0.07]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <div>
              <p className="font-semibold text-white mb-1">Enjoyed this post?</p>
              <p className="text-slate-500 text-sm">
                Let&apos;s connect and talk engineering.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="mailto:ronichandrasarkar@gmail.com"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold text-sm transition-colors"
              >
                Get in touch
              </a>
              <button
                onClick={() => router.push("/#blog")}
                className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-slate-300 text-sm transition-colors"
              >
                More posts
              </button>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
