"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

const colorMap: Record<string, { border: string; badge: string; text: string }> = {
  cyan: {
    border: "hover:border-cyan-500/30",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    text: "text-cyan-400",
  },
  violet: {
    border: "hover:border-violet-500/30",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    text: "text-violet-400",
  },
  orange: {
    border: "hover:border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    text: "text-orange-400",
  },
  emerald: {
    border: "hover:border-emerald-500/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    text: "text-emerald-400",
  },
  pink: {
    border: "hover:border-pink-500/30",
    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    text: "text-pink-400",
  },
  blue: {
    border: "hover:border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    text: "text-blue-400",
  },
};

const BlogView = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post, index) => {
          const colors = colorMap[post.color];
          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className={`group relative p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] ${colors.border} transition-all duration-300 flex flex-col h-full cursor-pointer ${
                  post.comingSoon
                    ? "opacity-70 hover:opacity-80"
                    : "hover:bg-white/[0.04]"
                }`}
              >
                {post.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-500">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full border ${colors.badge}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-cyan-300 transition-colors flex-1">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    {post.comingSoon ? "Preview" : "Read"}
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-slate-600 text-sm mt-8"
      >
        More posts being written. Come back soon.
      </motion.p>
    </div>
  );
};

export default BlogView;
