"use client";

import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Mobile & Tablet Layout  */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <MobileDrawer />
          <NavLogo />
          <ThemeToggle />
        </div>

        {/* Desktop Layout  */}
        <div className="hidden lg:flex items-center justify-between w-full relative">
          <NavLogo />
          <DesktopNav />
        </div>
      </div>
    </header>
  );
}
