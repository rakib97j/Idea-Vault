"use client";

import React, { useState, useTransition } from "react";
import { 
  Search, 
  X, 
  AlertCircle, 
  Grid, 
  Cpu, 
  Heart, 
  Sparkles, 
  GraduationCap, 
  Coins, 
  Zap, 
  Layers 
} from "lucide-react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import IdeaCard from "./IdeaCard";

const CATEGORIES = [
  { id: "all", label: "All Ideas", icon: Grid, activeColor: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-cyan-500/20" },
  { id: "tech", label: "Tech", icon: Cpu, activeColor: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/20" },
  { id: "health", label: "Health", icon: Heart, activeColor: "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-500/20" },
  { id: "ai", label: "AI", icon: Sparkles, activeColor: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-purple-500/20" },
  { id: "education", label: "Education", icon: GraduationCap, activeColor: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20" },
  { id: "finance", label: "Finance", icon: Coins, activeColor: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-amber-500/20" },
  { id: "productivity", label: "Productivity", icon: Zap, activeColor: "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/20" },
  { id: "other", label: "Other", icon: Layers, activeColor: "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-gray-500/20" },
];

const IdeaSearchShort = ({ initialIdeas = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [, startTransition] = useTransition();

  // Disabling client-side sorting/filtering functionality (backend will handle it)
  const filteredIdeas = initialIdeas;

  const handleReset = () => {
    startTransition(() => {
      setSearchQuery("");
      setSelectedCategory("all");
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar */}
      <div className="bg-white/5 dark:bg-black/10 backdrop-blur-md border border-gray-200/10 dark:border-white/5 rounded-2xl p-4 sm:p-6 shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ideas by title..."
              className="w-full pl-11 pr-10 py-3.5 border border-gray-200/20 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-neutral-900/50 text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {(searchQuery || selectedCategory !== "all") && (
            <Button
              size="md"
              variant="light"
              onClick={handleReset}
              className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-bold border border-red-500/20 dark:border-red-400/10 rounded-xl py-3 px-5 hover:bg-red-500/5 transition-all shrink-0 w-full sm:w-auto"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/*  Category Selection  */}
      <div className="w-full">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start w-full">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-semibold
                  cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95
                  ${isActive 
                    ? `${cat.activeColor} shadow-lg scale-105 border-transparent` 
                    : 'bg-white/5 dark:bg-black/20 border-gray-200/10 dark:border-white/5 text-[var(--secondary)] hover:text-[var(--foreground)] hover:border-gray-200/30'
                  }
                `}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span>{cat.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-current ml-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* N */}
      {(searchQuery || selectedCategory !== "all") && (
        <div className="px-1 text-xs text-gray-400 flex items-center justify-between">
          <span>
            Found {filteredIdeas.length} {filteredIdeas.length === 1 ? "idea" : "ideas"} matching filter
          </span>
          {selectedCategory !== "all" && (
            <span className="font-semibold text-cyan-400 capitalize">
              Category: {selectedCategory}
            </span>
          )}
        </div>
      )}

      {/* Cards Section */}
      <div className="p-4 sm:p-7 bg-primary/5 rounded-xl my-5 min-h-[300px] flex flex-col justify-center transition-all">
        <AnimatePresence mode="popLayout">
          {filteredIdeas.length > 0 ? (
            <motion.div
              layout
              className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
            >
              {filteredIdeas.map((idea) => (
                <motion.div
                  key={idea._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <IdeaCard idea={idea} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-12 px-4 flex flex-col items-center space-y-4 max-w-md mx-auto"
            >
              <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/25 text-cyan-500 animate-bounce">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">No ideas found</h3>
              <p className="text-sm text-[var(--secondary)]">
                We could not find any ideas under <span className="font-semibold text-cyan-400">{selectedCategory}</span> category matching <span className="font-semibold text-cyan-400">{searchQuery}</span>.
              </p>
              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105"
              >
                Clear Search & Reset
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IdeaSearchShort;
