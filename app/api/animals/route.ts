import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;
    const body = await req.json();
    try {
        const { res, data } = await apiClient(`${API_URL}/animals`, {
            method: 'POST',
            token,
            body
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
        revalidateTag('animals')
        return NextResponse.json(data, {
            status: res.status
        })
    } catch (e: any) {
        console.error("An error occurred while trying to create an animal:", e);
        return NextResponse.json({
            success: false,
            message: e
        }, { status: 500 })
    }
}