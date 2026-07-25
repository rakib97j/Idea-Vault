import React from 'react';

const StartupInnovation = () => {
    return (
      <section className="relative w-full max-w-7xl mx-auto px-6 py-20">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--foreground)] via-[var(--secondary)] to-[var(--foreground)] bg-clip-text text-transparent">
            Empowering Innovation. Inspiring Community.
          </h2>
          <p className="text-sm md:text-base text-[var(--secondary)] leading-relaxed max-w-2xl mx-auto">
            Share groundbreaking startup ideas, discover innovative solutions,
            and connect with a global community of entrepreneurs, creators, and
            visionaries. Turn bold concepts into real-world impact with
            IdeaVault.
          </p>
        </div>
      </section>
    );
};

export default StartupInnovation;