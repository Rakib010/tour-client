import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Extract user-friendly error message from API/RTK Query errors */
export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (!error) return fallback;
  const err = error as { data?: { message?: string }; error?: { data?: { message?: string } }; message?: string };
  const msg = err?.data?.message ?? err?.error?.data?.message ?? err?.message;
  return typeof msg === "string" ? msg : fallback;
}
