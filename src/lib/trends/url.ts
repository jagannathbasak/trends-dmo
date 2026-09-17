/**
 * Client-safe (no "server-only") URL builder shared by the filter bar and
 * search box: merges an update into the *current* query string rather than
 * replacing it, so changing one filter never clobbers the others.
 */
export function buildFilteredUrl(
  pathname: string,
  currentParams: string,
  updates: Record<string, string | undefined>,
): string {
  const next = new URLSearchParams(currentParams);
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  }
  const qs = next.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
