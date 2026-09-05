const LINKS = [
  { href: "#platform", label: "PLATFORM" },
  { href: "#prediction", label: "PREDICTION" },
  { href: "#track-record", label: "TRACK RECORD" },
  { href: "#method", label: "METHOD" },
  { href: "#pricing", label: "API" },
  { href: "#", label: "LEGAL" },
];

export default function Footer() {
  return (
    <footer className="px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 font-mono text-[11px] text-white/35 sm:flex-row sm:justify-between">
        <span className="font-display text-sm font-bold tracking-[0.16em] text-white/70">
          NVILE
        </span>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-white/60">
              {link.label}
            </a>
          ))}
        </div>
        <span>PREDICTIONS ARE MODELLED, NOT GUARANTEED</span>
      </div>
    </footer>
  );
}
