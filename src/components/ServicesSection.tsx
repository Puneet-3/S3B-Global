"use client";

import React, { useState, useEffect } from "react";
import { Brain, Cloud, Database, MonitorPlay, Briefcase, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

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

        {/* Client Testimonial Card (Gray Card) */}
        <ScrollReveal delay={150}>
          <div 
            className="relative overflow-hidden rounded-3xl bg-card-bg/40 border border-card-border p-6 sm:p-8 shadow-md backdrop-blur-md"
            style={{ borderColor: isDarkMode ? "rgba(34, 211, 238, 0.2)" : undefined }}
          >

            <div className="absolute right-6 top-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none text-[7rem] leading-none font-serif text-foreground font-light">
              ”
            </div>

            <div className="relative z-10 max-w-4xl">

              <div className="inline-flex items-center space-x-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>

                <span className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#125492] dark:text-cyan-400">
                  CLIENT TESTIMONIAL
                </span>
              </div>

              <div className="relative min-h-[240px] sm:min-h-[160px] md:min-h-[120px] w-full">
                {testimonials.map((item, index) => {
                  const isActive = current === index;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-x-0 top-0 w-full transition-all duration-700 ease-in-out ${
                        isActive
                          ? "opacity-100 translate-y-0 pointer-events-auto z-10"
                          : "opacity-0 -translate-y-2 pointer-events-none z-0"
                      }`}
                    >
                      <p className="text-[17px] font-normal leading-relaxed text-text-title">
                        "{item.quote}"
                      </p>
                      <div className="pt-4">
                        <h4 className="text-[17px] font-semibold text-text-title">
                          {item.name}
                        </h4>
                        <p className="text-[13px] font-mono text-text-muted uppercase tracking-wider font-normal">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls */}

              <div className="flex items-center justify-between mt-5">

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${current === index
                        ? "w-8 bg-cyan-400"
                        : "w-2 bg-gray-500"
                        }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-card-border hover:bg-card-bg-hover transition"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-card-border hover:bg-card-bg-hover transition"
                  >
                    →
                  </button>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}