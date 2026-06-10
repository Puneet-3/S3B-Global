import React from "react";
import { Metadata } from "next";
import { getWordPressPosts } from "./lib/getPosts";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog - S3B Global",
  description: "Stay informed on current trends in the IT world. Discover our latest software engineering milestones, full-stack development tutorials, digital marketing insights, and AI capabilities.",
};

// Next.js static generation options: revalidate the data every 1 hour (ISR)
export const revalidate = 3600;

export default async function Page() {
  // Fetch WP blog posts on the server
  const posts = await getWordPressPosts();

  return <BlogPageClient initialPosts={posts} />;
}
