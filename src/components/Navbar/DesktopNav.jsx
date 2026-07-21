"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import ThemeToggle from "./ThemeToggle";
import UserProfileDropdown from "./UserProfileDropdown";
import { PlusCircle } from "lucide-react";

export default function DesktopNav() {
  const pathname = usePathname();
  
  // Set to `true` when user is logged in (shows Profile Dropdown),
  // or `false` when logged out (shows Login/Register buttons).
  // WHEN INTEGRATING BETTER AUTH / NEXTAUTH:
  // Replace this state with your auth hook, e.g. const { session } = useSession(); const isLoggedIn = !!session;
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Navigation Links
  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Ideas", href: "/ideas" },
  ];

  const privateLinks = [
    { label: "Add Idea", href: "/add-idea", isAction: true },
    { label: "My Ideas", href: "/my-ideas" },
    { label: "My Interactions", href: "/my-interactions" },
  ];

  return (
    <>
      
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-0.5 lg:space-x-1 bg-[var(--card)]/90 backdrop-blur-md px-2 lg:px-3 py-1 lg:py-1.5 rounded-full border border-[var(--border)] shadow-xs">
       
        {publicLinks.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-2.5 lg:px-3.5 xl:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                isActive
                  ? "text-cyan-500 font-semibold bg-cyan-500/10 shadow-xs"
                  : "text-[var(--foreground)]/80 hover:text-cyan-500 hover:bg-cyan-500/5"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50" />
              )}
            </Link>
          );
        })}

        <div className="w-px h-4 bg-[var(--border)] mx-1 opacity-60" />

        {/* active Links */}
        {privateLinks.map((item) => {
          const isActive = pathname.startsWith(item.href);

          if (item.isAction) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 lg:gap-1.5 px-2.5 lg:px-3.5 py-1 lg:py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span>{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-2.5 lg:px-3.5 xl:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                isActive
                  ? "text-cyan-500 font-semibold bg-cyan-500/10"
                  : "text-[var(--foreground)]/80 hover:text-cyan-500 hover:bg-cyan-500/5"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-3 ml-auto">
        {/* demo account */}
        <Button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          title="Click to toggle Auth state demo"
          className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 transition-all border border-cyan-500/20 cursor-pointer"
        >
          {isLoggedIn ? "Logged In" : "Logged Out"}
        </Button>

        <ThemeToggle />

        {/* profile login register btn */}
        {isLoggedIn ? (
          <UserProfileDropdown />
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/login">
              <Button
                variant="outline"
                className="px-4 py-2 text-sm font-medium rounded-xl border border-[var(--border)] text-[var(--foreground)] hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
              >
                Login
              </Button>
            </Link>

            <Link href={"/sign-up"}>
              <Button className="px-4.5 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-md shadow-cyan-500/20 hover:shadow-lg transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
