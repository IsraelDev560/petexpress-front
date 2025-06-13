import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.API_URL}`);
    if (!res.ok) throw new Error("Falha no ping");
    return new NextResponse(JSON.stringify({ message: "Acordou com sucesso" }), { status: 200 });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
