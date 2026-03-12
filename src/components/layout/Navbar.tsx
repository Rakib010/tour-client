import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { navbarLinks } from "@/constants/navigation/navbarLinks";
import logo from "../../assets/images/logo.png";
import UpdateUser from "../modules/Authentication/UpdateUser";

export default function Navbar() {
  // Consume authenticated user state from the global AuthContext.
  // This will update automatically when:
  // - login succeeds (AuthProvider updates user state), or
  // - `/user/me` refetches based on auth cookies.
  const { user, role: userRole, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 sm:px-20 flex h-20 items-center justify-between">
        {/* Left: Logo + Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link to="/">
            <img
              className="h-16 w-auto md:h-20 object-contain"
              src={logo}
              alt="Wanderlust Tours Logo"
            />
          </Link>
          <nav className="hidden md:flex items-center ml-20">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-8">
                {navbarLinks.map((link, index) => {
                  if (link.role === "PUBLIC" || link.role === userRole) {
                    return (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-base text-muted-foreground hover:text-primary font-medium transition-colors"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Right: ModeToggle + Login */}
        <div className="flex items-center gap-3">
        <ModeToggle />
        {isAuthenticated ? (
          <div className="relative">
            {/* Profile Button */}
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full px-4 py-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span>{user?.name}</span>
              <span className="text-xs">▾</span>
            </Button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b bg-muted/50">
                  <p className="text-sm font-semibold text-foreground">
                    {user?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-sm text-muted-foreground">{user?.phone}</p>
                  <p className="text-sm text-muted-foreground">{user?.address}</p>

                  {/* Update User Button */}
                  <div className="mt-3">
                    <UpdateUser userId={user?._id as string} />
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col">
                  {user?.role && (
                    <Link
                      to={`/${String(user.role).toLowerCase()}`}
                      className="px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button asChild variant="default">
            <Link to="/login">Login</Link>
          </Button>
        )}

     

        {/* Mobile Hamburger */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="md:hidden" variant="ghost" size="icon">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-48 p-2 md:hidden">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col gap-1">
                {navbarLinks.map((link, index) => {
                  if (
                    link.role === "PUBLIC" ||
                    link.role === userRole
                  ) {
                    return (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink asChild className="py-1">
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                })}
                {isAuthenticated && (
                  <NavigationMenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-1 text-foreground hover:bg-muted"
                    >
                      Logout
                    </button>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </PopoverContent>
        </Popover>
      </div>
      </div>
    </header>
  );
}
