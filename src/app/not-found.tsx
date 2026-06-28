"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, WifiOff } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Direct redirect fallback for old paths if served via 404.html
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.includes("/about") && !path.includes("/about-us")) {
        router.replace("/about-us/");
        return;
      }
      if (path.includes("/contact") && !path.includes("/contact-us")) {
        router.replace("/contact-us/");
        return;
      }
    }
  }, [router]);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  // SVG stroke calculations
  const strokeDasharray = 2 * Math.PI * 30; // r = 30 -> ~188.5
  const strokeDashoffset = strokeDasharray - (strokeDasharray * (countdown / 5));

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-300 relative">
      {/* Embedded CSS Style Tag for Premium Keyframe Animations & Cyber Grid */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .cyber-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(29, 112, 184, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(29, 112, 184, 0.03) 1px, transparent 1px);
          animation: grid-move 20s linear infinite;
        }
        .light-mode .cyber-grid {
          background-image: 
            linear-gradient(to right, rgba(29, 112, 184, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(29, 112, 184, 0.04) 1px, transparent 1px);
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 3s ease-in-out infinite;
        }
      `}} />

      {/* Futuristic Moving Cyber Grid Background Overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none -z-20" />

      {/* Navigation Header */}
      <Header />

      <main className="flex-1 w-full flex items-center justify-center pt-32 pb-24 relative">
        {/* Background Visual Accents */}
        <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-brand-blue/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-brand-green/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

        <div className="max-w-md w-full mx-auto px-6 text-center space-y-8 select-none animate-float">
          {/* Branded stylized badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg/60 border border-card-border shadow-sm backdrop-blur-md animate-subtle-pulse">
            <WifiOff className="h-4 w-4 text-brand-orange animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              ERROR 404 • NODE DISCONNECTED
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#1d70b8] to-cyan-400 dark:from-cyan-400 dark:to-purple-400 select-none filter drop-shadow-[0_4px_12px_rgba(29,112,184,0.15)]">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-text-title tracking-tight leading-tight">
              Lost in the Network
            </h2>
            <p className="text-[14px] text-text-muted leading-relaxed font-light max-w-sm mx-auto">
              The page you are looking for does not exist or has been relocated within the S3B network.
            </p>
          </div>

          {/* Premium Countdown Ring */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* SVG circular progress */}
              <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  className="stroke-card-border fill-transparent"
                  strokeWidth="3"
                />
                {/* Foreground circle with neon glow */}
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  className="stroke-primary fill-transparent transition-all duration-1000 ease-linear"
                  strokeWidth="3.5"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(29, 112, 184, 0.6))"
                  }}
                />
              </svg>
              {/* Centered Number */}
              <span className="absolute text-xl font-bold text-text-title tabular-nums">
                {countdown}
              </span>
            </div>
            <p className="text-xs font-mono text-text-muted tracking-wider uppercase">
              Redirecting to home network...
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Link
              href="/"
              className="relative inline-flex items-center justify-center w-full px-8 py-4 rounded-full text-[13px] font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer uppercase tracking-widest"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>GO HOME NOW</span>
                <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>
          </div>
        </div>
      </main>

      {/* Global Sitemap Footer */}
      <Footer />
    </div>
  );
}
