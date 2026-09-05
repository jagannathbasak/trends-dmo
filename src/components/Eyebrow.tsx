export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] font-medium tracking-[0.16em] text-accent">
      {children}
    </div>
  );
}
