"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate submission
    toast.success("Thank you for connecting! We will get back to you soon.", {
      style: {
        background: "var(--card)",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
      },
      iconTheme: {
        primary: "var(--primary)",
        secondary: "var(--primary-foreground)",
      },
    });

    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      bio: "",
    });
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center space-y-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--foreground)]">
          Lets{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
            Stay Connected
          </span>
        </h2>
        <p className="text-sm md:text-base text-[var(--secondary)] leading-relaxed max-w-xl mx-auto">
          Have questions about showcasing your ideas or joining our startup ecosystem? 
          Fill out the form below and our team will get in touch with you.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 sm:p-10 transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--secondary)]/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Company Input */}
            <div className="space-y-2">
              <label htmlFor="contact-company" className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
                Company <span className="text-[10px] text-[var(--secondary)]/70">(Optional)</span>
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company (optional)"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--secondary)]/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Your email"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--secondary)]/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
                Phone Number
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your Phone Number"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--secondary)]/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Textarea */}
            <div className="sm:col-span-2 space-y-2">
              <label htmlFor="contact-bio" className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
                About Yourself
              </label>
              <textarea
                id="contact-bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                required
                placeholder="Tell us about yourself"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--secondary)]/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          <div className="text-center pt-2 space-y-4">
            <p className="text-xs text-[var(--secondary)] max-w-md mx-auto leading-relaxed">
              By clicking contact us button, you agree to our{" "}
              <a href="#" className="underline hover:text-cyan-500 transition-colors">
                terms and policy
              </a>
              .
            </p>
            <button
              type="submit"
              className="px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:bg-[var(--btn-hover)] hover:shadow-xl hover:shadow-cyan-500/30 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
