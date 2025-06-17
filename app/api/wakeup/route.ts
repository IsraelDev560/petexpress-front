import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: "Teste", password: "TEste123" })
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Falha no login");

    return NextResponse.json({ message: "Acordou com sucesso", result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
