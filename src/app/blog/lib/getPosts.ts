// import { BlogPost } from "./postsData";
// import { Laptop, BarChart, Workflow, ShieldCheck } from "lucide-react";

// export async function getWordPressPosts(): Promise<BlogPost[]> {
//     try {
//         const res = await fetch(
//             "https://s3bglobal.com/wp-json/wp/v2/posts?per_page=100&orderby=date&order=desc",
//             {
//                 next: { revalidate: 3600 }, // cache for 1 hour on server
//             }
//         );
//         if (!res.ok) return [];
//         const wpPosts = await res.json();

//         const seen = new Set<string>();
//         const mapped: BlogPost[] = [];

//         for (const wp of wpPosts) {
//             const slug = wp.slug;
//             if (!slug || seen.has(slug)) continue;
//             seen.add(slug);

//             const title = wp.title?.rendered || "";
//             const content = wp.content?.rendered || "";
//             const excerpt = wp.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "";
//             const image =
//                 wp.yoast_head_json?.og_image?.[0]?.url ||
//                 "https://s3bglobal.com/wp-content/uploads/2025/05/Media.jpg";
//             const dateStr = new Date(wp.date).toLocaleDateString("en-US", {
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//             });
//             const readTime =
//                 Math.max(
//                     1,
//                     Math.round(
//                         content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200
//                     )
//                 ) + " min read";

//             const text = (title + " " + content).toLowerCase();
//             let category: BlogPost["category"] = "Web & Mobile";
//             let color = "from-emerald-500/10 to-teal-500/10 border-emerald-500/20";
//             let accent = "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400";
//             let icon: BlogPost["icon"] = Laptop;

//             if (
//                 text.includes("security") ||
//                 text.includes("protocol") ||
//                 text.includes("mcp")
//             ) {
//                 category = "Security";
//                 color = "from-violet-500/10 to-indigo-500/10 border-violet-500/20";
//                 accent = "text-violet-500 bg-violet-500/10 dark:text-violet-400";
//                 icon = ShieldCheck;
//             } else if (
//                 text.includes("machine learning") ||
//                 text.includes("neural") ||
//                 text.includes("deep learning")
//             ) {
//                 category = "Machine Learning";
//                 color = "from-rose-500/10 to-orange-500/10 border-rose-500/20";
//                 accent = "text-rose-500 bg-rose-500/10 dark:text-rose-400";
//                 icon = Workflow;
//             } else if (
//                 text.includes("marketing") ||
//                 text.includes("seo") ||
//                 text.includes("ppc")
//             ) {
//                 category = "Digital Marketing";
//                 color = "from-purple-500/10 to-pink-500/10 border-purple-500/20";
//                 accent = "text-purple-500 bg-purple-500/10 dark:text-purple-400";
//                 icon = BarChart;
//             }

//             mapped.push({
//                 id: wp.id,
//                 title,
//                 excerpt,
//                 content,
//                 category,
//                 date: dateStr,
//                 author: "admin",
//                 url: wp.link || `https://s3bglobal.com/${slug}/`,
//                 readTime,
//                 color,
//                 accent,
//                 icon,
//                 image,
//                 slug,
//             });
//         }

//         return mapped;
//     } catch (err) {
//         console.error("Failed to fetch WP posts:", err);
//         return [];
//     }
// }