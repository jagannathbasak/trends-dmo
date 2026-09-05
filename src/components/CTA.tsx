"use client";

import Reveal from "@/components/Reveal";
import { useModal } from "@/components/ModalProvider";

export default function CTA() {
  const { open } = useModal();

  return (
    <section
      id="access"
      className="scroll-mt-20 border-b border-white/[0.07] px-5 py-20 sm:px-8 sm:py-[70px]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 120%, rgba(79,227,193,.1), transparent 62%)",
      }}
    >
      <Reveal className="mx-auto flex max-w-[560px] flex-col items-center gap-5 text-center">
        <h2 className="text-balance font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px]">
          Know where the market is going before everyone else sees it.
        </h2>
        <p className="max-w-md text-[15px] leading-relaxed text-white/60 sm:text-base">
          Start with one market. NVILE returns the signals, the causes, the forecast and the
          call.
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => open("Request access")}
            className="rounded-[7px] bg-accent px-[26px] py-3.5 text-sm font-semibold text-accent-ink transition hover:brightness-110"
          >
            Request access
          </button>
          <button
            type="button"
            onClick={() => open("Talk to the team")}
            className="rounded-[7px] border border-white/20 px-[26px] py-3.5 text-sm font-medium text-white/85 transition hover:border-white/40"
          >
            Talk to the team
          </button>
        </div>
      </Reveal>
    </section>
  );
}
