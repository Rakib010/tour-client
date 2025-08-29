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
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import logo from "../../assets/images/logo.png";
import UpdateUser from "../modules/Authentication/UpdateUser";



// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/division", label: "Division", role: "PUBLIC" },
  { href: "/tour", label: "Tours", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <div className="container mx-auto px-4 flex h-16 items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            className="w-20 h-20 md:w-36 md:h-36 object-contain"
            src={logo}
            alt="Wanderlust Tours Logo"
          />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex flex-1 justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {navigationLinks.map((link, index) => {
              if (link.role === "PUBLIC" || link.role === data?.data?.role) {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: Mode Toggle + Login/Logout */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ModeToggle />

        {data?.data?.email ? (
          <div className="relative">
            {/* Profile Button */}
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full px-4 py-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
                {data.data.name?.charAt(0).toUpperCase()}
              </div>
              <span>{data.data.name}</span>
              <span className="text-xs">▾</span>
            </Button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b bg-gray-50">
                  <p className="text-sm font-semibold text-gray-900">
                    {data.data.name}
                  </p>
                  <p className="text-sm text-gray-600">{data.data.email}</p>
                  <p className="text-sm text-gray-600">{data.data.phone}</p>
                  <p className="text-sm text-gray-600">{data.data.address}</p>

                  {/* Update User Button */}
                  <div className="mt-3">
                    <UpdateUser userId={data.data._id} />
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col">
                  <Link
                    to={`/${data.data.role.toLowerCase()}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
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
                {navigationLinks.map((link, index) => {
                  if (
                    link.role === "PUBLIC" ||
                    link.role === data?.data?.role
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
                {data?.data?.email && (
                  <NavigationMenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-1 text-gray-700 hover:bg-gray-100"
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
  );
}
