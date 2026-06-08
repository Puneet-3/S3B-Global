"use client";

import React from "react";

export function S3BLogoIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src="/s3b-logo-icon.png"
      alt="S3B Logo Icon"
      className={`object-contain ${className}`}
    />
  );
}

export function S3BLogoFull({ 
  className = "", 
  iconClassName = "h-9 w-9", 
  isFooter = false 
}: { 
  className?: string; 
  iconClassName?: string;
  isFooter?: boolean;
}) {
  return (
    <div className={`relative flex items-center select-none ${className}`}>
      {/* Dark mode logo - visible in default dark mode, hidden in light mode */}
      <img
        src="/s3b-logo-dark.png"
        alt="S3B Global"
        className="block [.light-mode_&]:hidden h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
      />
      {/* Light mode logo - hidden in default dark mode, visible in light mode */}
      <img
        src="/s3b-logo-light.png"
        alt="S3B Global"
        className="hidden [.light-mode_&]:block h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
}
