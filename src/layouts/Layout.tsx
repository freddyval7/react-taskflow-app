import { AppSidebar } from "@/components/custom/AppSidebar";
import { MobileNav } from "@/components/custom/MobileNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <MobileNav />
          <main className="flex-1 p-6 pb-20 md:pb-8 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
