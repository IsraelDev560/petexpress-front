import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;
    try {
        const { res, data } = await apiClient(`${API_URL}/animals`, {
            method: 'GET',
            token,
            revalidate: 60,
            tags: ['animals']
        }) as { res: Response, data: { token: string, message?: string, timeStamp: string, status: number } }
        if (!res.ok) {
            return NextResponse.json({
                success: false,
                message: data?.message,
                timeStamp: data?.timeStamp
            }, {
                status: res.status
            });
        }

        return NextResponse.json(data, {
            status: res.status
        })
    } catch (e: any) {
        console.error("An error occurred while trying to fetch all animals:", e);
        return NextResponse.json({
            success: false,
            message: e
        }, { status: 500 })
    }
}