import { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/blog"].map((route) => ({
    url: `${seoConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
