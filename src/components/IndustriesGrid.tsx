"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

import fintechImg from "../../public/industry-fintech.png";
import insuranceImg from "../../public/industry-insurance.png";
import retailImg from "../../public/industry-retail.png";
import healthcareImg from "../../public/industry-healthcare.png";
import image1 from "../../public/image1.jpg";

export default function IndustriesGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  const industryCards = [
    {
      id: 1,
      title: "Fintech",
      description: "Automate compliance, enhance fraud detection, and streamline financial operations with secure, intelligent systems.",
      image: fintechImg,
      color: "rgba(16, 185, 129, 1)", // Emerald
      glow: "rgba(16, 185, 129, 0.15)"
    },
    {
      id: 2,
      title: "Insurance",
      description: "Accelerate core claims processing, personalize policyholder experiences, and improve risk assessment using secure, data-driven AI systems.",
      image: insuranceImg,
      color: "rgba(6, 182, 212, 1)", // Cyan
      glow: "rgba(6, 182, 212, 0.15)"
    },
    {
      id: 3,
      title: "Retail",
      description: "Automate inventory management, personalize omnichannel shopping experiences, and optimize store operations with data-driven AI solutions.",
      image: retailImg,
      color: "rgba(245, 158, 11, 1)", // Amber
      glow: "rgba(245, 158, 11, 0.15)"
    },
    {
      id: 4,
      title: "Healthcare",
      description: "Streamline patient data management, automate administrative workflows, and enhance care delivery with secure, compliant AI systems.",
      image: healthcareImg,
      color: "rgba(168, 85, 247, 1)", // Purple
      glow: "rgba(168, 85, 247, 0.15)"
    }
  ];

  return (
    <section id="industries" className="pt-16 pb-24 md:pt-24 md:pb-32 relative overflow-hidden bg-background border-t border-card-border transition-colors duration-300">

      {/* Background glowing telemetry */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-[350px] h-[350px] rounded-full bg-indigo-400/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-6xl mx-auto px-6 space-y-16">

        {/* Top Header Row: Title on Left, Team Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-7 space-y-6 text-left select-none">
            <ScrollReveal>
              <div className="flex items-center space-x-2 text-[#125492] dark:text-cyan-400 font-mono text-[10px] md:text-xs font-semibold uppercase tracking-widest">
                <span className="flex space-x-1 items-center">
                  <span className="h-2 w-2 rounded-full bg-[#fb923c]" />
                  <span className="h-2 w-2 rounded-full bg-foreground" />
                </span>
                <span>INDUSTRIES WE SERVE</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-3xl md:text-[54.4px] font-light text-text-title tracking-tight leading-tight">
                AI Solutions Across Industries
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-[16px] text-text-muted leading-relaxed max-w-xl font-light">
                We deliver custom AI agents, workflow automation, and scalable infrastructure tailored to the specific demands of your sector.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Dynamic Tech Team Photo */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={150}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-card-border bg-card-bg shadow-2xl">
                <Image
                  src={image1}
                  alt="AI Solutions Team"
                  fill
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-w-768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Row: 4 Specialized Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch select-none">
          {industryCards.map((item, index) => {
            const isHovered = hoveredCard === index;

            return (
              <ScrollReveal key={item.id} delay={index * 80} className="h-full flex">
                <div
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform: isHovered ? "translateY(-6px)" : "none",
                    boxShadow: isHovered 
                      ? "0 20px 40px -10px rgba(0, 0, 0, 0.3)" 
                      : "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
                    borderColor: isDarkMode ? item.color.replace("1)", "0.35)") : undefined
                  }}
                  className="group relative rounded-[2.2rem] border border-card-border overflow-hidden transition-all duration-500 flex flex-col justify-between h-full w-full flex-grow flex-1 bg-card-bg p-6"
                >
                  <div className="flex flex-col w-full h-full space-y-6">
                    {/* Inner image container */}
                    <div className="relative w-full aspect-[4/3] rounded-[1.6rem] overflow-hidden border border-card-border bg-slate-100/50 dark:bg-black/20 shadow-inner p-1">
                      <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Centered Content */}
                    <div className="flex flex-col justify-center items-center text-center space-y-3 px-2 pb-2">
                      <h3 className="text-[20px] font-normal text-text-title transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-[14px] text-text-muted leading-relaxed font-sans font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}