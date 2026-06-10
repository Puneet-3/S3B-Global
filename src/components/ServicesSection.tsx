"use client";

import React, { useState, useEffect } from "react";
import { Brain, Cloud, Database, MonitorPlay, Briefcase, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const capabilitiesList = [
  {
    num: "01",
    name: "AI Transformation",
    href: "/services/ai-transformation",
    icon: Brain,
    color: "rgba(16, 185, 129, 1)", // Emerald
    borderColor: "group-hover:border-emerald-500/40"
  },
  {
    num: "02",
    name: "Cloud + Infrastructure",
    href: "/services/cloud-infrastructure",
    icon: Cloud,
    color: "rgba(6, 182, 212, 1)", // Cyan
    borderColor: "group-hover:border-cyan-500/40"
  },
  {
    num: "03",
    name: "Data + AI",
    href: "/services/data-ai",
    icon: Database,
    color: "rgba(245, 158, 11, 1)", // Amber
    borderColor: "group-hover:border-amber-500/40"
  },
  {
    num: "04",
    name: "Digital Product Experience",
    href: "/services/digital-product-experience",
    icon: MonitorPlay,
    color: "rgba(168, 85, 247, 1)", // Purple
    borderColor: "group-hover:border-purple-500/40"
  },
  {
    num: "05",
    name: "Enterprise IT Solutions + Services",
    href: "/services/enterprise-services",
    icon: Briefcase,
    color: "rgba(59, 130, 246, 1)", // Blue
    borderColor: "group-hover:border-blue-500/40"
  }
];

const testimonials = [
  {
    quote:
      "Collaborating with S3B Global has transformed our growth path. They crafted a strategic, highly professional digital platform and database. Their data-driven approach, clear communication, and commitment to our success have been a game-changer for our team.",
    name: "Amin Toussaint",
    role: "Founder, BuzzBreach",
  },
  {
    quote:
      "S3B Global has been key to driving our digital transformation, turning complex challenges into scalable solutions with ease. Their innovation, professionalism, and responsiveness make them an invaluable technology partner.",
    name: "Satya Katakam",
    role: "Founder & CEO, iPivot",
  },
  {
    quote:
      "Partnering with S3B Global has significantly boosted our operational efficiency through their deep domain expertise and technical precision. Their result-driven approach and clear communication made them a trusted extension of our team.",
    name: "Sourabh Yadav",
    role: "Regional Head, Rocksensor",
  },
];

export default function ServicesSection() {
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

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  return (
    <section id="services" className="relative overflow-hidden bg-background text-foreground pt-12 pb-16 md:pt-20 md:pb-24 transition-colors duration-300">
      {/* Dynamic background highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.03),transparent_40%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.02),transparent_35%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 space-y-8">

        {/* Core Capabilities Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Heading Info (Sticky on desktop) */}
          <div className="lg:col-span-5 space-y-6 text-left lg:self-start">
            <ScrollReveal>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1d70b8] dark:bg-cyan-400 shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted">
                  OUR CAPABILITIES
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-3xl md:text-[54.4px] font-semibold tracking-tight text-text-title leading-tight">
                Our expertise.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-[17px] text-text-muted leading-relaxed font-normal">
                We engineer scalable solutions that transform legacy systems, automate complex enterprise routing, and integrate state-of-the-art cognitive algorithms. Explore each capability to learn more about our specific services.
              </p>
            </ScrollReveal>

            <div className="hidden lg:block h-[1px] w-2/3 bg-gradient-to-r from-card-border to-transparent" />
          </div>

          {/* Right Column: Clickable Capability Cards List */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {capabilitiesList.map((item, idx) => {
              const Icon = item.icon;

              return (
                <ScrollReveal key={idx} delay={50 * idx}>
                  <a
                    href={item.href}
                    className={`group block relative overflow-hidden rounded-2xl border border-card-border bg-card-bg/45 dark:bg-card-bg/20 py-3.5 px-5 transition-all duration-300 hover:bg-card-bg-hover hover:-translate-y-0.5 hover:shadow-sm select-none ${item.borderColor}`}
                    style={{ borderColor: isDarkMode ? item.color.replace("1)", "0.35)") : undefined }}
                  >
                    {/* Hover side colored indicator */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: item.color }}
                    />

                    {/* Background decorative glow on hover */}
                    <div
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: item.color }}
                    />

                    <div className="flex flex-row items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center space-x-4">

                        {/* Styled Icon Box */}
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-card-border bg-white/[0.02] dark:bg-white/[0.04] transition-all duration-300 group-hover:scale-105"
                          style={{ borderColor: `rgba(255,255,255,0.05)` }}
                        >
                          <Icon
                            className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-6"
                            style={{ color: item.color }}
                          />
                        </div>

                        {/* Text info */}
                        <div className="flex items-center space-x-3 text-left">
                          <span className="font-mono text-xs font-normal text-text-muted">
                            {item.num}
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full opacity-60" style={{ backgroundColor: item.color }} />
                          <h3 className="text-[24px] font-bold tracking-wide text-text-title">
                            {item.name}
                          </h3>
                        </div>

                      </div>

                      {/* Click Action Arrow Button */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-card-border bg-white/[0.02] dark:bg-white/[0.04] text-text-muted transition-all duration-300 group-hover:bg-[#1d70b8] dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-[#041018] group-hover:border-[#1d70b8] dark:group-hover:border-cyan-400 group-hover:translate-x-1 shadow-sm">
                        <ArrowRight className="h-4.5 w-4.5" />
                      </div>

                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

        {/* Testimonials Section */}
        <div className="max-w-5xl mx-auto pt-16 border-t border-card-border/40 text-center space-y-12">
          <ScrollReveal className="space-y-4">
            <h2 className="text-3xl md:text-[44px] font-semibold tracking-tight text-text-title uppercase">
              The Trust We&apos;ve Earned
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100} className="relative max-w-4xl mx-auto">
            <div 
              className="relative overflow-hidden rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm p-8 md:p-14 min-h-[260px] flex flex-col justify-between text-left"
              style={{ borderColor: isDarkMode ? "rgba(34, 211, 238, 0.2)" : undefined }}
            >
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="grid grid-cols-1 grid-rows-1 text-left w-full h-full items-center">
                {testimonials.map((item, index) => {
                  const isActive = current === index;
                  return (
                    <div
                      key={index}
                      className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto z-10 scale-100"
                        : "opacity-0 pointer-events-none translate-y-8 scale-95"
                        }`}
                    >
                      <blockquote className="text-lg md:text-xl font-normal text-text-title italic leading-relaxed mb-6 font-sans">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <div className="space-y-1">
                        <cite className="not-italic font-medium text-[16px] text-text-title block font-sans">
                          {item.name}
                        </cite>
                        <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-card-border/30">
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${index === current ? "w-6 bg-[#10b981]" : "w-1.5 bg-card-border"
                        }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={prevSlide}
                    className="p-2.5 rounded-full border border-card-border bg-white/[0.02] hover:bg-white/[0.06] text-text-title transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2.5 rounded-full border border-card-border bg-white/[0.02] hover:bg-white/[0.06] text-text-title transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}