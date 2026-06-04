"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const PARTNERS_LIST = [
  { src: "/partner-logo-1.png", alt: "Collabera" },
  { src: "/partner-logo-3.png", alt: "H&H Insurance" },
  { src: "/partner-logo-4.png", alt: "CSI" },
  { src: "/partner-logo-5.png", alt: "RKS" },
  { src: "/partner-logo-6.png", alt: "Cadila" },
  { src: "/partner-logo-8.png", alt: "Pfizer" },
  { src: "/partner-logo-9.png", alt: "Technology Partner" }
];

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* Subtle light-blue/purple background glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(29, 112, 184, 0.06), transparent 30%), radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.04), transparent 30%), linear-gradient(180deg, var(--linear-glow), transparent 35%)`
        }}
      />
      <div
        className="absolute inset-0 bg-[size:64px_64px] opacity-[0.03] pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">

        {/* Centered Layout Wrapper */}
        <div className="flex flex-col items-center text-center justify-center max-w-4xl mx-auto">

          <div className="flex flex-col items-center text-center space-y-6 select-none">
            {/* Top capsule tag matching reference design */}
            <ScrollReveal>
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-card-border bg-card-bg/60 backdrop-blur-md text-[11px] font-normal uppercase tracking-widest text-text-muted select-none">
                AI & AUTOMATION SOLUTIONS
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <h1 className="text-4xl md:text-5xl lg:text-[67.2px] font-extralight tracking-tight leading-[1.08] text-[#0f294a] dark:text-white">
                AI Agent & <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1d70b8] to-cyan-400 dark:from-cyan-400 dark:to-purple-400">Automation Services</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h3 className="text-[18px] font-normal text-[#0f294a]/95 dark:text-cyan-400 tracking-wide font-sans leading-relaxed">
                Where Strategy Meets Practical Implementation.
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl font-light">
                Deploy autonomous AI agents, intelligent automated workflows, and cognitive AI services to automate repetitive tasks, improve productivity, and scale your business operations.
              </p>
            </ScrollReveal>

            {/* Side-by-side buttons matching reference design */}
            <ScrollReveal delay={300}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold bg-[#0f294a] dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  Our Services
                </a>
                <a
                  href="#contact-us"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold border border-card-border hover:bg-card-bg-hover hover:scale-[1.02] text-text-title transition-all duration-300 cursor-pointer"
                >
                  Get in Touch
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Partners Logos Section (In Motion, Centered below) */}
        <ScrollReveal delay={400} className="w-screen relative left-1/2 -translate-x-1/2 pt-2">
          <div className="w-full space-y-4">
            <div className="text-[10px] font-mono font-light tracking-[0.25em] text-text-muted/40 text-center uppercase select-none">
              THEY TRUSTED US
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full overflow-hidden select-none py-2">
              <div className="flex animate-marquee whitespace-nowrap">

                {/* Track Group 1 */}
                <div className="flex items-center shrink-0">
                  {PARTNERS_LIST.map((partner, index) => (
                    <div key={`p1-${index}`} className="flex items-center justify-center shrink-0 w-[240px] h-16 opacity-55 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <Image
                        src={partner.src}
                        alt={partner.alt}
                        width={160}
                        height={40}
                        className="max-h-10 max-w-[160px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                      />
                    </div>
                  ))}
                </div>

                {/* Track Group 2 (Duplicate for seamless loop) */}
                <div className="flex items-center shrink-0" aria-hidden="true">
                  {PARTNERS_LIST.map((partner, index) => (
                    <div key={`p2-${index}`} className="flex items-center justify-center shrink-0 w-[240px] h-16 opacity-55 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <Image
                        src={partner.src}
                        alt={partner.alt}
                        width={160}
                        height={40}
                        className="max-h-10 max-w-[160px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 30s linear infinite;
              will-change: transform;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}} />
        </ScrollReveal>

      </div>
    </section>
  );
}