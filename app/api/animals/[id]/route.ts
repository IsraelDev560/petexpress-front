import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const token =(await cookies()).get('token')?.value;
    const { id } = await params;

    try {
        const { res, data } = await apiClient(`${API_URL}/animals/${id}`, {
            method: 'GET',
            token
        });

        if (!res.ok) {
            return Response.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }

        return Response.json(data, { status: res.status });
    } catch (e: any) {
        console.error("Erro ao buscar animal por ID:", e);
        return Response.json({ success: false, message: e }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;
    const body = await req.json();

    try {
        const { res, data } = await apiClient(`${API_URL}/animals/${id}`, {
            method: 'PATCH',
            token,
            body
        });

        if (!res.ok) {
            return Response.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }

        return Response.json(data, { status: res.status });
    } catch (e: any) {
        console.error("Erro ao atualizar animal:", e);
        return Response.json({ success: false, message: e }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;

    try {
        const { res, data } = await apiClient(`${API_URL}/animals/${id}`, {
            method: 'DELETE',
            token
        });

        if (!res.ok) {
            return Response.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }

        return Response.json(data, { status: 200 });
    } catch (e: any) {
        console.error("Erro ao remover animal:", e);
        return Response.json({ success: false, message: e }, { status: 500 });
    }
}