import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { cookies } from "next/headers";

export async function POST(req: Request, resNext: Response) {
    const cookiesStore = await cookies();
    try {
        cookiesStore.delete('token');

        return Response.json({
            success: true,
            status: 200
        })
    } catch (e: any) {
        console.log("Ocorreu um erro ao fazer logout:", e);
        return Response.json({
            success: false,
            message: e
        }, { status: 500 })
    }
}