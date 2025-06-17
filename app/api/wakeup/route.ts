import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: "Test", password: "Test123" })
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Login failed");

    return NextResponse.json({ message: "Successfully awakened", result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
