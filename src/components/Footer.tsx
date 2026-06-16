"use client";

import { Mail } from "lucide-react";
import { S3BLogoFull } from "@/components/S3BLogo";
import Link from "next/link";

// Inline vector brand icons to avoid version dependencies
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" stroke="none">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-background text-foreground border-t border-card-border pt-24 pb-12 overflow-hidden select-none transition-colors duration-300">
      {/* Decorative blurs */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-primary/4 blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-0 left-1/4 w-[250px] h-[250px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-6xl mx-auto px-6 space-y-24">

        {/* Main top grid matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">

          {/* Column 1: Logo & Slogan & Follow Us (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
            <Link href="/">
              <S3BLogoFull />
            </Link>

            <span className="text-[15px] text-text-muted leading-relaxed max-w-xs font-semibold block">
              Accelerate your digital future with S3B Global&apos;s Cloud, AI & Integration expertise.
            </span>

            <div className="space-y-2 pt-2 flex flex-col items-center md:items-start">
              <span className="text-[11px] font-mono font-bold tracking-widest text-brand-blue uppercase block">Follow us</span>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <a
                  href="https://www.linkedin.com/company/s3b-global/mycompany/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-card-border hover:border-primary/40 bg-card-bg hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-300 shadow-sm"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="text-[16px] font-mono font-bold uppercase tracking-widest text-brand-blue">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-[15px] text-text-muted font-semibold">
              <li>
                <Link href="/" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Home</Link>
              </li>
              <li>
                <Link href="/about" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">About us</Link>
              </li>
              <li>
                <Link href="/#services" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Services</Link>
              </li>
              <li>
                <Link href="/blog" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="text-[16px] font-mono font-bold uppercase tracking-widest text-brand-blue">
              SERVICES
            </h4>
            <ul className="space-y-3.5 text-[15px] text-text-muted font-semibold">
              <li>
                <Link href="/services/ai-transformation" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">AI Transformation</Link>
              </li>
              <li>
                <Link href="/services/cloud-infrastructure" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Cloud + Infrastructure</Link>
              </li>
              <li>
                <Link href="/services/data-ai" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Data + AI</Link>
              </li>
              <li>
                <Link href="/services/digital-product-experience" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Digital Product Experience</Link>
              </li>
              <li>
                <Link href="/services/enterprise-services" className="inline-block hover:text-brand-blue hover:translate-x-1 transition-all duration-300">Enterprise IT Solutions + Services</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: ADDRESS & CONTACT (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <h4 className="text-[16px] font-mono font-bold uppercase tracking-widest text-brand-blue">
                ADDRESS
              </h4>
              <div className="space-y-4 text-[15px] text-text-muted font-semibold text-center md:text-left flex flex-col items-center md:items-start">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-brand-orange uppercase block">US Office</span>
                  <span className="leading-relaxed max-w-xs block text-black dark:text-zinc-300">
                    8000 Avalon Boulevard Suites 100 and 200, Alpharetta, GA 30009, United States
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-brand-orange uppercase block">India Office</span>
                  <span className="leading-relaxed max-w-xs block text-black dark:text-zinc-300">
                    Plot No. 40, Sector 62 Road, Noida, Uttar Pradesh 201309
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 flex flex-col items-center md:items-start">
              <h4 className="text-[16px] font-mono font-bold uppercase tracking-widest text-brand-blue">
                CONTACT
              </h4>
              <div className="flex items-center justify-center md:justify-start space-x-2.5 text-[15px] text-text-muted font-semibold font-sans">
                <Mail className="h-4.5 w-4.5 text-brand-blue shrink-0" />
                <a href="mailto:info@s3bglobal.com" className="hover:text-brand-blue transition-colors break-all">
                  info@s3bglobal.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="!mt-12 pt-6 border-t border-card-border flex flex-col md:flex-row items-center justify-start select-none">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center text-xs font-mono font-black text-foreground shadow-sm shrink-0">
              S3B
            </div>
            <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-text-muted">
              © 2026.S3B GLOBAL
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}