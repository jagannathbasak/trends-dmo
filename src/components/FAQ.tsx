import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { FAQS } from "@/lib/faqData";

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[820px]">
        <Reveal className="mb-9 flex flex-col items-center gap-3.5 text-center">
          <Eyebrow>FREQUENTLY ASKED</Eyebrow>
          <h2 className="text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
            Questions worth asking before you trust a forecast.
          </h2>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-white/10 px-5 py-4 open:bg-white/[0.02]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-medium leading-snug marker:content-none sm:text-base">
                {faq.question}
                <span
                  aria-hidden
                  className="flex-none font-mono text-lg leading-none text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">{faq.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
