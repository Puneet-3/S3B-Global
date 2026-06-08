import React from "react";
import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { BLOG_POSTS } from "../postsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Pre-render static paths for high performance and Next.js static export compliance
export async function generateStaticParams() {
  const staticSlugs = BLOG_POSTS.map(p => ({
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  }));

  try {
    const res = await fetch("https://s3bglobal.com/wp-json/wp/v2/posts?per_page=100");
    if (res.ok) {
      const wpPosts = await res.json();
      const liveSlugs = wpPosts.map((post: any) => ({
        slug: post.slug || post.title?.rendered?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || ""
      }));
      
      const allSlugsMap = new Map<string, { slug: string }>();
      staticSlugs.forEach((s: { slug: string }) => allSlugsMap.set(s.slug, s));
      liveSlugs.forEach((s: { slug: string }) => {
        if (s.slug) allSlugsMap.set(s.slug, s);
      });
      return Array.from(allSlugsMap.values());
    }
  } catch (err) {
    console.error("Failed to generate static params from WP API:", err);
  }

  return staticSlugs;
}

// 2. Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Find in static posts
  const matchedStaticPost = BLOG_POSTS.find(p => {
    const postSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return postSlug === slug;
  });

  if (matchedStaticPost) {
    return {
      title: `${matchedStaticPost.title} - S3B Global`,
      description: matchedStaticPost.excerpt,
      openGraph: {
        title: `${matchedStaticPost.title} - S3B Global`,
        description: matchedStaticPost.excerpt,
        images: [{ url: matchedStaticPost.image }]
      }
    };
  }

  // Otherwise, default/dynamic metadata values
  return {
    title: "Blog Details - S3B Global",
    description: "Read our latest news, software engineering milestones, and AI capabilities."
  };
}

// 3. Dynamic Page Entry Component
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <BlogDetailClient slug={resolvedParams.slug} />;
}
