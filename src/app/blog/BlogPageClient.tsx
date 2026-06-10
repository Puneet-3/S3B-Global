"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Search,
  BookOpen,
  X,
  AlertCircle,
  ArrowRight,
  Clock,
  User,
  ShieldCheck,
  Laptop,
  Workflow,
  BarChart
} from "lucide-react";

import { type BlogPost } from "./postsData";

const CATEGORIES = ["All", "Web & Mobile", "Digital Marketing", "Machine Learning", "Security"] as const;

function getCategoryIcon(category: string) {
  switch (category) {
    case "Security":
      return ShieldCheck;
    case "Machine Learning":
      return Workflow;
    case "Digital Marketing":
      return BarChart;
    case "Web & Mobile":
    default:
      return Laptop;
  }
}

interface BlogPageClientProps {
  initialPosts: BlogPost[];
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [allPosts] = useState<BlogPost[]>(initialPosts);

  // Compute filtered and sorted posts dynamically on render to avoid cascading state updates
  const filteredPosts = (() => {
    let results = allPosts;

    if (selectedCategory !== "All") {
      results = results.filter(post => post.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    return [...results].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  })();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-300">
      {/* 1. Global Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-24 md:pt-28 transition-colors duration-300">
        {/* Curved Header Banner Section */}
        <div className="w-full relative bg-gradient-to-r from-blue-50/50 via-indigo-50/20 to-white dark:from-white/[0.01] dark:via-white/[0.005] dark:to-transparent border-b border-card-border overflow-hidden px-8 py-20 md:py-24 rounded-b-[40px] select-none">
          {/* Nested concentric tracks background */}
          <svg className="absolute right-0 top-0 h-full w-[45%] text-[#177EB9]/10 dark:text-white/5 pointer-events-none -z-10" viewBox="0 0 300 300" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M300,50 C200,50 150,100 150,200 C150,300 150,300 150,300" />
            <path d="M300,75 C215,75 175,115 175,200 C175,300 175,300 175,300" />
            <path d="M300,100 C230,100 200,130 200,200 C200,300 200,300 200,300" />
            <path d="M300,125 C245,125 225,145 225,200 C225,300 225,300 225,300" />
            <path d="M300,150 C260,150 250,160 250,200 C250,300 250,300 250,300" />
          </svg>
          <div className="max-w-5xl mx-auto space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-card-bg border border-card-border shadow-sm">
              <BookOpen className="h-3.5 w-3.5 text-[#10b981]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                NEWS & INSIGHTS
              </span>
            </div>
            <h1 className="text-3xl md:text-[54.4px] font-light text-[#0A0D53] dark:text-white tracking-tight leading-tight">
              S3B Global Blog
            </h1>
            <p className="text-[16px] text-text-muted leading-relaxed max-w-2xl font-light">
              Stay informed on current trends in the IT world. Discover our latest software engineering milestones, full-stack development tutorials, digital marketing insights, and AI capabilities.
            </p>
          </div>
        </div>

        {/* Content sections inside standard w-full container */}
        <div className="w-full mx-auto px-6 lg:px-12 py-20 space-y-16">
          {/* Section 2: Search & Categorical Category Filters */}
          <ScrollReveal delay={100} className="w-full space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full mx-auto bg-card-bg/25 border border-card-border p-6 rounded-3xl backdrop-blur-md shadow-md">
              {/* Dynamic search bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/40" />
                <input
                  type="text"
                  placeholder="Search articles by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-full border border-card-border/80 bg-card-bg/60 text-sm font-light text-text-title placeholder-text-muted/75 focus:outline-none focus:border-[#1d70b8] dark:focus:border-cyan-400 focus:ring-1 focus:ring-[#1d70b8]/30 dark:focus:ring-cyan-400/30 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-text-title transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Articles Count indicator */}
              <div className="shrink-0 font-mono text-xs font-normal text-text-muted bg-card-bg/80 border border-card-border/80 px-4 py-2.5 rounded-full select-none shadow-sm flex items-center gap-2">
                <span>PUBLISHED INSIGHTS:</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-bold text-[#10b981]">{filteredPosts.length}</span>
              </div>
            </div>

            {/* Category Navigation buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full mx-auto">
              {CATEGORIES.map((cat, idx) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full border text-[11px] font-normal uppercase tracking-wider transition-all duration-300 cursor-pointer select-none font-mono ${isActive
                      ? "bg-[#125492]/10 dark:bg-cyan-400/10 border-[#125492] dark:border-cyan-400 text-[#125492] dark:text-cyan-400 shadow-[0_4px_16px_rgba(34,211,238,0.12)] scale-[1.01]"
                      : "bg-card-bg/40 border-card-border text-text-muted hover:border-[#125492] dark:hover:border-cyan-400 hover:bg-card-bg-hover hover:text-text-title"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {filteredPosts.length > 0 ? (
            <div className="w-full mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full select-none">
                {filteredPosts.map((post, idx) => {
                  const Icon = getCategoryIcon(post.category);
                  const postUrl = `/blog/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
                  return (
                    <ScrollReveal
                      key={post.id}
                      delay={(idx % 3) * 80}
                      className="group liquid-glass-glowing bg-card-bg/30 border border-card-border/60 rounded-[2rem] flex flex-col justify-between hover:-translate-y-1 hover:border-card-border-hover/80 hover:shadow-xl text-left relative overflow-hidden transition-all duration-500"
                    >
                      {/* Premium Image Header */}
                      <Link
                        href={postUrl}
                        className="relative w-full aspect-[16/9] overflow-hidden bg-black/10 border-b border-card-border/20 block"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-60 pointer-events-none" />
                        <span className="absolute top-4 right-4 text-[9px] font-mono font-medium uppercase tracking-widest text-text-title bg-background/85 border border-card-border/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </Link>

                      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-4">
                          {/* Blog Header row */}
                          <div className="flex items-start justify-between space-x-3">
                            <div className={`p-2.5 rounded-xl ${post.accent} border border-white/[0.04] shrink-0`}>
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                          </div>

                          {/* Blog Info */}
                          <div className="space-y-3">
                            <Link href={postUrl} className="block">
                              <h3 className="text-[18.5px] font-semibold text-text-title tracking-tight leading-snug group-hover:text-[#1d70b8] dark:hover:text-cyan-400 transition-colors duration-300">
                                {post.title}
                              </h3>
                            </Link>
                            <div className="text-[13px] md:text-[13.5px] text-text-muted/70 leading-relaxed font-sans font-normal line-clamp-3 overflow-hidden">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-5">
                          {/* Metadata Row */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted/60 pt-4 border-t border-card-border/20">
                            <div className="flex items-center space-x-1.5">
                              <Clock className="h-3.5 w-3.5 text-text-muted/30 shrink-0" />
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <User className="h-3.5 w-3.5 text-text-muted/30 shrink-0" />
                              <span>{post.date}</span>
                            </div>
                          </div>

                          {/* Bottom CTA to redirect to dynamic slug page */}
                          <div>
                            <Link
                              href={postUrl}
                              className="relative w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full text-xs font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer"
                            >
                              <span className="relative z-10 flex items-center justify-between w-full">
                                <span>Read Full Article</span>
                                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ) : (
            /* No Results view */
            <ScrollReveal className="text-center py-16 bg-card-bg/20 border border-card-border border-dashed rounded-3xl max-w-xl mx-auto space-y-3 select-none">
              <AlertCircle className="h-10 w-10 text-[#1d70b8] dark:text-cyan-400 mx-auto animate-bounce" />
              <h3 className="text-[24px] font-bold text-text-title">No Articles Match Your Query</h3>
              <p className="text-[14px] text-text-muted max-w-sm mx-auto leading-relaxed font-light">
                Try searching for other software technologies or reset your filters to browse all published insights.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-full bg-[#1d70b8] hover:bg-blue-600 dark:bg-cyan-400 dark:hover:bg-cyan-500 text-white dark:text-slate-900 font-mono text-[10px] font-bold transition-all shadow cursor-pointer mt-2"
              >
                Reset Filters
              </button>
            </ScrollReveal>
          )}
        </div>
      </main>

      {/* 3. Global Sitemap Footer */}
      <Footer />
    </div>
  );
}
