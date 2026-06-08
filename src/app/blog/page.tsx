"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Search, 
  BookOpen, 
  MapPin, 
  Activity, 
  Sparkles, 
  Cpu, 
  Database, 
  Users, 
  Workflow, 
  X, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Lock, 
  FileText,
  ArrowRight,
  Clock,
  User,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Laptop,
  Globe,
  Palette,
  Target,
  Navigation,
  TrendingUp,
  Shield,
  ShieldAlert,
  Flame,
  Key,
  HelpCircle,
  Cloud,
  BarChart,
  Layers
} from "lucide-react";

import { BLOG_POSTS, type BlogPost } from "./postsData";



const CATEGORIES = ["All", "Web & Mobile", "Digital Marketing", "Machine Learning", "Security"] as const;

const renderFormattedContent = (content: string) => {
  if (!content) return null;
  
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inList = false;

  const parseInlineMarkdown = (text: string) => {
    let parsed = text;
    // Bold: **text** -> <strong>text</strong>
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, "<strong class=\"font-bold text-text-title\">$1</strong>");
    // Links: [text](url) -> <a href="url" target="_blank" class="...">text</a>
    parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#1d70b8] dark:text-cyan-400 hover:underline font-semibold">$1</a>');
    return parsed;
  };

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
    
    // If it's a list item
    if (trimmed.startsWith("•") || trimmed.startsWith("-") || (trimmed.startsWith("*") && !trimmed.endsWith("*"))) {
      const itemText = trimmed.replace(/^[•\-*]\s*/, "");
      inList = true;
      listItems.push(itemText);
      return;
    }
    
    // If we were in a list, but this line is not a list item
    if (inList && !trimmed.startsWith("•") && !trimmed.startsWith("-") && !trimmed.startsWith("*")) {
      flushList(idx);
    }
    
    if (trimmed === "") return;
    
    // Headings
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
      // Regular Paragraph
      elements.push(
        <p 
          key={`p-${idx}`} 
          className="text-[15px] md:text-[17px] text-text-muted leading-relaxed font-normal mb-5 font-sans"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmed) }}
        />
      );
    }
  });
  
  // Flush any remaining list items at the end
  if (inList) {
    flushList("final");
  }
  
  return <div className="space-y-2">{elements}</div>;
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => 
    BLOG_POSTS.map(p => ({
      ...p,
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    }))
  );

  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(() => 
    [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  useEffect(() => {
    document.title = "Blog - S3B Global";
  }, []);

  // Fetch posts from S3B Global WordPress API in realtime
  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await fetch("https://s3bglobal.com/wp-json/wp/v2/posts?per_page=100");
        if (!res.ok) return;
        const wpPosts = await res.json();
        
        const mappedLivePosts = wpPosts.map((wpPost: any) => {
          const title = wpPost.title?.rendered || "";
          const content = wpPost.content?.rendered || "";
          const excerpt = wpPost.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "";
          const slug = wpPost.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          
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

          return {
            id: wpPost.id,
            title,
            excerpt,
            content,
            category,
            date: dateStr,
            author: "admin",
            url: wpPost.link || `https://s3bglobal.com/${slug}/`,
            readTime,
            color,
            accent,
            icon,
            image,
            slug
          };
        });

        // Merge and deduplicate by slug
        setAllPosts(prev => {
          const uniqueMap = new Map();
          // Add existing ones first
          prev.forEach(p => {
            const s = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            uniqueMap.set(s, { ...p, slug: s });
          });
          // Add fetched ones, overriding if same slug
          mappedLivePosts.forEach((p: any) => {
            uniqueMap.set(p.slug, p);
          });
          return Array.from(uniqueMap.values());
        });
      } catch (err) {
        console.error("Failed to fetch live blogs:", err);
      }
    };

    fetchLiveBlogs();
  }, []);

  // Filtering & Sorting Logic
  useEffect(() => {
    let results = allPosts;
    
    // 1. Category filter
    if (selectedCategory !== "All") {
      results = results.filter(post => post.category === selectedCategory);
    }
    
    // 2. Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    // 3. Sort by date (newest first)
    const sortedResults = [...results].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setFilteredPosts(sortedResults);
  }, [searchQuery, selectedCategory, allPosts]);

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
                    className={`px-5 py-2.5 rounded-full border text-[11px] font-normal uppercase tracking-wider transition-all duration-300 cursor-pointer select-none font-mono ${
                      isActive 
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
                  const Icon = post.icon;
                  return (
                    <ScrollReveal
                      key={post.id}
                      delay={(idx % 3) * 80}
                      className="group liquid-glass-glowing bg-card-bg/30 border border-card-border/60 rounded-[2rem] flex flex-col justify-between hover:-translate-y-1 hover:border-card-border-hover/80 hover:shadow-xl text-left relative overflow-hidden transition-all duration-500"
                    >
                      {/* Premium Image Header */}
                      <a 
                        href={`/blog/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
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
                      </a>

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
                            <a 
                              href={`/blog/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                              className="block"
                            >
                              <h3 className="text-[18.5px] font-semibold text-text-title tracking-tight leading-snug group-hover:text-[#1d70b8] dark:hover:text-cyan-400 transition-colors duration-300">
                                {post.title}
                              </h3>
                            </a>
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
                            <a
                              href={`/blog/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                              className="relative w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full text-xs font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer"
                            >
                              <span className="relative z-10 flex items-center justify-between w-full">
                                <span>Read Full Article</span>
                                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </a>
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
