import { AppSidebar } from "@/components/custom/AppSidebar";
import { MobileNav } from "@/components/custom/MobileNav";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <MobileNav />
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
