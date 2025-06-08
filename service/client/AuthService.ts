import { apiClient } from "@/lib/apiClient";

export async function logout() {
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
        window.location.reload();
        return { success: true }
    } catch (e: any) {
        console.log(e);
    }
}