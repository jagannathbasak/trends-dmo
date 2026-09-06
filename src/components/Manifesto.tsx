import Reveal from "@/components/Reveal";

export default function Manifesto() {
  return (
    <section
      className="border-b border-white/[0.07] px-5 py-24 sm:px-8 sm:py-32"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(79,227,193,.09), transparent 65%)",
      }}
    >
      <Reveal className="mx-auto max-w-4xl text-center">
        <p
          className="text-balance font-handwritten leading-[1.3] text-white/90"
          style={{ fontSize: "clamp(2.1rem, 6vw, 4.75rem)" }}
        >
          See where the market is going
          <br />
          before you make{" "}
          <span className="relative inline-block text-accent">
            the call.
            <svg
              aria-hidden
              viewBox="0 0 220 18"
              className="absolute left-0 top-full -mt-1 w-full text-accent/70 sm:-mt-2"
              preserveAspectRatio="none"
            >
              <path
                d="M2 10c30-9 60-9 90-3 20 4.5 40 4.5 65 0 25-4.5 45 2 63 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </p>
      </Reveal>
    </section>
  );
}
