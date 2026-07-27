"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "photoUrl") {
      setPhotoError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // better auth

    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries());
   

    const {data ,error} = await authClient.signUp.email({
      email : user.email ,
      image : user.image ,
      name : user.name ,
      password :user.password ,

    })
    


    if(data){
      redirect('/')
    }
    if(error){
      toast.error("Please fill in all required fields.");
    }
   

   

    const { password } = user;
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (!minLength || !hasUppercase || !hasLowercase) {
      toast.error(
        "Password must be at least 6 characters long and include both uppercase and lowercase letters.",
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully! Welcome aboard.");
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
          Create an Account
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Fill in your details to get started with Idea Vault
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="reg-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <User className="w-4 h-4" />
            </div>
            <input
              id="reg-name"
              name="name" 
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Jane Doe"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="reg-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="reg-email"
              name="email" 
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="jane@example.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Photo URL Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="reg-photourl"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Photo URL
          </label>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
                <ImageIcon className="w-4 h-4" />
              </div>
              <input
                id="reg-photourl"
                name="image" 
                type="url"
                value={formData.photoUrl}
                onChange={(e) => handleChange("photoUrl", e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-sm"
              />
            </div>

            {/* Live Avatar Preview */}
            <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
              {formData.photoUrl && !photoError ? (
                
                <Image
                  src={formData.photoUrl}
                  alt="Avatar Preview"
                  onError={() => setPhotoError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </div>
          {photoError && (
            <p className="text-[11px] text-rose-500 pl-1">
              Could not load image from provided URL
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="reg-password"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="reg-password"
              name="password" 
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Create strong password"
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

        {/* Submit Register Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
        <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-slate-400 font-medium">
          or sign up with
        </span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
      </div>

      {/* Google Sign Up */}
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

      {/* Link to Login */}
      <div className="pt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline transition-colors ml-1 inline-flex items-center gap-0.5"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
