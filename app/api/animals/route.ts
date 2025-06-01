import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { cookies } from "next/headers";

export async function POST(req: Request, resNext: Response) {
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
            return Response.json({
                success: false,
                message: data?.message,
                timeStamp: data?.timeStamp
            }, {
                status: res.status
            });
        }

        return Response.json(data, {
            status: res.status
        })
    } catch (e: any) {
        console.log("Ocorreu um erro ao tentar criar um animal:", e);
        return Response.json({
            success: false,
            message: e
        }, { status: 500 })
    }
}

export async function GET(req: Request, resNext: Response) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;
    try {
        const { res, data } = await apiClient(`${API_URL}/animals`, {
            method: 'GET',
            token,
        }) as { res: Response, data: { token: string, message?: string, timeStamp: string, status: number } }
        console.log(res, data)
        if (!res.ok) {
            return Response.json({
                success: false,
                message: data?.message,
                timeStamp: data?.timeStamp
            }, {
                status: res.status
            });
        }

        return Response.json(data, {
            status: res.status
        })
    } catch (e: any) {
        console.log("Ocorreu um erro ao tentar criar um animal:", e);
        return Response.json({
            success: false,
            message: e
        }, { status: 500 })
    }
}