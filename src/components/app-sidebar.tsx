import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Home } from "lucide-react";

import logo from "../assets/images/logo.png";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const location = useLocation();

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="block">
          <img
            className="h-14 w-auto object-contain"
            src={logo}
            alt="Wanderlust Tours Logo"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`text-[15px] font-medium px-3 py-2.5 rounded-md transition-colors ${
                  location.pathname === "/"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-sidebar-accent text-sidebar-foreground"
                }`}
              >
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4 shrink-0" />
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-0.5">
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`text-[15px] font-medium px-3 py-2.5 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-sidebar-accent text-sidebar-foreground"
                        }`}
                      >
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
