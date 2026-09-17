import { NextResponse, type NextRequest } from "next/server";
import { getTrendSections, normalizeQuery } from "@/lib/trends/api";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = normalizeQuery({
    q: params.get("q"),
    category: params.get("category"),
    horizon: params.get("horizon"),
    geo: params.get("geo"),
    tier: params.get("tier"),
    sort: params.get("sort"),
  });

  const sections = getTrendSections(query);

  return NextResponse.json(sections, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
  });
}
