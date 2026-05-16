"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Briefcase,
  Clock,
  Globe,
  MessageSquare,
} from "lucide-react";

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
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 space-y-4"
      >
        {/* Status card */}
        <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
            <span className="text-green-400 text-sm font-medium">Available for freelance</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Current Role</p>
                <p className="text-white font-medium text-sm">SWE I @ Nagorik Technologies</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Timezone</p>
                <p className="text-white font-medium text-sm">UTC+6 · Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Response Time</p>
                <p className="text-white font-medium text-sm">Usually within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Let's talk card */}
        <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-bold text-white">Let&apos;s Talk</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Whether it&apos;s a freelance project, a full-time opportunity, a
            collaboration, or just a technical discussion — I&apos;m always happy
            to connect. Drop me a message and I&apos;ll get back to you.
          </p>
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
