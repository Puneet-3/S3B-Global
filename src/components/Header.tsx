"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowRight, ChevronDown, Cloud, Cpu, Database, ShieldCheck } from "lucide-react";
import { S3BLogoFull } from "@/components/S3BLogo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const servicesList = [
    {
      title: "AI Transformation",
      href: "/services/ai-transformation"
    },
    {
      title: "Cloud & Infrastructure",
      href: "/services/cloud-infrastructure"
    },
    {
      title: "Data + AI",
      href: "/services/data-ai"
    },
    {
      title: "Digital Product Experience",
      href: "/services/digital-product-experience"
    },
    {
      title: "Enterprise IT Solutions & Services",
      href: "/services/enterprise-services"
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
      if (window.innerWidth >= 768) {
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isMobileMenuOpen
          ? "bg-background border-b border-card-border py-4"
          : isScrolled
            ? "bg-panel-bg/75 backdrop-blur-md border-b border-card-border py-4"
            : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Futuristic Official Logo */}
        <a href="/">
          <S3BLogoFull />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-text-muted">
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
              className="flex items-center space-x-1 py-1 transition-colors hover:text-text-title cursor-pointer text-sm font-medium text-text-muted select-none"
            >
              <span>Services</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />

            {/* Elegant Vertical Dropdown Panel - Fixes Hover Gap Bug */}
            <div
              className={`absolute top-full left-0 pt-2 w-72 transition-all duration-300 text-left select-none z-50 ${isServicesOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              <div className="rounded-xl bg-panel-bg border border-card-border backdrop-blur-xl p-2 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col space-y-1">
                {servicesList.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsServicesOpen(false)}
                    className="w-full px-4 py-3 rounded-lg text-xs font-bold text-text-title hover:text-[#1d70b8] hover:bg-nav-hover-bg transition-all leading-tight block"
                  >
                    {item.title}
                  </a>
                ))}
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
        <div className="hidden md:flex items-center space-x-5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full border border-card-border hover:border-primary/40 bg-card-bg hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-300 group shadow-sm overflow-hidden"
          >
            {isDarkMode ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Book Consultation Button */}
          <a
            href="/services"
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#1d70b8] to-[#0A0D53] hover:brightness-110 shadow-[0_4px_20px_rgba(29,112,184,0.25)] transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-1.5">
              <span>BOOK FREE CONSULTATION</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-white" />
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2582d0] to-[#12166a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-card-border bg-card-bg text-text-muted"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-card-border bg-card-bg text-text-muted hover:text-text-title"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-30 bg-background border-t border-card-border animate-fade-in overflow-y-auto">
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
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-semibold text-white-force bg-primary hover:bg-primary-hover shadow-lg transition-all text-center space-x-2"
            >
              <span>BOOK FREE CONSULTATION</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

