import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const isProd = process.env.NODE_ENV === 'production'
    const res = NextResponse.redirect(new URL("/", isProd ? process.env.NEXT_PUBLIC_API_FRONT : process.env.NEXT_PUBLIC_API_FRONT_DEV));
    res.cookies.set("token", "", {
        maxAge: 0,
        path: "/",
    });

    return res;
}

export async function POST(req: Request) {
    const cookiesStore = await cookies();
    try {
        cookiesStore.delete('token');

        return NextResponse.json({
            success: true,
            status: 200
        })
    } catch (e: any) {
        console.error("An error occurred while trying to log out:", e);
        return NextResponse.json({
            success: false,
            message: e
        }, { status: 500 })
    }

}