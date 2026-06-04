"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact-us" className="pt-16 pb-24 md:pt-24 md:pb-32 relative overflow-hidden bg-background border-t border-card-border transition-colors duration-300">
      
      {/* Background glowing telemetry */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-[350px] h-[350px] rounded-full bg-indigo-400/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-7 space-y-6 text-left select-none">
            <ScrollReveal>
              <div className="flex items-center space-x-2 text-[#125492] dark:text-cyan-400 font-mono text-[10px] md:text-xs font-semibold uppercase tracking-widest">
                <span className="flex space-x-1 items-center">
                  <span className="h-2 w-2 rounded-full bg-[#fb923c]" />
                  <span className="h-2 w-2 rounded-full bg-foreground" />
                </span>
                <span>CONTACT US</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-3xl md:text-[54.4px] font-light text-text-title tracking-tight leading-tight">
                Start Your AI & Automation Transformation
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-[16px] text-text-muted leading-relaxed max-w-xl font-light">
                Connect with our team to discover how custom autonomous AI agents, automated workflows, and intelligent cognitive automation can accelerate your business.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Form inside a beautiful responsive card matching the IndustriesGrid cards */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal delay={150}>
              <div className="relative bg-card-bg rounded-[2.2rem] border border-card-border p-8 sm:p-10 shadow-2xl select-none">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="* Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitted}
                      className="w-full px-6 py-4 rounded-full border border-slate-200 bg-slate-100/90 text-sm font-normal text-text-title placeholder-text-muted/75 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="group w-full px-8 py-4 rounded-full text-sm font-normal text-white-force bg-gradient-to-r from-[#1d70b8] to-[#00b4d8] hover:from-[#155694] hover:to-[#009bb8] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/10 transition-all duration-300 shrink-0 select-none cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <span>{isSubmitted ? "APPLYING..." : "APPLY NOW"}</span>
                    {!isSubmitted && (
                      <ArrowRight className="h-4 w-4 text-white-force transition-transform duration-300 group-hover:translate-x-1.5" />
                    )}
                  </button>
                </form>

                {/* Subtext info */}
                <div className="mt-4 text-xs font-mono font-normal text-text-muted/50 text-center">
                  Terms | Privacy policy | Accessibility
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
