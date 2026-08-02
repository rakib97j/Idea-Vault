
import React from "react";

export default function PartnersLogo() {
  return (
    <section>
      <div className="text-center pb-4">
          <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
            Our Valuable Partners
          </span>
        </div>
      <section className="w-full bg-[var(--card)] border-y border-[var(--border)] py-7 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 dark:opacity-80">
         
          {/* Y Combinator */}
          <div className="flex items-center gap-2.5 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <svg
              className="w-8 h-8 rounded-md"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" fill="#FF6600" />
              <path
                d="M32 28H40L50 49L60 28H68L54 57V76H46V57L32 28Z"
                fill="white"
              />
            </svg>
            <span className="hover:text-[#FF6600] font-extrabold text-[var(--foreground)] text-lg tracking-tight">
              Combinator
            </span>
          </div>

          {/* Product Hunt */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <svg
              className="w-9 h-9"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#DA552F" />
              <path
                d="M17 11H22.5C25.08 11 27 12.8 27 15.5C27 18.2 25.08 20 22.5 20H19.5V29H17V11ZM19.5 17.5H22.5C23.6 17.5 24.5 16.7 24.5 15.5C24.5 14.3 23.6 13.5 22.5 13.5H19.5V17.5Z"
                fill="white"
              />
            </svg>
            <span className="hover:text-[#DA552F] font-bold  text-[var(--foreground)] text-lg tracking-tight">
              Product Hunt
            </span>
          </div>

          {/* Techstars */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <svg
              className="w-8 h-8 text-[#00A1E0]"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 22h20L12 2zm0 4.8L18.6 18H5.4L12 6.8z" />
            </svg>
            <span className="font-black hover:text-[#00A1E0] text-[var(--foreground)] text-lg tracking-wide uppercase">
              techstars
            </span>
          </div>

          {/* Indie Hackers */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#0d1b2a] flex items-center justify-center border border-gray-700">
              <span className="text-rose-500 font-extrabold text-base italic">IH</span>
            </div>
            <span className="font-bold text-[var(--foreground)] hover:text-rose-500 text-lg tracking-tight">
              97J Hackers
            </span>
          </div>

          {/* Kickstarter */}
          <div className="flex items-center gap-2.5 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <svg
              className="w-8 h-8"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="#05CE78" />
              <path
                d="M32 30H42V45L58 30H70L52 48L72 70H60L42 51V70H32V30Z"
                fill="white"
              />
            </svg>
            <span className="hover:text-[#05CE78] font-black text-[var(--foreground)] text-lg tracking-tight">
              KICKSTARTER
            </span>
          </div>

          {/* Crunchbase */}
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <svg
              className="w-8 h-8 text-[#0073B1]"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2v6zm0-8h-2V6h2v2z" />
            </svg>
            <span className="hover:text-[#0073B1] font-bold text-[var(--foreground)] text-lg tracking-tight">
              crunchbase
            </span>
          </div>

        </div>
      </div>
    </section>
    </section>
  );
}
