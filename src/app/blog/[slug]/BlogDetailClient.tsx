"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { BLOG_POSTS, type BlogPost } from "../postsData";
import {
  Clock,
  User,
  ArrowLeft,
  Laptop,
  BarChart,
  Workflow,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

// Inline helper to parse basic markdown tags (bold and links)
const parseInlineMarkdown = (text: string) => {
  let parsed = text;
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, "<strong class=\"font-bold text-text-title\">$1</strong>");
  parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#1d70b8] dark:text-cyan-400 hover:underline font-semibold">$1</a>');
  return parsed;
};

// Markdown content renderer
const renderFormattedContent = (content: string) => {
  if (!content) return null;

  if (content.trim().startsWith("<p>") || content.trim().startsWith("<h2>") || content.trim().includes("</p>") || content.trim().includes("</h2>")) {
    return <div dangerouslySetInnerHTML={{ __html: content }} className="prose dark:prose-invert max-w-none text-[15px] md:text-[17px] text-text-muted leading-relaxed font-normal mb-5 space-y-6" />;
  }

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushList = (key: string | number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-disc pl-6 space-y-2.5 my-5 text-[15px] md:text-[17px] text-text-muted font-normal">
          {listItems.map((item, i) => (
            <li
              key={i}
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }}
            />
          ))}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("•") || trimmed.startsWith("-") || (trimmed.startsWith("*") && !trimmed.endsWith("*"))) {
      const itemText = trimmed.replace(/^[•\-*]\s*/, "");
      inList = true;
      listItems.push(itemText);
      return;
    }

    if (inList && !trimmed.startsWith("•") && !trimmed.startsWith("-") && !trimmed.startsWith("*")) {
      flushList(idx);
    }

    if (trimmed === "") return;

    if (trimmed.startsWith("###")) {
      const headingText = trimmed.replace(/^###\s*/, "");
      elements.push(
        <h4
          key={`h4-${idx}`}
          className="text-lg md:text-xl font-bold text-text-title mt-8 mb-4 tracking-tight border-b border-card-border/30 pb-2 font-sans"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(headingText) }}
        />
      );
    } else if (trimmed.startsWith("##")) {
      const headingText = trimmed.replace(/^##\s*/, "");
      elements.push(
        <h3
          key={`h3-${idx}`}
          className="text-xl md:text-2xl font-extrabold text-text-title mt-10 mb-4 tracking-tight border-b border-card-border/55 pb-2.5 font-sans"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(headingText) }}
        />
      );
    } else if (trimmed.startsWith("#")) {
      const headingText = trimmed.replace(/^#\s*/, "");
      elements.push(
        <h2
          key={`h2-${idx}`}
          className="text-2xl md:text-3xl font-black text-text-title mt-12 mb-6 tracking-tight font-sans"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(headingText) }}
        />
      );
    } else {
      elements.push(
        <p
          key={`p-${idx}`}
          className="text-[15px] md:text-[17px] text-text-muted leading-relaxed font-normal mb-5 font-sans"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmed) }}
        />
      );
    }
  });

  if (inList) {
    flushList("final");
  }

  return <div className="space-y-2">{elements}</div>;
};

interface BlogDetailClientProps {
  slug: string;
  initialPost?: BlogPost;
}

