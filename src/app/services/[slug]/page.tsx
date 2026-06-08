import React from "react";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Pre-render static paths for high performance and zero Next.js routing warnings
export async function generateStaticParams() {
  return [
    { slug: "ai-transformation" },
    { slug: "cloud-infrastructure" },
    { slug: "data-ai" },
    { slug: "digital-product-experience" },
    { slug: "enterprise-services" }
  ];
}

// 2. Dynamically construct high-fidelity corporate SEO metadata for each individual service page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const seoData: Record<string, { title: string; desc: string }> = {
    "ai-transformation": {
      title: "AI Transformation - S3B Global",
      desc: "Reimagine your business operations by strategically integrating cutting-edge AI for sustainable innovation and competitive advantage by S3B Global."
    },
    "cloud-infrastructure": {
      title: "Cloud + Infrastructure - S3B Global",
      desc: "Build robust, secure, and highly available cloud environments tailored to your scaling demands and critical workloads by S3B Global."
    },
    "data-ai": {
      title: "Data + AI - S3B Global",
      desc: "Unleash the full potential of your business by combining advanced data engineering with intelligent machine learning models by S3B Global."
    },
    "digital-product-experience": {
      title: "Digital Product Experience - S3B Global",
      desc: "Create intuitive, user-centric digital products designed to maximize customer engagement, retention, and seamless processes by S3B Global."
    },
    "enterprise-services": {
      title: "Enterprise IT Solutions + Services - S3B Global",
      desc: "Ensuring institutional resilience with 24/7 SLAs, continuous security monitoring, and custom cluster architecture by S3B Global."
    }
  };

  const currentSeo = seoData[slug] || seoData["cloud-infrastructure"];

  return {
    title: currentSeo.title,
    description: currentSeo.desc,
    keywords: ["Cloud Migration", "AI Pipeline", "Data Syncing", "Enterprise SLA", "SOC 2 Audit", "Kubernetes Clustering"],
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.desc,
      type: "website"
    }
  };
}

// 3. Page component unwrapping dynamic routes promise safely under Next.js 16 App Router standards
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <ServiceDetailClient slug={resolvedParams.slug} />;
}
