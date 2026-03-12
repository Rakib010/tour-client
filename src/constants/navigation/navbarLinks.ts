import { role } from "@/constants/auth/role";

// Top-level navigation links for the main navbar.
// Keeping them in a constants file makes it easy to:
// - reuse in multiple layouts if needed
// - manage labels/paths/role visibility from one place
export const navbarLinks = [
  { href: "/", label: "Home", role: "PUBLIC" as const },
  { href: "/categories", label: "Categories", role: "PUBLIC" as const },
  { href: "/tour", label: "Tours", role: "PUBLIC" as const },
  { href: "/about", label: "About", role: "PUBLIC" as const },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/user", label: "Dashboard", role: role.user },
];

