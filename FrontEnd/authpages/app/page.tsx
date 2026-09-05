"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, LogIn, UserPlus, KeyRound, Lock, ArrowRight, Code, Terminal, CheckCircle2, Sparkles } from "lucide-react";

export default function HomePage() {
  const pages = [
    {
      title: "Login Page",
      description: "User sign-in with email/password, password visibility toggle, remember me option, & social buttons.",
      href: "/login",
      icon: LogIn,
      badge: "Ready",
      color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-400",
    },
    {
      title: "Register Page",
      description: "Sign-up form with real-time password strength meter, confirmation matching, & terms checkbox.",
      href: "/register",
      icon: UserPlus,
      badge: "Ready",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400",
    },
    {
      title: "Forgot Password Page",
      description: "Password reset request flow with email input, success confirmation, & resend functionality.",
      href: "/forgot-password",
      icon: KeyRound,
      badge: "Ready",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
    },
    {
      title: "Reset Password Page",
      description: "New password setup with token support, strength validation, & completion confirmation.",
      href: "/reset-password",
      icon: Lock,
      badge: "Ready",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-12 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Next.js Frontend Auth Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 max-w-2xl">
            Authentication UI Pages for Your App
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            All authentication screens are created & configured in <span className="text-indigo-300 font-medium">FrontEnd/authpages</span>, pre-styled with Tailwind CSS and structured for easy NestJS backend wiring.
          </p>
        </div>

        {/* Auth Pages Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group relative bg-slate-900/80 hover:bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br border rounded-xl ${page.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold rounded-full">
                      {page.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {page.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {page.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Open Page Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Integration Instructions Card */}
        <div className="mt-10 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Connecting to your NestJS Backend</h2>
              <p className="text-xs text-slate-400">Endpoints guide for your backend integration</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between">
              <span className="text-indigo-400">POST /auth/login</span>
              <span className="text-slate-500 font-sans text-[11px]">app/login/page.tsx</span>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between">
              <span className="text-indigo-400">POST /auth/register</span>
              <span className="text-slate-500 font-sans text-[11px]">app/register/page.tsx</span>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between">
              <span className="text-indigo-400">POST /auth/forgot-password</span>
              <span className="text-slate-500 font-sans text-[11px]">app/forgot-password/page.tsx</span>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between">
              <span className="text-indigo-400">POST /auth/reset-password</span>
              <span className="text-slate-500 font-sans text-[11px]">app/reset-password/page.tsx</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-500 border-t border-slate-900 pt-6">
        <p>Built with Next.js 16 (App Router), React 19 & Tailwind CSS</p>
      </footer>
    </div>
  );
}
