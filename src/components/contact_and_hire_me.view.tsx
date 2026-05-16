"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  MessageSquare,
  Code2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ronichandrasarkar@gmail.com",
    href: "mailto:ronichandrasarkar@gmail.com",
    color: "cyan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ronisarkar76",
    href: "https://www.linkedin.com/in/ronisarkar76/",
    color: "blue",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ronisarkarexe",
    href: "https://github.com/ronisarkarexe",
    color: "violet",
  },
  {
    icon: Code2,
    label: "LeetCode",
    value: "leetcode.com/u/ronisarkar",
    href: "https://leetcode.com/u/ronisarkar",
    color: "orange",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Uttara Sector 9, Dhaka, Bangladesh",
    href: null,
    color: "emerald",
  },
];

const colorMap: Record<string, string> = {
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const ContactMeView = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:ronichandrasarkar@gmail.com?subject=Portfolio Contact - ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`;
    window.open(mailtoLink, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left: Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 space-y-4"
      >
        <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Let&apos;s Connect</h3>
              <p className="text-slate-500 text-xs">Always open to new projects</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just connecting with fellow engineers. Currently{" "}
            <span className="text-cyan-400">available for freelance work</span> outside
            of my full-time role.
          </p>
        </div>

        <div className="space-y-2">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            const colors = colorMap[info.color];
            const content = (
              <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${colors} hover:opacity-80`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-slate-600 text-xs">{info.label}</p>
                  <p className="text-sm text-white truncate">{info.value}</p>
                </div>
              </div>
            );
            return info.href ? (
              <a
                key={info.label}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <div key={info.label}>{content}</div>
            );
          })}
        </div>
      </motion.div>

      {/* Right: Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-3"
      >
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-4"
        >
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="Tell me about your project or opportunity..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            {submitted ? (
              "Message sent! ✓"
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactMeView;
