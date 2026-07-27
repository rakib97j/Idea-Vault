"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";
import {
  User,
  PlusCircle,
  FolderKanban,
  Heart,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { data: session } = authClient.useSession();
 
  const user = session?.user;


 

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await authClient.signOut();
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User Profile Menu"
        className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all focus:outline-none cursor-pointer group shadow-xs"
      >
        <Avatar.Root className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/40 shadow-xs">
          <Avatar.Image src={user.image} alt={user.name} />
          <Avatar.Fallback className="bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center w-full h-full">
            {user.name ? user.name.charAt(0) : "U"}
          </Avatar.Fallback>
        </Avatar.Root>

        <span className="text-xs font-semibold text-[var(--foreground)] group-hover:text-cyan-500 transition-colors max-w-[100px] truncate hidden sm:inline-block">
          {user.name ? user.name.split(" ")[0] : "User"}
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--secondary)] group-hover:text-cyan-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-cyan-500" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu  */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 p-1.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl z-50 animate-in fade-in-80 zoom-in-95">
          {/* User Info top */}
          <div className="px-3 py-2.5 border-b border-[var(--border)] mb-1 bg-cyan-500/5 rounded-xl">
            <p className="text-sm font-bold text-[var(--foreground)] truncate">
              {user.name}
            </p>
            <p className="text-xs text-[var(--secondary)] truncate font-medium">
              {user.email}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-0.5">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-[var(--foreground)] hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors"
            >
              <User className="w-4 h-4 text-cyan-500" />
              <span>Profile Management</span>
            </Link>

            <Link
              href="/add-idea"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-[var(--foreground)] hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-cyan-500" />
              <span>Add Idea</span>
            </Link>

            <Link
              href="/my-ideas"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-[var(--foreground)] hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors"
            >
              <FolderKanban className="w-4 h-4 text-cyan-500" />
              <span>My Ideas</span>
            </Link>

            <Link
              href="/my-interactions"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-[var(--foreground)] hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors"
            >
              <Heart className="w-4 h-4 text-cyan-500" />
              <span>My Interactions</span>
            </Link>

            <div className="my-1 border-t border-[var(--border)] opacity-60" />

            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
