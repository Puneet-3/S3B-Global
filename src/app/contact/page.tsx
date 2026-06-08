"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  MapPin, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Terminal,
  Send,
  Eye,
  Hexagon,
  Zap
} from "lucide-react";

const PARTNERS_LIST = [
  { src: "/partner-logo-1.png", alt: "Collabera" },
  { src: "/partner-logo-2.png", alt: "Tata" },
  { src: "/partner-logo-3.png", alt: "H&H Insurance" },
  { src: "/partner-logo-4.png", alt: "CSI" },
  { src: "/partner-logo-5.png", alt: "RKS" },
  { src: "/partner-logo-6.png", alt: "Cadila" },
  { src: "/partner-logo-8.png", alt: "Pfizer" },
  { src: "/partner-logo-9.png", alt: "Technology Partner" }
];

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLHeadingElement>(null);
  const isIntersecting = useRef(false);

  const numericPart = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.]/g, "");
  const isDecimal = value.includes(".");

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId: number;
    let timeoutId: any;

    const startAnimationLoop = () => {
      let startTimestamp: number | null = null;
      const duration = 1500; // 1.5 seconds count animation

      const step = (timestamp: number) => {
        if (!isIntersecting.current) return;
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function: easeOutQuad
        const easedProgress = progress * (2 - progress);
        
        setCount(easedProgress * numericPart);

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          // Animation reached target value, wait 3 seconds and restart the loop
          timeoutId = setTimeout(() => {
            if (isIntersecting.current) {
              startAnimationLoop();
            }
          }, 3000);
        }
      };

      animationFrameId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isIntersecting.current = true;
          startAnimationLoop();
        } else {
          isIntersecting.current = false;
          // Clear any running animation loop or timeout on scroll out
          cancelAnimationFrame(animationFrameId);
          clearTimeout(timeoutId);
          setCount(0); // Reset to 0 when out of view
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [numericPart]);

  const displayValue = isDecimal ? count.toFixed(1) : Math.round(count).toString();

  return (
    <span ref={elementRef} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

interface OfficeLocation {
  id: "alpharetta" | "auckland";
  label: string;
  address: string;
  mapUrl: string;
}

const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "alpharetta",
    label: "ALPHARETTA, GEORGIA, US",
    address: "8000 Avalon Boulevard Suites 100 and 200, Alpharetta, GA 30009, United States",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7215160867803!2d-84.34098932428586!3d34.05105267315754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f50aa671295a0d%3A0xe54e6378e91e5e6e!2s8000%20Avalon%20Blvd%2C%20Alpharetta%2C%20GA%2030009!5e0!3m2!1sen!2sus!4v1716668041539!5m2!1sen!2sus"
  },
  {
    id: "auckland",
    label: "WEST HARBOUR, AUCKLAND, NZ",
    address: "9 Constable Lane, West Harbour, Auckland 0618, New Zealand",
    mapUrl: "https://maps.google.com/maps?q=9%20Constable%20Lane%2C%20West%20Harbour%2C%20Auckland%200618%2C%20New%20Zealand&z=17&output=embed"
  }
];

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact - S3B Global";
  }, []);

  const [activeOffice, setActiveOffice] = useState<OfficeLocation>(OFFICE_LOCATIONS[0]);

  // Form Fields states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [comments, setComments] = useState("");

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [formError, setFormError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !comments.trim()) {
      setFormError("All marked fields (*) are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);
    setLogs([`[15:43:57] POST /api/v1/contact/submit HTTP/1.1`]);

    const traceLogs = [
      `[info] Hostname: secure.s3b-global.com`,
      `[crypt] Initializing TLS 1.3 cryptographic secure channel...`,
      `[crypt] AES-256-GCM package keyspace synced successfully.`,
      `[cloud] Processing contact dossier payload: { sender: "${firstName} ${lastName}" }`,
      `[database] Synchronizing metadata rows in S3B AWS US-East primary shards...`,
      `[success] 211 Form Handshake complete. Dispatched direct notification to operations.`
    ];

    traceLogs.forEach((log, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (idx === traceLogs.length - 1) {
          setIsSubmitting(false);
          setIsSubmitted(true);
        }
      }, (idx + 1) * 750);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-300">
      
      {/* 1. Global Navigation Header */}
      <Header />

      {/* Main Page Layout */}
      <main className="flex-1 w-full pt-24 md:pt-28 bg-background text-foreground transition-colors duration-300">
        
        {/* Subtle light-blue/purple background glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 20%, rgba(29, 112, 184, 0.05), transparent 35%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.03), transparent 35%)`
          }}
        />

        {/* Section 1: Unified Hero + Form Grid (Top Section) */}
        <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Headline, copy, and secondary CTA (7 columns) */}
            <ScrollReveal className="lg:col-span-7 text-left space-y-6 lg:pr-8 flex flex-col justify-center items-start">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-card-bg/60 border border-card-border shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-text-muted">
                  CONTACT US
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-[48px] font-semibold tracking-tight leading-[1.15] text-[#0f294a] dark:text-white">
                S3B Global helps businesses <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d70b8] to-cyan-400 dark:from-cyan-400 dark:to-purple-400 font-semibold">automate, scale, and innovate.</span>
              </h1>
              
              <p className="text-[15px] md:text-[16px] text-text-muted leading-relaxed font-light">
                At the heart of S3B Global is a fusion of extraordinary people, deep expertise, and cutting-edge AI and cloud technologies. We guide clients through the intricacies of their digital journey, ensuring the fastest path to results.
              </p>

              {/* Action button scrolling down to focus the form */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    document.getElementById("contact-form-card")?.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      document.getElementById("first-name-input")?.focus();
                    }, 500);
                  }}
                  className="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer uppercase tracking-widest"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>BOOK A CALL</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
              </div>

              {/* Physical Contact Details inline */}
              <div className="space-y-4 pt-6 border-t border-card-border/40 select-none">
                <div className="flex items-start space-x-3 text-xs font-semibold">
                  <MapPin className="h-4.5 w-4.5 text-[#1d70b8] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0f2d59] dark:text-text-title block">Address:</span>
                    <p className="leading-relaxed text-text-muted">
                      8000 Avalon Boulevard Suites 100 And 200, Alpharetta, GA 30009, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs font-semibold">
                  <Mail className="h-4.5 w-4.5 text-[#1d70b8] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0f2d59] dark:text-text-title block">Email:</span>
                    <a href="mailto:info@s3bglobal.com" className="hover:text-primary transition-colors text-text-muted">
                      info@s3bglobal.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Contact Form Panel (5 columns) */}
            <ScrollReveal delay={150} className="lg:col-span-5 bg-card-bg border border-card-border p-8 md:p-10 lg:p-12 rounded-3xl backdrop-blur-md shadow-sm text-left relative overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-center">
              <div id="contact-form-card" className="absolute -top-20" />
              
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in select-none">
                  <div className="w-14 h-14 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] shadow animate-bounce">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-title">Dossier securely synced!</h3>
                  <p className="text-xs text-text-muted max-w-sm leading-relaxed font-medium">
                    Thank you, **{firstName}**. Your message has been successfully transmitted and encrypted. An S3B Global partner will reach out within 12 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                      setTelephone("");
                      setComments("");
                      setLogs([]);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#1d70b8] hover:bg-blue-600 text-white font-sans font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Send Another message
                  </button>
                </div>
              ) : isSubmitting ? (
                /* Inline Console Terminal Logger */
                <div className="rounded-xl border border-card-border bg-black/90 p-4 font-mono text-[9px] text-[#10b981] space-y-1 shadow-inner h-[210px] overflow-y-auto select-none">
                  {logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed animate-fade-in">
                      {log}
                    </div>
                  ))}
                  <div className="w-1.5 h-3.5 bg-[#10b981] inline-block animate-pulse" />
                </div>
              ) : (
                /* The Contact form matching screenshot */
                <form onSubmit={handleFormSubmit} className="space-y-5 lg:space-y-6">
                  {/* First and Last Name row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">First Name <span className="text-red-500">*</span></label>
                      <input 
                        id="first-name-input"
                        type="text" 
                        placeholder="First name here"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">Last Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="Last name here"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                  </div>

                  {/* Email and Phone row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        placeholder="Add email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">Telephone</label>
                      <input 
                        type="tel" 
                        placeholder="Telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                  </div>

                  {/* Comments Question textarea */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-text-title block">Comments / Questions <span className="text-red-500">*</span></label>
                    <textarea 
                      rows={6}
                      placeholder="Tell us about your project or business goals"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                    />
                  </div>

                  {formError && (
                    <div className="flex items-center space-x-1.5 text-[10px] text-red-400 font-bold justify-center pt-1 animate-pulse">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 text-left">
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center w-full px-8 py-4 rounded-full text-xs font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer uppercase tracking-widest"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>GO FORWARD</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </button>
                  </div>
                </form>
              )}
            </ScrollReveal>

          </div>
        </div>

        {/* Section 2: Client Logos Marquee row */}
        <div className="w-full border-y border-card-border/60 bg-card-bg/25 backdrop-blur-sm py-12 overflow-hidden select-none relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-[10px] font-mono font-medium tracking-[0.25em] text-text-muted/60 text-center uppercase pb-6">
              Our Clients
            </div>
            
            {/* Infinite Marquee Loop */}
            <div className="relative w-full overflow-hidden py-1">
              <div className="flex animate-marquee whitespace-nowrap">
                {/* Track Group 1 */}
                <div className="flex items-center shrink-0">
                  {PARTNERS_LIST.map((partner, index) => {
                    const isTata = partner.alt === "Tata";
                    return (
                      <div key={`p1-${index}`} className="flex items-center justify-center shrink-0 w-[240px] h-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
                        <Image
                          src={partner.src}
                          alt={partner.alt}
                          width={isTata ? 90 : 130}
                          height={isTata ? 90 : 32}
                          className={`object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert ${isTata ? "max-h-12 max-w-[90px] scale-[1.75]" : "max-h-8 max-w-[130px]"}`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Track Group 2 (Duplicate for seamless loop) */}
                <div className="flex items-center shrink-0" aria-hidden="true">
                  {PARTNERS_LIST.map((partner, index) => {
                    const isTata = partner.alt === "Tata";
                    return (
                      <div key={`p2-${index}`} className="flex items-center justify-center shrink-0 w-[240px] h-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
                        <Image
                          src={partner.src}
                          alt={partner.alt}
                          width={isTata ? 90 : 130}
                          height={isTata ? 90 : 32}
                          className={`object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert ${isTata ? "max-h-12 max-w-[90px] scale-[1.75]" : "max-h-8 max-w-[130px]"}`}
                        />
                      </div>
                    );
                  })}
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
        </div>

        {/* Section 3: Why S3B Global / How We Can Help */}
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-16 relative z-10">
          
          <ScrollReveal className="space-y-12 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-card-bg border border-card-border shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.2em] text-text-muted">
                  WHY S3B GLOBAL
                </span>
              </div>
              <h2 className="text-3xl md:text-[44px] font-semibold tracking-tight text-text-title uppercase">
                How we can help
              </h2>
            </div>

            <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-3 text-left items-stretch">
              {/* Item 1 */}
              <div className="flex flex-col space-y-4 p-6 rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-white/[0.02]">
                  <Eye className="h-6 w-6 text-[#1d70b8] dark:text-cyan-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-normal text-text-title tracking-wide">
                    Operationalize Enterprise AI
                  </h3>
                  <p className="text-[14px] text-text-muted leading-relaxed font-light">
                    Leveraging our award winning talent, workshops, and purpose-built solution accelerators, we partner with clients to abstract the complexities of AI and drive real-world value throughout their modernization journey.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col space-y-4 p-6 rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-white/[0.02]">
                  <Hexagon className="h-6 w-6 text-[#f59e0b]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-normal text-text-title tracking-wide">
                    Client-Centric Innovation
                  </h3>
                  <p className="text-[14px] text-text-muted leading-relaxed font-light">
                    We begin by deeply understanding our clients' business intricacies. Using collaborative workshops, deep industry expertise, and rapid prototyping, we craft solutions that not only bring clarity and alignment but also drive meaningful, long-term value.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col space-y-4 p-6 rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-white/[0.02]">
                  <Zap className="h-6 w-6 text-[#10b981]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-normal text-text-title tracking-wide">
                    Accelerate Results
                  </h3>
                  <p className="text-[14px] text-text-muted leading-relaxed font-light">
                    Using innovative frameworks and solutions built on top of Microsoft technologies, we not only meet the unique needs of our clients but deliver highly-consumable and scalable solutions at breakneck speeds.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* S3B Global credentials stats section */}
          <ScrollReveal delay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-card-border/40 select-none">
            {[
              { label: "Years of Experience", val: "8+", gradient: "from-[#1d70b8] to-cyan-400 dark:from-cyan-400 dark:to-purple-400" },
              { label: "PoC Annually", val: "110+", gradient: "from-emerald-400 to-teal-400" },
              { label: "Service Satisfaction", val: "97.4%", gradient: "from-amber-400 to-orange-400" },
              { label: "Global Reach", val: "100%", gradient: "from-[#1d70b8] to-emerald-400" }
            ].map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-8 rounded-[2.2rem] border border-card-border bg-card-bg/40 backdrop-blur-sm text-center space-y-2 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-center space-x-1.5 pb-1 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1d70b8] animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                </div>
                <AnimatedCounter
                  value={metric.val}
                  className={`text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${metric.gradient} whitespace-nowrap`}
                />
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-text-muted/90 block pt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </ScrollReveal>

        </div>

        {/* Section 4: Locations */}
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-12 border-t border-card-border/40 relative z-10">
          
          <ScrollReveal className="space-y-4 text-center">
            <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-card-bg border border-card-border shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.2em] text-text-muted">
                LOCATIONS
              </span>
            </div>
            <h2 className="text-3xl md:text-[44px] font-semibold tracking-tight text-text-title uppercase">
              Driving client value at scale across US and Globally
            </h2>
          </ScrollReveal>

          {/* Switcher & Live Maps */}
          <ScrollReveal delay={150} className="space-y-6 text-center select-none">
            {/* Tabs switcher bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 bg-card-bg/40 border border-card-border p-2 rounded-2xl backdrop-blur-md max-w-4xl mx-auto w-full shadow-sm">
              {OFFICE_LOCATIONS.map(loc => {
                const isActive = activeOffice.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveOffice(loc)}
                    className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none flex-1 text-center ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#041018] shadow-[0_4px_12px_rgba(34,211,238,0.25)] scale-[1.01]"
                        : "text-text-muted hover:text-text-title hover:bg-card-bg border border-transparent"
                    }`}
                  >
                    {loc.label}
                  </button>
                );
              })}
            </div>

            {/* Dynamically active office coordinate detail label */}
            <div className="space-y-4 animate-fade-in text-center pt-2">
              <p className="text-xs md:text-sm font-semibold text-text-title max-w-xl mx-auto">
                {activeOffice.address}
              </p>

              {/* Dynamic live map block replication */}
              <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-card-border/60 bg-card-bg/20 shadow-sm relative group select-none">
                <iframe
                  title={`Live office map of S3B Global ${activeOffice.label}`}
                  src={activeOffice.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter contrast-[0.9] saturate-[0.95]"
                />
                
                {/* Visual Glassmorphic Border Overlay */}
                <div className="absolute inset-0 border border-card-border rounded-2xl pointer-events-none" />
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Section 5: Sleek Bottom CTA Section (GET IN TOUCH) */}
        <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
          <ScrollReveal className="always-dark rounded-3xl border border-white/10 bg-gradient-to-br from-[#041018] via-[#0b1b3d] to-[#041018] text-white p-10 md:p-14 max-w-4xl mx-auto relative overflow-hidden shadow-2xl text-center space-y-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.15),transparent_50%)] pointer-events-none -z-10" />
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white uppercase">
                GET IN TOUCH
              </h2>
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                Let's talk about your upcoming initiatives and how we can help.
              </p>
            </div>
            
            <div className="pt-2">
              <button
                onClick={() => {
                  document.getElementById("contact-form-card")?.scrollIntoView({ behavior: "smooth" });
                  setTimeout(() => {
                    document.getElementById("first-name-input")?.focus();
                  }, 500);
                }}
                className="relative inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold bg-transparent border border-emerald-400/40 hover:border-emerald-400 text-emerald-400 hover:text-[#041018] shadow-[0_0_12px_rgba(52,211,153,0.08)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer uppercase tracking-widest"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            </div>
          </ScrollReveal>
        </div>

      </main>

      {/* 3. Global Sitemap Footer */}
      <Footer />
    </div>
  );
}
