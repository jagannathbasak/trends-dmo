import Link from "next/link";
import { FOUNDER_NAME, FOUNDER_URL } from "@/lib/site";

const LINKS = [
  { href: "/#platform", label: "PLATFORM" },
  { href: "/#prediction", label: "PREDICTION" },
  { href: "/#track-record", label: "TRACK RECORD" },
  { href: "/#method", label: "METHOD" },
  { href: "/#pricing", label: "API" },
  { href: "/#faq", label: "FAQ" },
  { href: "/trends", label: "TRENDS" },
];

export default function Footer() {
  return (
    <footer className="px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4">
        <div className="flex flex-col items-center gap-4 font-mono text-[11px] text-white/35 sm:flex-row sm:justify-between">
          <span className="font-display text-sm font-bold tracking-[0.16em] text-white/70">
            NVILE
          </span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-white/60">
                {link.label}
              </Link>
            ))}
          </div>
          <span>PREDICTIONS ARE MODELLED, NOT GUARANTEED</span>
        </div>
        <div className="flex justify-center border-t border-white/[0.06] pt-4 font-mono text-[10px] text-white/25">
          <span>
            Founded by{" "}
            <a
              href={FOUNDER_URL}
              rel="author noopener noreferrer"
              target="_blank"
              className="transition hover:text-white/50"
            >
              {FOUNDER_NAME}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
