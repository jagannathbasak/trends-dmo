import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrendDetailView from "@/components/trends/TrendDetailView";
import { getTrendBySlug } from "@/lib/trends/api";
import type { Horizon } from "@/types/trends";

const VALID_HORIZONS: Horizon[] = ["30d", "6mo", "12mo", "3yr"];

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TrendDetailPage(props: PageProps<"/trends/[slug]">) {
  const [{ slug }, searchParams] = await Promise.all([props.params, props.searchParams]);

  const detail = getTrendBySlug(slug);
  if (!detail) {
    notFound();
  }

  const rawHorizon = firstValue(searchParams.horizon);
  const horizon: Horizon = VALID_HORIZONS.includes(rawHorizon as Horizon) ? (rawHorizon as Horizon) : "12mo";
  const currentParams = rawHorizon ? new URLSearchParams({ horizon: rawHorizon }).toString() : "";

  return (
    <>
      <Navbar />
      <main className="font-trends-sans">
        <TrendDetailView detail={detail} horizon={horizon} currentParams={currentParams} />
      </main>
      <Footer />
    </>
  );
}