export default function BlogDetailClient({ slug, initialPost }: BlogDetailClientProps) {
  const [post, setPost] = useState<BlogPost | null>(initialPost || null);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (initialPost && (initialPost.slug === slug || !slug)) {
        setPost(initialPost);
        setLoading(false);
        if (typeof document !== "undefined") {
          document.title = `${initialPost.title} - S3B Global`;
        }
        return;
      }
      setLoading(true);
      setError(false);

      try {
        const blogSlug = slug || "";

        // Client-side WordPress fetch bypassed for the first push/deployment
        /*
        const res = await fetch(`https://s3bglobal.com/wp-json/wp/v2/posts?slug=${blogSlug}`);
        if (res.ok) {
          const wpPosts = await res.json();
          if (wpPosts.length > 0) {
            const wpPost = wpPosts[0];
            const title = wpPost.title?.rendered || "";
            const content = wpPost.content?.rendered || "";
            const excerpt = wpPost.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "";

            // Heuristic for category classification
            let category: BlogPost["category"] = "Web & Mobile";
            const textToScan = (title + " " + content).toLowerCase();
            if (textToScan.includes("ai") || textToScan.includes("intelligence") || textToScan.includes("learning") || textToScan.includes("model")) {
              category = "Machine Learning";
            } else if (textToScan.includes("marketing") || textToScan.includes("seo") || textToScan.includes("ppc") || textToScan.includes("digital")) {
              category = "Digital Marketing";
            } else if (textToScan.includes("security") || textToScan.includes("protocol") || textToScan.includes("mcp") || textToScan.includes("lock")) {
              category = "Security";
            }

            let color = "from-emerald-500/10 to-teal-500/10 border-emerald-500/20";
            let accent = "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400";
            let icon = Laptop;

            if (category === "Digital Marketing") {
              color = "from-purple-500/10 to-pink-500/10 border-purple-500/20";
              accent = "text-purple-500 bg-purple-500/10 dark:text-purple-400";
              icon = BarChart;
            } else if (category === "Machine Learning") {
              color = "from-rose-500/10 to-orange-500/10 border-rose-500/20";
              accent = "text-rose-500 bg-rose-500/10 dark:text-rose-400";
              icon = Workflow;
            } else if (category === "Security") {
              color = "from-violet-500/10 to-indigo-500/10 border-violet-500/20";
              accent = "text-violet-500 bg-violet-500/10 dark:text-violet-400";
              icon = ShieldCheck;
            }

            const rawDate = new Date(wpPost.date);
            const dateStr = rawDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            });

            const readTime = Math.max(1, Math.round(content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200)) + " min read";
            const image = wpPost.yoast_head_json?.og_image?.[0]?.url || "https://s3bglobal.com/wp-content/uploads/2025/05/Media.jpg";

            setPost({
              id: wpPost.id,
              title,
              excerpt,
              content,
              category,
              date: dateStr,
              author: "admin",
              url: wpPost.link || "https://s3bglobal.com/",
              readTime,
              color,
              accent,
              icon,
              image,
              slug: blogSlug
            });
            document.title = `${title} - S3B Global`;
            setLoading(false);
            return;
          }
        }
        */

        // 2. Fallback: Search static BLOG_POSTS locally by generating slug dynamically
        const matchedStaticPost = BLOG_POSTS.find(p => {
          const postSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return postSlug === blogSlug;
        });

        if (matchedStaticPost) {
          setPost(matchedStaticPost);
          document.title = `${matchedStaticPost.title} - S3B Global`;
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, initialPost]);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1 w-full pt-28 md:pt-32 pb-24 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 space-y-10">

          {/* Back Button */}
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-blue hover:text-brand-blue/80 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="h-4.5 w-4.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Blog</span>
            </Link>
          </ScrollReveal>

          {loading ? (
            /* Loading State */
            <div className="py-24 text-center space-y-4">
              <div className="inline-block w-8 h-8 border-4 border-brand-blue/30 border-t-brand-blue dark:border-cyan-400/30 dark:border-t-cyan-400 rounded-full animate-spin" />
              <p className="text-text-muted font-mono text-xs uppercase tracking-wider animate-pulse">
                Fetching article payload...
              </p>
            </div>
          ) : error || !post ? (
            /* Error / Not Found State */
            <ScrollReveal className="text-center py-20 bg-card-bg/20 border border-card-border border-dashed rounded-3xl max-w-xl mx-auto space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-text-title">Article Not Found</h3>
              <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
                The article you are looking for does not exist or has been removed from the platform.
              </p>
              <Link
                href="/blog"
                className="inline-block px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 dark:bg-cyan-400 dark:hover:bg-cyan-500 text-white dark:text-slate-900 font-mono text-xs font-bold transition-all shadow"
              >
                Back to Articles
              </Link>
            </ScrollReveal>
          ) : (
            /* Article View */
            <article className="space-y-8">

              {/* Header Info */}
              <ScrollReveal className="space-y-4">
                <div className="flex flex-wrap gap-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#10b981] bg-[#10b981]/10 px-3.5 py-1.5 rounded-full border border-[#10b981]/20 shadow-sm">
                    {post.category}
                  </span>
                  <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border text-text-muted text-[10px] font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.date} · {post.readTime}</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-text-title tracking-tight leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center space-x-2 pt-2 text-[12px] font-mono text-text-muted">
                  <User className="h-4 w-4 text-[#10b981]" />
                  <span>Written by <span className="font-bold text-text-title">{post.author}</span></span>
                </div>
              </ScrollReveal>

              {/* Featured Image */}
              <ScrollReveal delay={100}>
                <div className="relative w-full h-[250px] sm:h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden bg-black/10 border border-card-border/30 shadow-md">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>

              {/* Content body */}
              <ScrollReveal delay={150} className="prose dark:prose-invert max-w-none pt-4">
                {renderFormattedContent(post.content)}
              </ScrollReveal>

            </article>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
