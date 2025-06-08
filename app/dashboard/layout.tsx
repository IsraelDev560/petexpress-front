import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getMyInfoUserServer } from "@/service/server/GetDatasService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value ?? '';
    const myinfo = await getMyInfoUserServer(token);

    if (!token || !myinfo) return redirect("/api/auth/logout");

    return (
        <SidebarProvider>
            <AppSidebar user={myinfo} />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}