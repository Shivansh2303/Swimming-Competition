// app/api/create-customer/route.ts
import { getInstamojoToken } from "@/lib/InstamojoToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const customer = await getInstamojoToken();
    return NextResponse.json(customer.access_token, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
