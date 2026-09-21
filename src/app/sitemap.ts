import type { MetadataRoute } from "next";
import { FIXTURE_TRENDS } from "@/fixtures/trends.fixture";
import { SITE_URL } from "@/lib/site";
import { CATEGORIES } from "@/lib/trends/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/trends`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(({ slug }) => ({
    url: `${SITE_URL}/trends/category/${slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const trendPages: MetadataRoute.Sitemap = FIXTURE_TRENDS.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/trends/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...trendPages];
}
