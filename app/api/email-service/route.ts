// app/api/create-customer/route.ts
import { NextRequest, NextResponse } from "next/server";
import EmailService from "@/lib/EmailService";
export async function POST(req: NextRequest) {
  try {
    const { userData } = await req.json();
    const swimmer = await EmailService(userData);
    return NextResponse.json(swimmer, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
