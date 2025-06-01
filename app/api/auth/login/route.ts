import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { cookies } from "next/headers";

export async function POST(req: Request, resNext: Response) {
    const cookiesStore = await cookies();
    const body = await req.json();
    try {
        const { res, data } = await apiClient(`${API_URL}/auth/login`, {
            method: 'POST',
            body
        }) as { res: Response, data: { token: string, message?: string, timeStamp: string, status: number } }

        if (!res.ok) {
            return Response.json({
                success: false,
                message: data?.message,
                timeStamp: data?.timeStamp
            }, {
                status: res.status
            });
        }

        cookiesStore.set('token', data.token);

        return Response.json(data, {
            status: res.status
        })
    } catch (e: any) {
        console.log("Ocorreu um erro ao tentar fazer login:", e);
        return Response.json({
            success: false,
            message: e
        }, { status: 500 })
    }
}