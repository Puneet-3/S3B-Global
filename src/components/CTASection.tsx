"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            subject: `[Newsletter Signup] S3B Global Website`,
            from_name: "S3B Global Newsletter Form",
            email: email,
            message: `New subscription request from: ${email}`,
          },
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setEmail("");
          setIsSubmitted(false);
        }, 3000);
      } else {
        const errorText = await response.text();
        alert(errorText || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
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
                      disabled={isSubmitted || isSubmitting}
                      className="w-full px-6 py-4 rounded-full border border-slate-200 bg-slate-100/90 text-sm font-normal text-text-title placeholder-text-muted/75 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitted || isSubmitting}
                    className="relative inline-flex items-center justify-center w-full px-8 py-4 rounded-full text-sm font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>{isSubmitted ? "APPLIED!" : isSubmitting ? "APPLYING..." : "APPLY NOW"}</span>
                      {!isSubmitted && !isSubmitting && (
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </button>
                </form>

                {/* Subtext info */}

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
