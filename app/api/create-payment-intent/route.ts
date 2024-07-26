// app/api/create-customer/route.ts
import { InstamojoPaymentIntent } from "@/lib/InstamojoPaymentIntent";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token ,userData} = await req.json();
    console.log({userData:userData});
    
    const intent = await InstamojoPaymentIntent(token,userData);
    return NextResponse.json(intent, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
