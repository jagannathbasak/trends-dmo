"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/components/ModalProvider";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#prediction", label: "Prediction" },
  { href: "#track-record", label: "Track record" },
  { href: "#method", label: "Method" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useModal();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-white/[0.07] bg-background/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#platform" className="font-display text-[17px] font-bold tracking-[0.16em]">
          NVILE
        </a>

        <nav className="hidden items-center gap-8 font-medium text-[13px] text-white/60 lg:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-[13px] font-medium lg:flex">
          <button type="button" className="text-white/60 transition hover:text-white">
            Sign in
          </button>
          <button
            type="button"
            onClick={() => open("Request access")}
            className="rounded-md bg-accent px-[18px] py-2.5 font-semibold text-accent-ink transition hover:brightness-110"
          >
            Request access
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-5 bg-white/80 transition ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-white/80 transition ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/[0.07] bg-background px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1 text-sm text-white/70">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2.5 transition hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                open("Request access");
              }}
              className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink"
            >
              Request access
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
