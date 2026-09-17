export interface Category {
  slug: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { slug: "markets", label: "Markets" },
  { slug: "technology", label: "Technology" },
  { slug: "ai", label: "AI" },
  { slug: "finance", label: "Finance" },
  { slug: "startups", label: "Startups" },
  { slug: "consumer-behaviour", label: "Consumer behaviour" },
  { slug: "industry", label: "Industry" },
  { slug: "science", label: "Science" },
  { slug: "energy", label: "Energy" },
  { slug: "health", label: "Health" },
];

const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function categoryLabel(slug: string): string {
  return CATEGORY_BY_SLUG.get(slug)?.label ?? slug;
}

export function isCategorySlug(value: string): boolean {
  return CATEGORY_BY_SLUG.has(value);
}
