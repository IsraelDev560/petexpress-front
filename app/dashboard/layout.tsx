import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getMyInfoUserServer } from "@/service/server/GetDatasService";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get('token')?.value ?? '';
    const myinfo = await getMyInfoUserServer(token);
    
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