import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart3, Settings, Zap } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { title: "Board", href: "/", icon: LayoutDashboard },
  { title: "Stats", href: "/stats", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
];

export const MobileNav = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary">
            <Zap className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-base font-bold text-foreground">TaskFlow</span>
        </div>
      </header>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-card border-t border-border py-2 px-4">
        {navItems.map((item) => {
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
};
