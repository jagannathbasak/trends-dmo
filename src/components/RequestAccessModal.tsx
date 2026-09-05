"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/components/ModalProvider";

export default function RequestAccessModal() {
  const { isOpen, intent, close } = useModal();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setSubmitted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={intent}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-[#040705]/80 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1413] p-7 shadow-2xl shadow-black/50">
        <button
          type="button"
          onClick={close}
          aria-label="Close dialog"
          className="absolute right-5 top-5 text-white/40 transition hover:text-white"
        >
          ✕
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-accent">
              ✓
            </span>
            <h3 className="font-display text-xl font-semibold">You&apos;re on the list.</h3>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Someone from the team will follow up shortly to set up your first forecast.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/40"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-1 font-mono text-[11px] tracking-[0.16em] text-accent">
              {intent.toUpperCase()}
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Start with one market.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Tell us where to point the forecasting engine. We&apos;ll reach out with access
              details.
            </p>
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                required
                type="text"
                placeholder="Full name"
                className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent/50"
              />
              <input
                required
                type="email"
                placeholder="Work email"
                className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent/50"
              />
              <input
                type="text"
                placeholder="Company"
                className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent/50"
              />
              <input
                type="text"
                placeholder="Market you want forecast first (optional)"
                className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent/50"
              />
              <button
                type="submit"
                className="mt-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-ink transition hover:brightness-110"
              >
                Submit request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
