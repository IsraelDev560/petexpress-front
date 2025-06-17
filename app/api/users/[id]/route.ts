import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;

    try {
        const { res, data } = await apiClient(`${API_URL}/users/${id}`, {
            method: 'GET',
            token,
            revalidate: 60,
            tags: ['users']
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }

        return NextResponse.json(data, { status: res.status });
    } catch (e: any) {
        console.error("Error to search animal by ID:", e);
        return NextResponse.json({ success: false, message: e }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: any) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;
    const body = await req.json();

    try {
        const { res, data } = await apiClient(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            token,
            body,
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }
        revalidateTag('users')
        return NextResponse.json(data, { status: res.status });
    } catch (e: any) {
        console.error("Error to update animal:", e);
        return NextResponse.json({ success: false, message: e }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: any) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;

    try {
        const { res, data } = await apiClient(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            token,
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }
        revalidateTag('users')
        return NextResponse.json(data, { status: 200 });
    } catch (e: any) {
        console.error("Error to remove animal:", e);
        return NextResponse.json({ success: false, message: e }, { status: 500 });
    }
}