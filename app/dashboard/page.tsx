'use client'

import { apiClient } from "@/lib/apiClient";

export default function Dashboard() {
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
            window.location.reload();
            return { success: true }
        } catch (e: any) {
            console.log(e);
        }
    }
    return (
        <div>
            <p>Dash</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}