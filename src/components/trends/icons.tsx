export function ArrowRightIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <line x1="4" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
      <polyline points="13,6 19,12 13,18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
