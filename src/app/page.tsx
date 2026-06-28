import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CapabilitiesBento from "@/components/CapabilitiesBento";
import ServicesSection from "@/components/ServicesSection";
import IndustriesGrid from "@/components/IndustriesGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "S3B Global | AI Agent & Automation Services",
  description: "Deploy intelligent autonomous agents to automate repetitive operations, improve productivity, and supercharge business performance efficiently.",
  openGraph: {
    title: "S3B Global | AI Agent & Automation Services",
    description: "Deploy intelligent autonomous agents to automate repetitive operations, improve productivity, and supercharge business performance efficiently.",
    url: "https://s3bglobal.com",
    siteName: "S3B Global",
    images: [
      {
        url: "/s3b-logo-dark.png",
        width: 1200,
        height: 630,
        alt: "S3B Global Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S3B Global | AI Agent & Automation Services",
    description: "Deploy intelligent autonomous agents to automate repetitive operations, improve productivity, and supercharge business performance efficiently.",
    images: ["/s3b-logo-dark.png"],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-300">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Main Page Layout Sections */}
      <main className="flex-1 w-full">
        {/* Hero Section with Partner Logos */}
        <HeroSection />

        {/* Capabilities Bento Grid */}
        <CapabilitiesBento />

        {/* Core Services Section with Capabilities list & Client Testimonial */}
        <ServicesSection />

        {/* AI Solutions Across Industries Grid */}
        <IndustriesGrid />

        {/* Newsletter & AI Transformation CTA Section */}
        <CTASection />
      </main>

      {/* 3. Footer Sitemap & Info */}
      <Footer />
    </div>
  );
}
