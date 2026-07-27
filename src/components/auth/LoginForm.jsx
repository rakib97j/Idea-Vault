"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries());
     const {data ,error} = await authClient.signIn.email({
          email : user.email ,
          password :user.password ,
    
        })
       

        
    if (data) {
      toast.success("Successfully logged in!");
      redirect("/");
    }
    if (error) {
      toast.error("Please fill in all required fields.");
    }
   
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const handleGoogleLogin = async () => {

      await authClient.signIn.social({
        provider: "google",
      });


    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast.success("Redirecting to Google Authentication...");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 sm:p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-2xl shadow-slate-900/10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Welcome Back !
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Password Input Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Password
            </label>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast("Forgot password link clicked");
              }}
              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline hover:text-cyan-500 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="login-password"
              name="password" 
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-11 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
        <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-slate-400 font-medium">
          or continue with
        </span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
      </div>

      {/* Google Login Only */}
      <div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full py-3 px-4 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 font-medium rounded-2xl shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
        >
          {isGoogleLoading ? (
            <div className="w-5 h-5 border-2 border-slate-400/30 border-t-slate-600 dark:border-t-slate-200 rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google</span>
            </>
          )}
        </button>
      </div>

      {/* Link to Registration */}
      <div className="pt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline transition-colors ml-1 inline-flex items-center gap-0.5"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
