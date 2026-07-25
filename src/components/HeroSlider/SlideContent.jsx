"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 16, delay: 0.3 },
  },
};

export default function SlideContent({ slide, isActive }) {
  return (
    <div className="w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[600px] flex items-center py-10 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Side*/}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:col-span-7 flex flex-col justify-center items-start text-left space-y-5 sm:space-y-6 z-10"
            >
              
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border border-[var(--border)] shadow-md slide-badge-bg"
              >
                <span
                  className={`text-xs font-mono font-bold tracking-wider uppercase
                  bg-gradient-to-r ${slide.accentFrom} ${slide.accentTo} bg-clip-text text-transparent`}
                >
                  {slide.badge}
                </span>
              </motion.div>

              
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[var(--foreground)] tracking-tight leading-[1.1] font-sans"
              >
                {slide.titleNormal}
                <span
                  className={`bg-gradient-to-r ${slide.accentFrom} ${slide.accentTo} bg-clip-text text-transparent block mt-2`}
                >
                  {slide.titleGradient}
                </span>
              </motion.h1>

              
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base lg:text-lg text-[var(--secondary)] max-w-xl font-normal leading-relaxed p-3 rounded-xl backdrop-blur-sm slide-desc-bg"
              >
                {slide.description}
              </motion.p>

              
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
              >
                <Link href={slide.primaryHref}>
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${slide.accentFrom} ${slide.accentTo}
                      text-white font-bold shadow-lg transition-all duration-300
                      flex items-center gap-2 group border-0 rounded-xl
                      w-full sm:w-auto hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    <span>{slide.primaryBtn}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href={slide.secondaryHref}>
                  <Button
                    size="lg"
                    variant="bordered"
                    className="text-[var(--foreground)] font-medium border border-[var(--border)] hover:border-[var(--primary)] backdrop-blur-md transition-all duration-300 rounded-xl w-full sm:w-auto flex items-center gap-2 slide-secondary-btn"
                  >
                    <span>{slide.secondaryBtn}</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--secondary)]" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Hero Image */}
        <div className="lg:col-span-5 flex justify-center items-center relative w-full">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                key={slide.id}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative w-full max-w-[520px]"
              >
                
                <div
                  className="absolute inset-0 blur-[80px] rounded-full opacity-40 dark:opacity-30 scale-110"
                  style={{
                    background: slide.glowColor,
                  }}
                />

                
                <div
                  className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl backdrop-blur-sm slide-image-frame"
                >
                  <Image
                    src={slide.image}
                    alt={slide.titleNormal + slide.titleGradient}
                    width={640}
                    height={400}
                    priority
                    className="w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] object-cover"
                  />


                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                
                <motion.div
                  animate={isActive ? { y: [0, -10, 0] } : { y: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full blur-sm opacity-60"
                  style={{ background: slide.glowColor }}
                />
                <motion.div
                  animate={isActive ? { y: [0, 8, 0] } : { y: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full blur-sm opacity-40"
                  style={{ background: slide.glowColor }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
