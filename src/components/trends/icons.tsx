export function ArrowRightIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <line x1="4" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
      <polyline points="13,6 19,12 13,18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function SearchIcon({ size = 19, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 13, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <polyline points="6,9 12,15 18,9" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
