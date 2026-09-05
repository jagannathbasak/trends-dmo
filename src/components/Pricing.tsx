"use client";

import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { useModal } from "@/components/ModalProvider";

const PLANS = [
  {
    name: "Analyst",
    price: "$490",
    period: "/mo",
    tagline: "One market, always current",
    features: [
      "1 tracked market",
      "12MO forecast horizon",
      "Weekly re-scoring",
      "Opportunity Report exports",
    ],
    cta: "Start with Analyst",
  },
  {
    name: "Team",
    price: "$1,900",
    period: "/mo",
    tagline: "For the group that owns the call",
    features: [
      "10 tracked markets",
      "Full 30D–3YR horizon range",
      "Daily re-scoring",
      "Decision Center + shared tracking",
      "Slack, Notion, Sheets integrations",
    ],
    cta: "Start with Team",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "Underwrite the whole portfolio",
    features: [
      "Unlimited markets",
      "Direct API + custom models",
      "Dedicated forecasting analyst",
      "SSO, audit trail, custom SLAs",
    ],
    cta: "Talk to sales",
  },
];

export default function Pricing() {
  const { open } = useModal();

  return (
    <section id="pricing" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-9 flex flex-col items-center gap-3.5 text-center">
          <Eyebrow>PRICING</Eyebrow>
          <h2 className="text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
            Priced by markets tracked, not seats.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/55">
            Every plan carries the same evidence tiers, bands and confidence — never a modelled
            number without its basis.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 80}
              className={`flex flex-col gap-5 rounded-2xl border p-6 ${
                plan.featured ? "border-accent/40 bg-accent/[0.05]" : "border-white/10"
              }`}
            >
              <div>
                {plan.featured ? (
                  <span className="mb-2 inline-block rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-accent">
                    MOST TRACKED
                  </span>
                ) : null}
                <div className="font-display text-lg font-semibold">{plan.name}</div>
                <p className="mt-1 text-xs text-white/50">{plan.tagline}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold">{plan.price}</span>
                <span className="text-sm text-white/45">{plan.period}</span>
              </div>

              <ul className="flex flex-1 flex-col gap-2.5 text-[13.5px] text-white/65">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 text-accent">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => open(plan.cta)}
                className={`rounded-md px-4 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-accent text-accent-ink hover:brightness-110"
                    : "border border-white/20 text-white/85 hover:border-white/40"
                }`}
              >
                {plan.cta}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
