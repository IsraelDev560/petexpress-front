import { apiClient } from "@/lib/apiClient";
import { API_URL } from "@/lib/ApiUrl";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;

    try {
        const { res, data } = await apiClient(`${API_URL}/task-types/${id}`, {
            method: 'GET',
            token,
            revalidate: 60,
            tags: ['tasks-types']
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }

        return NextResponse.json(data, { status: res.status });
    } catch (e: any) {
        console.error("An error occurred while fetching task type by ID:", e);
        return NextResponse.json({ success: false, message: e }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: any) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;
    const body = await req.json();

    try {
        const { res, data } = await apiClient(`${API_URL}/task-types/${id}`, {
            method: 'PATCH',
            token,
            body
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }
        revalidatePath('tasks-types')
        return NextResponse.json(data, { status: res.status });
    } catch (e: any) {
        console.error("An error occurred while updating task type:", e);
        return NextResponse.json({ success: false, message: e }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: any) {
    const token = (await cookies()).get('token')?.value;
    const { id } = await params;

    try {
        const { res, data } = await apiClient(`${API_URL}/task-types/${id}`, {
            method: 'DELETE',
            token
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, message: (data as { message?: string })?.message }, { status: res.status });
        }
        revalidatePath('tasks-types')
        return NextResponse.json(data, { status: 200 });
    } catch (e: any) {
        console.error("An error occurred while deleting task type:", e);
        return NextResponse.json({ success: false, message: e }, { status: 500 });
    }
}