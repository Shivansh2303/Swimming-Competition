// app/api/create-customer/route.ts
import { SwimmerCreate } from "@/lib/SwimmerCreation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userData } = await req.json();
    const swimmer = await SwimmerCreate(userData);
    return NextResponse.json(swimmer, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
