import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import PredictionTimeline from "@/components/PredictionTimeline";
import SignalBoard from "@/components/SignalBoard";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { buildSiteStructuredData } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/site";

const TITLE = "Trends";
const DESCRIPTION =
  "A live look at NVILE's trend detection: the markets currently accelerating, the signals behind them, and the forecast horizon for each — updated as new data lands.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/trends",
  },
  openGraph: {
    title: `${TITLE} | Nvile`,
    description: DESCRIPTION,
    url: `${SITE_URL}/trends`,
  },
  twitter: {
    title: `${TITLE} | Nvile`,
    description: DESCRIPTION,
  },
};

export default function TrendsPage() {
  const structuredData = buildSiteStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <section className="border-b border-white/[0.07] px-5 pb-4 pt-16 sm:px-8 sm:pt-20">
          <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-4 text-center">
            <Eyebrow>LIVE DEMO</Eyebrow>
            <h1 className="text-balance font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[46px]">
              See a trend before the market names it.
            </h1>
            <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-white/60 sm:text-base">
              This is a live sample of what NVILE tracks: the markets currently accelerating, the
              evidence behind each move, and how far out the forecast holds. It updates as new
              signals land.
            </p>
          </Reveal>
        </section>

        <PredictionTimeline />
        <SignalBoard />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
