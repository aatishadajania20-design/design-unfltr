export default function robots() {
  return {
    rules: [
      // Default: all crawlers allowed, admin + API blocked
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Explicit allowances for AI search-and-cite bots (ChatGPT, Perplexity, Claude, Gemini)
      { userAgent: "GPTBot",          allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "ChatGPT-User",    allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "PerplexityBot",   allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "ClaudeBot",       allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "anthropic-ai",    allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin", "/api/"] },
      // Block Common Crawl training-only bot (not a search-and-cite crawler)
      { userAgent: "CCBot",           disallow: "/" },
    ],
    sitemap: "https://unfltrstudio.in/sitemap.xml",
    host: "https://unfltrstudio.in",
  };
}