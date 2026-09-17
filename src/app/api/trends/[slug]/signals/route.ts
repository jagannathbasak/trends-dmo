import { NextResponse, type NextRequest } from "next/server";
import { getTrendBySlug, getTrendSignals } from "@/lib/trends/api";

export async function GET(request: NextRequest, ctx: RouteContext<"/api/trends/[slug]/signals">) {
  const { slug } = await ctx.params;

  if (!getTrendBySlug(slug)) {
    return NextResponse.json({ error: `No trend found for slug "${slug}"` }, { status: 404 });
  }

  const params = request.nextUrl.searchParams;
  const result = getTrendSignals(slug, {
    type: params.get("type") ?? undefined,
    cursor: params.get("cursor") ?? undefined,
    limit: 5,
  });

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
  });
}
