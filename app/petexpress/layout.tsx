import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getMyInfoUserServer } from "@/service/server/GetDatasService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PetExpressLayout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get('token')?.value ?? '';
    const myinfo = await getMyInfoUserServer(token);

    if (!token || !myinfo) return redirect("/api/auth/logout");

    return (
        <SidebarProvider>
            <AppSidebar user={myinfo} />
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}