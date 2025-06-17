import { API_URL } from "@/lib/ApiUrl";
import { Animal } from "@/types/Animal";
import { Task } from "@/types/Task";
import { TaskType } from "@/types/Task-Type";
import { User } from "@/types/User";
import { redirect } from "next/navigation";

function headersFunction(token: string) {
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    }
}

export async function getAnimalsServer(token: string): Promise<Animal[]> {
    try {
        const res = await fetch(`${API_URL}/animals`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['animals']
            }
        })

        if (res.status === 401) redirect("/api/auth/logout");
        if (!res.ok) throw new Error("Failed to fetch animals.");

        const data = await res.json();
        return data as Animal[];
    } catch (e) {
        console.error("An error occurred while fetching animals:", e);
        return [];
    }
}

export async function getTasksServer(token: string): Promise<Task[]> {
    try {
        const res = await fetch(`${API_URL}/task`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['tasks']
            }
        })

        if (res.status === 401) redirect("/api/auth/logout");
        if (!res.ok) throw new Error("Failed to fetch tasks.");

        const data = await res.json();
        return data as Task[];
    } catch (e) {
        console.error("An error occurred while fetching tasks:", e);
        return [];
    }
}

export async function getTasksTypesServer(token: string): Promise<TaskType[]> {
    try {
        const res = await fetch(`${API_URL}/task-types`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['tasks-types']
            }
        })

        if (res.status === 401) redirect("/api/auth/logout");
        if (!res.ok) throw new Error("Failed to fetch task types.");

        const data = await res.json();
        return data as TaskType[];
    } catch (e) {
        console.error("An error occurred while fetching task types:", e);
        return [];
    }
}

export async function getUsersServer(token: string): Promise<User[]> {
    try {
        const res = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['users']
            }
        })

        if (res.status === 401) redirect("/api/auth/logout");
        if (!res.ok) throw new Error("Failed to fetch users.");

        const data = await res.json();
        return data as User[];
    } catch (e) {
        console.error("An error occurred while fetching users:", e);
        return [];
    }
}

export async function getMyInfoUserServer(token: string): Promise<User | null> {
    try {
        const res = await fetch(`${API_URL}/users/myinfo`, {
            method: 'GET',
            headers: headersFunction(token),
            next: {
                revalidate: 60,
                tags: ['myinfo']
            }
        })

        if (res.status === 401) redirect("/api/auth/logout");
        if (!res.ok) throw new Error("Failed to fetch user info.");

        const data = await res.json();
        return {
            username: data.username,
            role: data.role,
        } as User;
    } catch (e: any) {
        console.error("An error occurred while fetching user info:", e);
        return null;
    }
}
