import Reveal from "@/components/Reveal";

const ROLES = [
  {
    tag: "FOUNDERS",
    title: "Where to point the roadmap next",
    body: "Which demand curve is bending, and how long the window stays open.",
  },
  {
    tag: "INVESTORS",
    title: "Conviction before the round is obvious",
    body: "Forecast the category, not the deck. Track what would invalidate the thesis.",
  },
  {
    tag: "STRATEGY",
    title: "Three-year view that survives review",
    body: "Scenarios with stated bands, ready for the board pack.",
  },
  {
    tag: "CORPORATE DEV",
    title: "Buy, build or wait — with a date",
    body: "Predicted competitive intensity and timing on every target market.",
  },
];

export default function Roles() {
  return (
    <section id="solutions" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-7 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
            Built for the decision you are about to make.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role, i) => (
            <Reveal
              key={role.tag}
              delay={i * 60}
              className="flex flex-col gap-2.5 rounded-xl border border-white/10 p-5"
            >
              <div className="font-mono text-[10px] tracking-[0.1em] text-accent">{role.tag}</div>
              <div className="font-display text-[17px] font-semibold leading-snug">{role.title}</div>
              <p className="text-[12.5px] leading-relaxed text-white/50">{role.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
