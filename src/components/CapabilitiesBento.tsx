"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import heroGlobe from "../../public/hero-globe.png";

import chooseAgility from "../../public/choose-agility.png";
import chooseSolutions from "../../public/choose-solutions.png";
import chooseAutomation from "../../public/choose-automation.png";
import chooseSecurity from "../../public/choose-security.png";

export default function CapabilitiesBento() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(!document.documentElement.classList.contains("light-mode"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const chooseUsCards = [
    {
      id: 1,
      number: "01",
      title: "AI-Driven Agility",
      subtitle: "Autonomous Agents & Scale",
      description: "Our autonomous AI agents and automated workflows allow businesses to scale operations, improve efficiency, and verify results.",
      image: chooseAgility,
      color: "rgba(16, 185, 129, 1)", // Emerald
      glow: "rgba(16, 185, 129, 0.15)",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/[0.08] dark:bg-emerald-500/10 border-emerald-500/20 dark:border-emerald-500/30"
    },
    {
      id: 2,
      number: "02",
      title: "Intelligent AI Solutions",
      subtitle: "Repetitive Process Automation",
      description: "We build customized AI agents and automation systems to automate repetitive enterprise processes, saving valuable resources.",
      image: chooseSolutions,
      color: "rgba(6, 182, 212, 1)", // Cyan
      glow: "rgba(6, 182, 212, 0.15)",
      iconColor: "text-blue-600 dark:text-cyan-400 bg-blue-500/[0.08] dark:bg-cyan-500/10 border-blue-500/20 dark:border-cyan-500/30"
    },
    {
      id: 3,
      number: "03",
      title: "Automation First",
      subtitle: "Streamlined Enterprise Operations",
      description: "From simple bots to sophisticated AI agent workflows, we streamline enterprise operations for maximum output.",
      image: chooseAutomation,
      color: "rgba(245, 158, 11, 1)", // Amber
      glow: "rgba(245, 158, 11, 0.15)",
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-500/[0.08] dark:bg-emerald-500/10 border-amber-500/20 dark:border-amber-500/30"
    },
    {
      id: 4,
      number: "04",
      title: "Secure & Scalable AI",
      subtitle: "Compliance, Safety & Scaling",
      description: "Modern secure AI agent architectures and automated workflows ensure compliance, safety, and long-term scaling.",
      image: chooseSecurity,
      color: "rgba(168, 85, 247, 1)", // Purple
      glow: "rgba(168, 85, 247, 0.15)",
      iconColor: "text-purple-600 dark:text-purple-400 bg-purple-500/[0.08] dark:bg-purple-500/10 border-purple-500/20 dark:border-purple-500/30"
    }
  ];

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % chooseUsCards.length);
    }, 4000); // Cycle automatically every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered, chooseUsCards.length]);

  return (
    <section id="bento" className="relative overflow-hidden bg-background text-foreground pt-16 pb-16 md:pt-24 md:pb-24 transition-colors duration-300">
      {/* Background radial highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.04),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_35%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        {/* TOP ROW: Future-Ready AI & Automation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Glowing Neural & Automation Diagram */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <ScrollReveal className="w-full">
              <div className="relative w-full max-w-[480px] mx-auto overflow-hidden rounded-[2rem] border border-card-border/80 shadow-2xl bg-slate-900/[0.04] dark:bg-slate-950/20 backdrop-blur-sm select-none">
                <Image
                  src={heroGlobe}
                  alt="AI & Automation Solutions Globe"
                  className="w-full h-auto object-cover block"
                  placeholder="blur"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Copy Info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <ScrollReveal>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1d70b8] animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted">
                  FUTURE-READY AI AGENTS & WORKFLOWS
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-3xl md:text-[54.4px] font-light tracking-tight leading-tight text-text-title">
                Data Transformation
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-[16px] text-text-muted leading-relaxed max-w-2xl font-light">
                We turn complex data and enterprise databases into streamlined, automated AI workflows. By choosing us, you deploy elite autonomous AI agents and cognitive technologies that maximize operational efficiency, improve ROI, and secure your competitive edge.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* BOTTOM ROW: Why Choose Us */}
        <div className="pt-16 md:pt-24 space-y-8 select-none">
          <ScrollReveal className="w-full text-center space-y-4 flex flex-col items-center">
            <h2 className="text-3xl md:text-[54.4px] font-light tracking-tight text-text-title flex items-center justify-center gap-3">
              Why Choose <span className="text-brand-blue">Us</span>?
              <span className="text-brand-blue animate-spin-slow text-2xl md:text-3xl select-none leading-none">✸</span>
            </h2>
            <p className="text-[16px] text-slate-800 dark:text-zinc-300 font-light font-serif italic max-w-2xl leading-relaxed text-center pt-2">
              "We help businesses grow and scale with custom autonomous AI agents, automated workflow routing, and smart AI solutions designed specifically for your needs."
            </p>
          </ScrollReveal>

          {/* Interactive Horizontal Accordion Widget */}
          <div className="w-full">

            {/* Desktop Horizontal Accordion Layout */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="hidden lg:flex flex-row h-[380px] gap-4 w-full select-none items-stretch"
            >
              {chooseUsCards.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`group relative rounded-[2rem] border overflow-hidden h-full cursor-pointer ${isActive
                      ? "bento-card bento-card-active border-slate-300 dark:border-zinc-800 shadow-2xl z-10"
                      : "bento-card bg-slate-100/40 dark:bg-card-bg border-slate-200/60 dark:border-card-border hover:bg-slate-100/70 dark:hover:bg-card-bg-hover hover:border-slate-300 dark:hover:border-card-border-hover z-0"
                      }`}
                    style={{
                      boxShadow: isActive ? `0 25px 50px -12px ${item.glow}` : "none",
                      backgroundColor: isActive ? "var(--bento-active-bg)" : undefined,
                      borderColor: isActive && isDarkMode ? item.color.replace("1)", "0.35)") : undefined
                    }}
                  >
                    {/* EXPANDED CONTENT CARD VIEW */}
                    <div className={`absolute inset-0 w-full h-full p-10 flex flex-row gap-6 justify-between text-left bento-content-transition ${isActive ? "opacity-100 translate-y-0 scale-100 z-10 bento-fade-in" : "opacity-0 translate-y-4 scale-95 pointer-events-none z-0 bento-fade-out"
                      }`}>
                      {/* Background decorative glow circle */}
                      <div
                        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20 dark:opacity-30 transition-all duration-500"
                        style={{ backgroundColor: item.color }}
                      />

                      {/* Left Column: Info Content */}
                      <div className="flex flex-col justify-between h-full flex-[1.4] relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#125492] dark:text-cyan-400 font-mono font-semibold">
                            {item.number} / 04
                          </span>
                        </div>

                        {/* Middle Description */}
                        <div className="space-y-4 my-auto">
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-[#125492] dark:text-cyan-400 font-mono font-semibold block">
                            {item.subtitle}
                          </span>
                          <h4 className="text-[24px] font-bold text-text-title leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[14px] text-text-muted font-sans font-light leading-relaxed max-w-md">
                            {item.description}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest text-text-muted font-mono font-normal">
                            S3B GLOBAL  AI & WORKFLOW
                          </span>
                          <div className="flex space-x-1.5">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="h-1.5 w-1.5 rounded-full opacity-40" style={{ backgroundColor: item.color }} />
                            <span className="h-1.5 w-1.5 rounded-full opacity-20" style={{ backgroundColor: item.color }} />
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Large Image */}
                      <div className="hidden sm:block flex-1 relative h-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-slate-100/50 dark:bg-black/20 shadow-inner">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-w-1024px) 200px, 300px"
                        />
                      </div>
                    </div>

                    {/* COLLAPSED HORIZONTAL TEXT VIEW */}
                    <div className={`absolute inset-0 w-full h-full py-8 flex flex-col items-center justify-between bento-content-transition ${!isActive ? "opacity-100 translate-y-0 scale-100 z-10 bento-fade-in" : "opacity-0 -translate-y-4 scale-95 pointer-events-none z-0 bento-fade-out"
                      }`}>
                      <span className="font-mono text-sm xl:text-base font-bold text-slate-500 dark:text-zinc-400">
                        {item.number}
                      </span>
                      <div className="relative w-32 xl:w-44 h-48 xl:h-64 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-zinc-800/80 bg-slate-100/50 dark:bg-black/20 transition-transform group-hover:scale-105 duration-300 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="w-full px-4 text-center">
                        <span className="font-sans font-black text-[11px] xl:text-xs uppercase tracking-widest text-slate-500 dark:text-zinc-400 block leading-snug transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-zinc-200">
                          {item.title}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Accordion Layout */}
            <div className="lg:hidden flex flex-col space-y-4 text-left">
              {chooseUsCards.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className="group focus:outline-none block cursor-pointer select-none"
                  >
                    {/* Step label */}
                    <div className="flex items-center space-x-3 mb-1">
                      <span className={`font-mono text-xs font-semibold tracking-widest transition-colors duration-300 ${isActive ? "text-[#125492] dark:text-cyan-400" : "text-slate-400 dark:text-zinc-600"
                        }`}>
                        {item.number}
                      </span>
                      {isActive && (
                        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#125492] dark:text-cyan-400 font-mono">
                          ACTIVE CAPABILITY
                        </span>
                      )}
                    </div>

                    {/* Mobile Title */}
                    <h3 className={`font-bold tracking-tight transition-all duration-500 mt-1 text-[24px] ${isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-950/40 dark:text-white/30 hover:text-slate-950/60 dark:hover:text-white/50 hover:translate-x-2"
                      }`}>
                      {item.title}
                    </h3>

                    {/* Mobile Expanded Card */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive
                      ? "max-h-[480px] opacity-100 mt-4"
                      : "max-h-0 opacity-0 pointer-events-none"
                      }`}>
                      <div
                        className="p-6 rounded-3xl border border-slate-200/60 dark:border-card-border bg-white dark:bg-card-bg shadow-lg space-y-4 relative overflow-hidden"
                        style={{ borderColor: isActive && isDarkMode ? item.color.replace("1)", "0.35)") : undefined }}
                      >

                        {/* Background color glow circle */}
                        <div
                          className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20 transition-all"
                          style={{ backgroundColor: item.color }}
                        />

                        {/* Mobile Large Image */}
                        <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-zinc-800/80 bg-slate-100/50 dark:bg-black/20 shadow-inner">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex items-center justify-between relative z-10">
                          <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-zinc-500 font-mono font-normal">
                            {item.subtitle}
                          </span>
                        </div>
                        <p className="text-[14px] text-slate-600 dark:text-zinc-400 font-sans font-light leading-relaxed relative z-10">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


