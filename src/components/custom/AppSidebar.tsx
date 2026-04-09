import { LayoutDashboard, BarChart3, Settings, Zap } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Board", href: "/", icon: LayoutDashboard },
  { title: "Statistics", href: "/stats", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">
            TaskFlow
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            return (
              <SidebarMenuItem key={item.href}>
                <Link
                  key={item.href}
                  to={item.href}
                  //       cn(
                  //   isActive("/search") && "bg-slate-200",
                  //   "p-2 rounded-md",
                  // )
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 mx-3 mb-4 rounded-lg bg-accent">
          <p className="text-xs font-medium text-accent-foreground">
            TaskFlow v1.0
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Personal task organizer
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
