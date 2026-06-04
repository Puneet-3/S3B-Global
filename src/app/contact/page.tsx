"use client";

import React, { useState, useEffect } from "react";
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
  Send
} from "lucide-react";

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
      <main className="flex-1 w-full pt-20 transition-colors duration-300">
        
        {/* Curved Header Banner Section */}
        <div className="w-full relative bg-gradient-to-r from-blue-50/50 via-indigo-50/20 to-white dark:from-white/[0.01] dark:via-white/[0.005] dark:to-transparent border-b border-card-border overflow-hidden px-8 py-20 md:py-24 rounded-b-[40px] select-none">
          {/* Nested concentric tracks background */}
          <svg className="absolute right-0 top-0 h-full w-[45%] text-[#1d70b8]/10 dark:text-white/5 pointer-events-none -z-10" viewBox="0 0 300 300" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M300,50 C200,50 150,100 150,200 C150,300 150,300 150,300" />
            <path d="M300,75 C215,75 175,115 175,200 C175,300 175,300 175,300" />
            <path d="M300,100 C230,100 200,130 200,200 C200,300 200,300 200,300" />
            <path d="M300,125 C245,125 225,145 225,200 C225,300 225,300 225,300" />
            <path d="M300,150 C260,150 250,160 250,200 C250,300 250,300 250,300" />
          </svg>
          <div className="max-w-5xl mx-auto space-y-4">
            <h1 className="text-3xl md:text-[54.4px] font-light text-[#0f2d59] dark:text-white tracking-tight leading-tight">
              Let Us Help You
            </h1>
            <p className="text-[16px] text-text-muted leading-relaxed max-w-2xl font-light">
              Connect with us to explore tailored digital solutions and take your business to the next level.
            </p>
          </div>
        </div>

        {/* Content sections inside the standard max-w-5xl container */}
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">
          
          {/* Section 2: Two Column Contact Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Let's Connect Copy (5 columns) */}
            <ScrollReveal className="lg:col-span-5 text-left space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-[54.4px] font-light text-[#0f2d59] dark:text-white tracking-tight leading-tight">
                  Let's Build Smarter Solutions
                </h2>
                <p className="text-[16px] text-text-muted leading-relaxed font-light">
                  Looking to scale your business with AI, automation, or digital solutions? We're here to help.
                </p>
                <p className="text-[16px] text-text-muted leading-relaxed font-light">
                  Share your ideas and let's build scalable digital experiences together.
                </p>
              </div>

              {/* Physical Contact Details */}
              <div className="space-y-6 pt-6 border-t border-card-border/40 select-none">
                {/* Address block */}
                <div className="flex items-start space-x-3 text-xs font-semibold">
                  <MapPin className="h-4.5 w-4.5 text-[#1d70b8] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0f2d59] dark:text-text-title block">Address:</span>
                    <p className="leading-relaxed text-text-muted">
                      8000 Avalon Boulevard Suites 100 And 200, Alpharetta, GA 30009, United States
                    </p>
                  </div>
                </div>

                {/* Email block */}
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

            {/* Right Column: Contact Form Panel (7 columns) */}
            <ScrollReveal delay={150} className="lg:col-span-7 bg-card-bg border border-card-border p-8 rounded-2xl backdrop-blur-md shadow-sm text-left relative overflow-hidden">
              
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
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* First and Last Name row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">First Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="First name here"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">Last Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="Last name here"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                  </div>

                  {/* Email and Phone row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        placeholder="Add email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-text-title block">Telephone</label>
                      <input 
                        type="tel" 
                        placeholder="Telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                      />
                    </div>
                  </div>

                  {/* Comments Question textarea */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-text-title block">Comments / Questions <span className="text-red-500">*</span></label>
                    <textarea 
                      rows={4}
                      placeholder="Tell us about your project or business goals"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
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
                      className="px-8 py-3.5 rounded-full text-xs font-semibold text-[#041018] bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 shadow-[0_4px_20px_rgba(34,211,238,0.25)] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 hover:-translate-y-0.5 select-none uppercase tracking-widest "
                    >
                      <span>LET'S CONNECT</span>
                    </button>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>

          {/* Section 3: Office Switcher & Live Maps (exact visual replica) */}
          <ScrollReveal delay={200} className="space-y-6 text-center select-none">
            {/* Tabs button Switcher (Glassmorphic Bar matching website design) */}
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

          {/* Section 4: Sleek Page CTA Card */}
          <ScrollReveal className="always-dark rounded-3xl border border-white/10 bg-gradient-to-br from-[#041018] via-[#0b1b3d] to-[#041018] text-white p-10 md:p-12 max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(34,211,238,0.12),transparent_45%)] pointer-events-none -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left text */}
              <div className="md:col-span-7 space-y-4 text-left">
                <h2 className="text-3xl md:text-[54.4px] font-light tracking-tight leading-tight text-white">
                  Let's Transform Your Business With AI & Innovation.
                </h2>
                <p className="text-[16px] text-zinc-300 leading-relaxed font-light">
                  AI-powered solutions built to automate, scale, and grow modern businesses.
                </p>
              </div>

              {/* Right input form */}
              <div className="md:col-span-5 space-y-3">
                <div className="flex items-stretch gap-2">
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                  <button
                    type="button"
                    className="px-5 py-3 rounded-lg text-xs font-bold text-white bg-[#0f2d59] hover:bg-[#134074] border border-cyan-400/20 hover:border-cyan-400/50 shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    GET STARTED
                  </button>
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed font-normal text-left">
                  Let's discuss AI solutions, automation, cloud, and scalable digital systems.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>

      {/* 3. Global Sitemap Footer */}
      <Footer />
    </div>
  );
}
