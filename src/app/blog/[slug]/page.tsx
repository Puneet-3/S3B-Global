import React from "react";
import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { getWordPressPostBySlug } from "../lib/getPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Pre-render static paths — pulls real slugs from WordPress every 1 hour
export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://s3bglobal.com/wp-json/wp/v2/posts?per_page=100&_fields=slug",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 }
      }
    );
    if (!res.ok) return [];
    const posts = await res.json();
    return posts
      .filter((p: any) => !!p.slug)
      .map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// 2. Generate Metadata — pulls Yoast SEO data directly from WordPress
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `https://s3bglobal.com/wp-json/wp/v2/posts?slug=${slug}&_fields=title,excerpt,yoast_head_json`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 }
      }
    );
    if (!res.ok) throw new Error();
    const posts = await res.json();
    if (!posts.length) throw new Error();

    const post = posts[0];
    const yoast = post.yoast_head_json;

    return {
      title: yoast?.title || `${post.title?.rendered} - S3B Global`,
      description: yoast?.description || post.excerpt?.rendered?.replace(/<[^>]*>/g, ""),
      openGraph: {
        title: yoast?.og_title || post.title?.rendered,
        description: yoast?.og_description || "",
        images: yoast?.og_image?.[0]?.url
          ? [{ url: yoast.og_image[0].url }]
          : [],
        type: "article",
        publishedTime: yoast?.article_published_time,
      },
      twitter: {
        card: "summary_large_image",
        title: yoast?.og_title || post.title?.rendered,
        description: yoast?.og_description || "",
        images: yoast?.og_image?.[0]?.url
          ? [yoast.og_image[0].url]
          : [],
      }
    };
  } catch {
    return {
      title: "Blog - S3B Global",
      description: "Read our latest insights on AI, cloud, and digital transformation."
    };
  }
}

// 3. Dynamic Page Entry Component
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getWordPressPostBySlug(resolvedParams.slug);
  return <BlogDetailClient slug={resolvedParams.slug} initialPost={post || undefined} />;
}