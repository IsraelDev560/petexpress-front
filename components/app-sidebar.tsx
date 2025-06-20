'use client'

import { Calendar, Home, LogOut, ShieldCheck, UserCircle2, Table, icons } from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ModeToggle } from "./theme-button"
import { User } from "@/types/User"
import { useEffect } from "react"
import { useUser } from "@/context/UserContext"
import { apiClient } from "@/lib/apiClient"
import { useRouter } from "next/navigation"

const items = [
    {
        title: "Home",
        url: "/petexpress",
        icon: Home,
    },
    {
        title: "Tables",
        url: "/petexpress/tables",
        icon: Table
    }
]

export function AppSidebar({
    user
}: { user: User }) {
    const { setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    async function logout() {
        try {
            const { res } = await apiClient('/api/auth/logout', {
                method: 'POST'
            })
            if (!res.ok) {
                return {
                    success: false,
                    status: res.status
                }
            }
            router.push('/')
            return { success: true }
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton className="cursor-pointer" onClick={logout}>
                                    <LogOut />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <div className="flex items-center gap-2 w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                <ModeToggle />
                                <span>Theme</span>
                            </div>
                            <SidebarMenuItem>
                                <div className="flex flex-col gap-1 p-2 border-t border-border mt-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                        <UserCircle2 className="h-4 w-4 text-primary" />
                                        <span className="font-medium">{user?.username}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                        <ShieldCheck className="h-4 w-4 text-yellow-500" />
                                        <span className="uppercase tracking-wide font-semibold text-yellow-600">
                                            {user?.role}
                                        </span>
                                    </div>
                                </div>
                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}