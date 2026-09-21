import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { FOUNDER_NAME, FOUNDER_URL, SITE_URL } from "@/lib/site";
import { buildStructuredData } from "@/lib/structuredData";

const DESCRIPTION =
  "NVILE is a prediction intelligence engine that detects early market signals, explains what's driving them, and forecasts what happens next. Founded by Jagannath Basak.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "NVILE",
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
  },
  twitter: {
    title: "NVILE",
    description: DESCRIPTION,
  },
};

const CAPABILITIES = [
  {
    label: "DETECT",
    title: "Early market signals",
    body: "NVILE monitors fragmented evidence across markets and turns weak signals into structured trend intelligence.",
  },
  {
    label: "EXPLAIN",
    title: "Drivers and evidence",
    body: "Each trend is connected to the forces moving it, with evidence tiers that separate observed facts from estimates and predictions.",
  },
  {
    label: "FORECAST",
    title: "What happens next",
    body: "Forecast horizons from 30 days to three years help teams compare near-term movement with longer-term market direction.",
  },
];

const PLATFORM_FACTS = [
  ["PRODUCT", "Prediction intelligence engine"],
  ["FOCUS", "Emerging markets, technology and consumer shifts"],
  ["FORECAST HORIZONS", "30 days, 6 months, 12 months and 3 years"],
  ["AUDIENCE", "Founders, investors, product and strategy teams"],
];

export default function AboutPage() {
  const structuredData = buildStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <section id="about" className="border-b border-white/[0.07] px-5 pb-4 pt-16 sm:px-8 sm:pt-20">
          <Reveal className="mx-auto max-w-[1280px]">
            <Eyebrow>ABOUT NVILE</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[46px] lg:text-[54px]">
              Intelligence for decisions about what comes next.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/60 sm:text-base">
              NVILE is a prediction intelligence engine that detects early market signals,
              explains what is driving them, and forecasts what happens next.
            </p>
          </Reveal>
        </section>

        <section id="mission" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
              <Reveal>
                <Eyebrow>OUR MISSION</Eyebrow>
                <h2 className="mt-4 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
                  Make change visible before it becomes obvious.
                </h2>
              </Reveal>
              <Reveal delay={80} className="flex flex-col gap-4 text-[15px] leading-relaxed text-white/60">
                <p>
                  Important shifts rarely begin with a single announcement. They emerge through
                  research, company activity, capital flows, regulation, hiring, and changing
                  customer behaviour.
                </p>
                <p>
                  NVILE brings those signals together so decision-makers can understand not only
                  what is changing, but why it matters and when it may affect their market.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="capabilities" className="border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="mb-8 max-w-2xl">
              <Eyebrow>WHAT NVILE DOES</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
                From weak signals to clearer decisions.
              </h2>
            </Reveal>
            <div className="grid gap-3 md:grid-cols-3">
              {CAPABILITIES.map((capability, index) => (
                <Reveal
                  key={capability.label}
                  delay={index * 60}
                  className="rounded-xl border border-white/10 bg-panel p-6"
                >
                  <p className="font-mono text-[11px] tracking-[0.16em] text-accent">
                    {capability.label}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold">{capability.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/55">{capability.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="platform-snapshot" className="border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>PLATFORM SNAPSHOT</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
                What NVILE is building.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {PLATFORM_FACTS.map(([term, detail]) => (
                  <div key={term} className="grid gap-2 py-5 sm:grid-cols-[170px_1fr]">
                    <dt className="font-mono text-[11px] tracking-[0.12em] text-white/35">{term}</dt>
                    <dd className="text-[14px] text-white/70">{detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section id="founder" className="px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mx-auto max-w-[1280px] rounded-xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <Eyebrow>FOUNDER</Eyebrow>
            <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em] sm:text-[34px]">
                  {FOUNDER_NAME}
                </h2>
                <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-white/35">
                  FOUNDER &amp; CEO OF NVILE
                </p>
                <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-white/60">
                  Jagannath is an engineer and founder working at the intersection of machine
                  learning and strategic foresight. He is building NVILE to help organizations
                  identify emerging shifts before they become mainstream.
                </p>
              </div>
              <a
                href={FOUNDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit rounded-md border border-accent/40 px-5 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-accent-ink"
              >
                Founder website ↗
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
