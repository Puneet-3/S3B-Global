import { BlogPost } from "../postsData";

// Helper function to fetch URLs with retry logic and exponential backoff
async function fetchWithRetry(url: string, options: RequestInit, retries = 3, delay = 1000): Promise<Response> {
    try {
        const res = await fetch(url, options);
        if (!res.ok && retries > 0) {
            console.warn(`Fetch to ${url} returned status ${res.status}. Retrying in ${delay}ms... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 1.5);
        }
        return res;
    } catch (err) {
        if (retries > 0) {
            console.warn(`Fetch to ${url} failed with error: ${err}. Retrying in ${delay}ms... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 1.5);
        }
        throw err;
    }
}

export async function getWordPressPosts(): Promise<BlogPost[]> {
    try {
        const res = await fetchWithRetry(
            "https://s3bglobal.com/wp-json/wp/v2/posts?per_page=100&orderby=date&order=desc",
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
                next: { revalidate: 3600 }, // cache for 1 hour on server
            }
        );
        if (!res.ok) return [];
        const wpPosts = await res.json();

        const seen = new Set<string>();
        const mapped: BlogPost[] = [];

        for (const wp of wpPosts) {
            const slug = wp.slug;
            if (!slug || seen.has(slug)) continue;
            seen.add(slug);

            const title = wp.title?.rendered || "";
            const content = wp.content?.rendered || "";
            const excerpt = wp.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "";
            const image =
                wp.yoast_head_json?.og_image?.[0]?.url ||
                "https://s3bglobal.com/wp-content/uploads/2025/05/Media.jpg";
            const dateStr = new Date(wp.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
            const readTime =
                Math.max(
                    1,
                    Math.round(
                        content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200
                    )
                ) + " min read";

            const text = (title + " " + content).toLowerCase();
            let category: BlogPost["category"] = "Web & Mobile";
            let color = "from-emerald-500/10 to-teal-500/10 border-emerald-500/20";
            let accent = "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400";

            if (
                text.includes("security") ||
                text.includes("protocol") ||
                text.includes("mcp")
            ) {
                category = "Security";
                color = "from-violet-500/10 to-indigo-500/10 border-violet-500/20";
                accent = "text-violet-500 bg-violet-500/10 dark:text-violet-400";
            } else if (
                text.includes("machine learning") ||
                text.includes("neural") ||
                text.includes("deep learning")
            ) {
                category = "Machine Learning";
                color = "from-rose-500/10 to-orange-500/10 border-rose-500/20";
                accent = "text-rose-500 bg-rose-500/10 dark:text-rose-400";
            } else if (
                text.includes("marketing") ||
                text.includes("seo") ||
                text.includes("ppc")
            ) {
                category = "Digital Marketing";
                color = "from-purple-500/10 to-pink-500/10 border-purple-500/20";
                accent = "text-purple-500 bg-purple-500/10 dark:text-purple-400";
            }

            mapped.push({
                id: wp.id,
                title,
                excerpt,
                content,
                category,
                date: dateStr,
                author: "admin",
                url: wp.link || `https://s3bglobal.com/${slug}/`,
                readTime,
                color,
                accent,
                image,
                slug,
            });
        }

        return mapped;
    } catch (err) {
        console.error("Failed to fetch WP posts:", err);
        return [];
    }
}

export async function getWordPressPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const res = await fetchWithRetry(
            `https://s3bglobal.com/wp-json/wp/v2/posts?slug=${slug}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
                next: { revalidate: 3600 }, // cache for 1 hour on server
            }
        );
        if (!res.ok) return null;
        const wpPosts = await res.json();
        if (wpPosts.length === 0) return null;

        const wp = wpPosts[0];
        const title = wp.title?.rendered || "";
        const content = wp.content?.rendered || "";
        const excerpt = wp.excerpt?.rendered?.replace(/<[^>]*>/g, "") || "";
        const image =
            wp.yoast_head_json?.og_image?.[0]?.url ||
            "https://s3bglobal.com/wp-content/uploads/2025/05/Media.jpg";
        const dateStr = new Date(wp.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        const readTime =
            Math.max(
                1,
                Math.round(
                    content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200
                )
            ) + " min read";

        const text = (title + " " + content).toLowerCase();
        let category: BlogPost["category"] = "Web & Mobile";
        let color = "from-emerald-500/10 to-teal-500/10 border-emerald-500/20";
        let accent = "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400";

        if (
            text.includes("security") ||
            text.includes("protocol") ||
            text.includes("mcp")
        ) {
            category = "Security";
            color = "from-violet-500/10 to-indigo-500/10 border-violet-500/20";
            accent = "text-violet-500 bg-violet-500/10 dark:text-violet-400";
        } else if (
            text.includes("machine learning") ||
            text.includes("neural") ||
            text.includes("deep learning")
        ) {
            category = "Machine Learning";
            color = "from-rose-500/10 to-orange-500/10 border-rose-500/20";
            accent = "text-rose-500 bg-rose-500/10 dark:text-rose-400";
        } else if (
            text.includes("marketing") ||
            text.includes("seo") ||
            text.includes("ppc")
        ) {
            category = "Digital Marketing";
            color = "from-purple-500/10 to-pink-500/10 border-purple-500/20";
            accent = "text-purple-500 bg-purple-500/10 dark:text-purple-400";
        }

        return {
            id: wp.id,
            title,
            excerpt,
            content,
            category,
            date: dateStr,
            author: "admin",
            url: wp.link || `https://s3bglobal.com/${slug}/`,
            readTime,
            color,
            accent,
            image,
            slug,
        };
    } catch (err) {
        console.error(`Failed to fetch WP post by slug ${slug}:`, err);
        return null;
    }
}