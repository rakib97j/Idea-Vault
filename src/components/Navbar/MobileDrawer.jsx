"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Button, Separator, Avatar } from "@heroui/react";
import NavLogo from "./NavLogo";
import {
  Menu,
  X,
  Home,
  Lightbulb,
  PlusCircle,
  FolderKanban,
  Heart,
  User,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session;
  const user = session?.user;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Drawer.Root isOpen={isOpen} onOpenChange={setIsOpen}>
      
      <Drawer.Trigger
        as={Button}
        isIconOnly
       
        aria-label="Open Navigation Menu"
        className="w-10 h-10  transition-all  cursor-pointer"
      >
        <Menu className=" text-[var(--foreground)]" />
      </Drawer.Trigger>

      {/* main part in dropdown */}
      <Drawer.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
        <Drawer.Content
          placement="left"
          className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-[var(--card)] border-r border-[var(--border)] shadow-2xl flex flex-col focus:outline-none"
        >
          <Drawer.Dialog className="flex flex-col h-full focus:outline-none">
            {/* Header */}
            <Drawer.Header className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <Drawer.Heading className="flex items-center">
                <NavLogo />
              </Drawer.Heading>

              {/* Drawer off Trigger */}
              <Drawer.CloseTrigger
                as={Button}
                isIconOnly
                variant="ghost"
                aria-label="Close menu"
                className="w-8 h-8 rounded-lg text-[var(--secondary)] hover:text-[var(--foreground)] hover:bg-cyan-500/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            {/* Navigation  */}
            <Drawer.Body className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {/* User Profile Info Card if logged in */}
              {isLoggedIn && user && (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar.Root className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0">
                      <Avatar.Image
                        src={user.image}
                        alt={user.name}
                      />
                      <Avatar.Fallback className="bg-cyan-500 text-white font-bold text-sm flex items-center justify-center w-full h-full">
                        {user.name ? user.name.charAt(0) : "U"}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-bold text-[var(--foreground)] truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-[var(--secondary)] truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Navigation Links */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--secondary)] mb-2">
                  Navigation
                </p>

                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    pathname === "/"
                      ? "bg-cyan-500/15 text-cyan-500 font-semibold"
                      : "text-[var(--foreground)]/80 hover:text-cyan-500 hover:bg-cyan-500/5"
                  }`}
                >
                  <Home className="w-4.5 h-4.5 text-[var(--secondary)]" />
                  <span>Home</span>
                </Link>

                <Link
                  href="/ideas"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    pathname.startsWith("/ideas")
                      ? "bg-cyan-500/15 text-cyan-500 font-semibold"
                      : "text-[var(--foreground)]/80 hover:text-cyan-500 hover:bg-cyan-500/5"
                  }`}
                >
                  <Lightbulb className="w-4.5 h-4.5 text-[var(--secondary)]" />
                  <span>Ideas</span>
                </Link>
              </div>

              <Separator className="my-2 border-t border-[var(--border)] opacity-60" />

              {/*  Private Options */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--secondary)] mb-2">
                  Features
                </p>

                <Link
                  href="/add-idea"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    pathname === "/add-idea"
                      ? "bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/20"
                      : "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
                  }`}
                >
                  <PlusCircle className="w-4.5 h-4.5" />
                  <span>Add Idea</span>
                </Link>

                <Link
                  href="/my-ideas"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    pathname === "/my-ideas"
                      ? "bg-cyan-500/15 text-cyan-500 font-semibold"
                      : "text-[var(--foreground)]/80 hover:text-cyan-500 hover:bg-cyan-500/5"
                  }`}
                >
                  <FolderKanban className="w-4.5 h-4.5 text-[var(--secondary)]" />
                  <span>My Ideas</span>
                </Link>

                <Link
                  href="/my-interactions"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    pathname === "/my-interactions"
                      ? "bg-cyan-500/15 text-cyan-500 font-semibold"
                      : "text-[var(--foreground)]/80 hover:text-cyan-500 hover:bg-cyan-500/5"
                  }`}
                >
                  <Heart className="w-4.5 h-4.5 text-[var(--secondary)]" />
                  <span>My Interactions</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    pathname === "/profile"
                      ? "bg-cyan-500/15 text-cyan-500 font-semibold"
                      : "text-[var(--foreground)]/80 hover:text-cyan-500 hover:bg-cyan-500/5"
                  }`}
                >
                  <User className="w-4.5 h-4.5 text-[var(--secondary)]" />
                  <span>Profile Management</span>
                </Link>
              </div>

              <Separator className="my-2 border-t border-[var(--border)] opacity-60" />

              {/* Dynamic Auth Section */}
              {isLoggedIn ? (
                <Button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>Log Out</span>
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-[var(--secondary)]">
                      Account
                    </span>
                  </div>

                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-medium text-sm border border-[var(--border)] text-[var(--foreground)] hover:bg-cyan-500/5 transition-all"
                  >
                    <LogIn className="w-4.5 h-4.5" />
                    <span>Login</span>
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-teal-500 shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <UserPlus className="w-4.5 h-4.5" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer.Root>
  );
}
