"use client";

import  { useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  LayoutGrid,
  PlusCircle,
  Bookmark,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
  FaDiscord,
} from "react-icons/fa6";

const platformLinks = [
  { label: "Explore Ideas", href: "/ideas", icon: Lightbulb },
  { label: "Categories", href: "/ideas", icon: LayoutGrid },
  { label: "Submit Idea", href: "/add-idea", icon: PlusCircle },
  { label: "My Ideas", href: "/my-ideas", icon: Bookmark },
  { label: "My Interactions", href: "/my-interactions", icon: MessageCircle },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Community", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Twitter", href: "#", icon: FaXTwitter },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { label: "GitHub", href: "#", icon: FaGithub },
  { label: "Discord", href: "#", icon: FaDiscord },
];

export default function Footer() {
  const [year, setYear] = useState(null);

  

  return (
    <footer className="relative w-full bg-[var(--footer)] border-t border-[var(--border)] overflow-hidden">
     
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

   
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          <div className="lg:col-span-4 space-y-5">
            
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-md shadow-cyan-500/20 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-shadow duration-300">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--foreground)] tracking-tight">
                Idea<span className="text-cyan-500">Vault</span>
              </span>
            </Link>

            <p className="text-sm text-[var(--secondary)] leading-relaxed max-w-xs">
              The platform where brilliant ideas find their community. Share,
              explore, and collaborate on breakthrough concepts that shape the
              future.
            </p>

            {/* Contact  */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-sm text-[var(--secondary)]">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                  <Mail className="w-4 h-4 text-cyan-500" />
                </div>
                <span>contact@ideavault.io</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--secondary)]">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                  <Phone className="w-4 h-4 text-cyan-500" />
                </div>
                <span>01581873146</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--secondary)]">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Platform  */}
          <div className="lg:col-span-3 sm:pl-4 lg:pl-8">
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-[var(--secondary)] hover:text-cyan-500 transition-colors duration-200"
                  >
                    <link.icon className="w-4 h-4 text-[var(--secondary)] group-hover:text-cyan-500 transition-colors duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company needed link */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-[var(--secondary)] hover:text-cyan-500 transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--secondary)] hover:text-cyan-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* send email  */}
            <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-3">
              <p className="text-xs font-semibold text-[var(--foreground)]">
                Stay in the loop
              </p>
              <p className="text-[11px] text-[var(--secondary)] leading-relaxed">
                Get the latest ideas and platform updates delivered to your
                inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2 text-xs rounded-lg bg-[var(--input)] text-[var(--input-foreground)] border border-[var(--border)] placeholder:text-[var(--secondary)] placeholder:opacity-60 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
                <button className="px-3 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-6 h-px bg-[var(--border)]" />

        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--secondary)]">
            <span suppressHydrationWarning>
              © 2026 IdeaVault. All rights reserved.
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              rakib97j
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--secondary)] hover:text-cyan-500 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
