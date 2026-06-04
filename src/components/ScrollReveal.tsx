"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  style?: React.CSSProperties;
  id?: string;
}

export default function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 1000,
  style = {},
  id
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Reveal only once
        }
      },
      {
        threshold: 0.05, // Trigger when 5% of the element is visible
        rootMargin: "0px 0px -20px 0px" // Trigger slightly earlier
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      id={id}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Custom easeOutExpo curve
        ...style
      }}
      className={`transition-all ${
        isVisible 
          ? "opacity-100 translate-y-0 filter blur-0" 
          : "opacity-0 translate-y-6 filter blur-[1px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
