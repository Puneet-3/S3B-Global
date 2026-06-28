"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AboutRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/about-us/");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-sans antialiased">
      <div className="text-center space-y-4 max-w-sm px-6">
        <div className="inline-block w-8 h-8 border-4 border-[#1d70b8]/30 border-t-[#1d70b8] rounded-full animate-spin" />
        <h1 className="text-xl font-light text-text-title">Redirecting...</h1>
        <p className="text-xs text-text-muted leading-relaxed">
          We are routing you to our new About Us page.
        </p>
      </div>
    </div>
  );
}
