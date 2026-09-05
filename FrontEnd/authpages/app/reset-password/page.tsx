"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, KeyRound, Check, X } from "lucide-react";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password requirements calculation
  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasNumberOrSpecial = /[0-9!@#$%^&*()]/.test(formData.password);
  const passwordScore = [hasMinLength, hasUppercase, hasNumberOrSpecial].filter(Boolean).length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all password fields.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!hasMinLength) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      /* 
       * -------------------------------------------------------------
       * BACKEND INTEGRATION PLACEHOLDER (NestJS)
       * -------------------------------------------------------------
       * Replace this simulation with your NestJS reset password API endpoint:
       * 
       * const response = await fetch("http://localhost:5000/auth/reset-password", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify({
       *     token: formData.token, // or passed via query string
       *     newPassword: formData.password
       *   }),
       * });
       * const data = await response.json();
       * 
       * if (!response.ok) throw new Error(data.message || "Failed to reset password");
       * -------------------------------------------------------------
       */

      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Invalid token or reset request failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
      {/* Container */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl shadow-lg shadow-indigo-500/10">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AuthSystem</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-100 tracking-tight">Set New Password</h1>
          <p className="mt-1.5 text-sm text-slate-400">
            {isSuccess
              ? "Your password has been successfully updated."
              : "Create a new strong password for your account."}
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          {!isSuccess ? (
            <>
              {error && (
                <div id="reset-error-alert" className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Reset Token / Code (Optional input field) */}
                <div>
                  <label htmlFor="token" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Reset Token / Code (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      id="token"
                      name="token"
                      type="text"
                      value={formData.token}
                      onChange={handleChange}
                      placeholder="e.g. 123456 or token from URL"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength */}
                  {formData.password && (
                    <div className="mt-2.5 space-y-2">
                      <div className="flex gap-1.5 h-1.5">
                        <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordScore >= 1 ? "bg-rose-500" : "bg-slate-800"}`}></div>
                        <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordScore >= 2 ? "bg-amber-500" : "bg-slate-800"}`}></div>
                        <div className={`h-full flex-1 rounded-full transition-all duration-300 ${passwordScore >= 3 ? "bg-emerald-500" : "bg-slate-800"}`}></div>
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-400">
                        <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : ""}`}>
                          {hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 text-slate-600" />} 8+ chars
                        </span>
                        <span className={`flex items-center gap-1 ${hasUppercase ? "text-emerald-400" : ""}`}>
                          {hasUppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 text-slate-600" />} Uppercase
                        </span>
                        <span className={`flex items-center gap-1 ${hasNumberOrSpecial ? "text-emerald-400" : ""}`}>
                          {hasNumberOrSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 text-slate-600" />} Num/Symbol
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-sm ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? "border-rose-500/70 focus:ring-rose-500/50"
                          : "border-slate-800 focus:ring-indigo-500/50 focus:border-indigo-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  id="reset-submit-button"
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <span>Reset Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-100">Password Reset Complete!</h2>
                <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">
                  Your password has been reset successfully. You can now log in with your new credentials.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/login"
                  className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all text-center"
                >
                  Sign In Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
