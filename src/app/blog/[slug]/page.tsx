import React from "react";
import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { getWordPressPostBySlug, fetchWithRetry } from "../lib/getPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

// 2. Generate Metadata — uses the mocked WordPress post loader (which uses static local posts)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getWordPressPostBySlug(slug);
    if (!post) throw new Error();

    return {
      title: `${post.title} - S3B Global`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.image ? [{ url: post.image }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.image ? [post.image] : [],
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