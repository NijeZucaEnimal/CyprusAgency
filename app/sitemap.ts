import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { properties } from "@/data/properties";
import { articles } from "@/data/blog";
import { cities } from "@/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ["", "/nekretnine", "/blog", "/o-nama", "/kontakt"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const propertyPaths = properties.map((p) => ({
    url: `${site.url}/nekretnine/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePaths = articles.map((a) => ({
    url: `${site.url}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cityPaths = cities.map((c) => ({
    url: `${site.url}/nekretnine?grad=${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPaths, ...propertyPaths, ...articlePaths, ...cityPaths];
}
