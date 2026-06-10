"use client";

import React from "react";
import Image from "next/image";

export function S3BLogoIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/s3b-logo-icon.png"
        alt="S3B Logo Icon"
        width={36}
        height={36}
        className="object-contain"
      />
    </div>
  );
}

export function S3BLogoFull({ 
  className = "", 
}: { 
  className?: string; 
}) {
  return (
    <div className={`relative flex items-center select-none ${className}`}>
      {/* Dark mode logo - visible in default dark mode, hidden in light mode */}
      <div className="block [.light-mode_&]:hidden transition-transform duration-300 hover:scale-[1.02]">
        <Image
          src="/s3b-logo-dark.png"
          alt="S3B Global"
          width={180}
          height={56}
          className="h-12 md:h-14 w-auto object-contain"
        />
      </div>
      {/* Light mode logo - hidden in default dark mode, visible in light mode */}
      <div className="hidden [.light-mode_&]:block transition-transform duration-300 hover:scale-[1.02]">
        <Image
          src="/s3b-logo-light.png"
          alt="S3B Global"
          width={180}
          height={56}
          className="h-12 md:h-14 w-auto object-contain"
        />
      </div>
    </div>
  );
}
