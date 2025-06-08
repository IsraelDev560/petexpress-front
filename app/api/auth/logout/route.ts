import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookiesStore = await cookies();
    try {
        cookiesStore.delete('token');

        return NextResponse.json({
            success: true,
            status: 200
        })
    } catch (e: any) {
        console.log("Ocorreu um erro ao fazer logout:", e);
        return NextResponse.json({
            success: false,
            message: e
        }, { status: 500 })
    }
}