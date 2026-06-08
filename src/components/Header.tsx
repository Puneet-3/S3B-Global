"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowRight, ChevronDown, Cloud, Brain, Database, MonitorPlay, Briefcase } from "lucide-react";
import { S3BLogoFull } from "@/components/S3BLogo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const servicesList = [
    {
      title: "AI Transformation",
      desc: "Commanding the AI frontier with deep expertise and rapid execution.",
      href: "/services/ai-transformation",
      icon: Brain,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "Cloud + Infrastructure",
      desc: "AI-powered, secure cloud architectures built for enterprise growth.",
      href: "/services/cloud-infrastructure",
      icon: Cloud,
      color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20"
    },
    {
      title: "Data + AI",
      desc: "Actionable intelligence powered by secure, modern data engineering.",
      href: "/services/data-ai",
      icon: Database,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Digital Product Experience",
      desc: "Intuitive digital experiences designed for user adoption and impact.",
      href: "/services/digital-product-experience",
      icon: MonitorPlay,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Enterprise IT Solutions + Services",
      desc: "Simplifying complex legacy architectures and scaling intelligence.",
      href: "/services/enterprise-services",
      icon: Briefcase,
      color: "text-accent-purple bg-accent-purple/10 border-accent-purple/20"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    // Initialize state from localStorage or document class
    const savedTheme = localStorage.getItem("s3b-theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-mode");
      setIsDarkMode(false);
    } else if (savedTheme === "dark") {
      document.documentElement.classList.remove("light-mode");
      setIsDarkMode(true);
    } else {
      const isLight = document.documentElement.classList.contains("light-mode");
      setIsDarkMode(!isLight);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("s3b-theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("s3b-theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Click outside listener to automatically collapse the services dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".services-dropdown-container")) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Detect touch input to prevent hover/click conflicts on touch & hybrid devices
  useEffect(() => {
    const handleTouch = () => {
      setIsTouchDevice(true);
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-card-border/45 ${
        isMobileMenuOpen
          ? "bg-background py-4"
          : isScrolled
            ? "bg-panel-bg/75 backdrop-blur-md py-4"
            : "bg-background/25 backdrop-blur-sm py-6"
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Futuristic Official Logo */}
        <a href="/">
          <S3BLogoFull />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-10 text-[16px] font-semibold text-text-muted">
          <a
            href="/"
            className="relative py-1 transition-colors hover:text-text-title group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/about"
            className="relative py-1 transition-colors hover:text-text-title group"
          >
            About us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Services Nav with Hover & Click Dropdown */}
          <div
            className="relative group py-1 services-dropdown-container"
            onMouseEnter={() => {
              if (!isTouchDevice) setIsServicesOpen(true);
            }}
            onMouseLeave={() => {
              if (!isTouchDevice) setIsServicesOpen(false);
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                if (isTouchDevice) {
                  setIsServicesOpen(prev => !prev);
                } else {
                  setIsServicesOpen(true);
                }
              }}
              className="flex items-center space-x-1 py-1 transition-colors hover:text-text-title cursor-pointer text-[16px] font-semibold text-text-muted select-none"
            >
              <span>Services</span>
              <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />

            {/* Elegant Mega Menu Dropdown Panel */}
            <div
              className={`absolute top-full -left-32 pt-2 w-[640px] transition-all duration-300 text-left select-none z-50 ${isServicesOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              <div className="rounded-2xl bg-card-bg border border-card-border p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-2 gap-2">
                {servicesList.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-nav-hover-bg transition-all duration-300"
                    >
                      {/* Stylized Icon container */}
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 group-hover/item:scale-105 ${item.color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      {/* Copy details */}
                      <div>
                        <h4 className="text-[16.5px] font-bold text-text-title group-hover/item:text-[#1d70b8] transition-colors leading-tight">
                          {item.title}
                        </h4>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <a
            href="/blog"
            className="relative py-1 transition-colors hover:text-text-title group"
          >
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/careers"
            className="relative py-1 transition-colors hover:text-text-title group"
          >
            Careers
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/contact"
            className="relative py-1 transition-colors hover:text-text-title group"
          >
            Contact us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Controls & CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-full border border-card-border hover:border-primary/40 bg-card-bg hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-300 group shadow-sm overflow-hidden"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Book Consultation Button */}
          <a
            href="/contact"
            className="relative inline-flex items-center justify-center px-7 py-3 rounded-full text-[14px] font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>BOOK FREE CONSULTATION</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Hover Background Gradient Fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-card-border bg-card-bg text-text-muted"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-lg border border-card-border bg-card-bg text-text-muted hover:text-text-title"
          >
            {isMobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[81px] z-30 bg-background border-t border-card-border animate-fade-in overflow-y-auto">
          <nav className="flex flex-col p-8 space-y-6 text-lg font-medium text-text-muted">
            <a
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-text-title transition-colors text-left"
            >
              Home
            </a>
            <a
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-text-title transition-colors text-left"
            >
              About us
            </a>

            {/* Mobile Collapsible Services Accordion */}
            <div className="space-y-2 text-left">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="w-full flex items-center justify-between text-left hover:text-text-title transition-colors cursor-pointer text-lg font-medium"
              >
                <span>Services</span>
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`pl-4 space-y-3 transition-all overflow-hidden duration-300 ${isMobileServicesOpen ? "max-h-[300px] opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
              >
                {servicesList.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-text-muted hover:text-text-title py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-text-title transition-colors text-left"
            >
              Blog
            </a>
            <a
              href="/careers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-text-title transition-colors text-left"
            >
              Careers
            </a>
            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-text-title transition-colors text-left"
            >
              Contact us
            </a>
            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative inline-flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden text-center"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>BOOK FREE CONSULTATION</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Hover Background Gradient Fill */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

