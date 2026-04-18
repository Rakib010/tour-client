/**
 * API responses sometimes wrap lists as `{ data: [...] }`, `{ result: [...] }`, etc.
 * Use this so `.filter` / `.map` never run on a non-array.
 */
export function normalizeToArray<T = unknown>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    if (Array.isArray(o.data)) return o.data as T[];
    if (Array.isArray(o.result)) return o.result as T[];
    if (Array.isArray(o.bookings)) return o.bookings as T[];
  }
  return [];
}
