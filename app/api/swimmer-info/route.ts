// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { searchParams } = new URL(req.url);
    const paymentRequestID = searchParams.get("paymentRequestID");
    if (!paymentRequestID) {
      return NextResponse.json({ error: "Missing paymentRequestID or paymentID parameter" }, { status: 400 });
    }
    if ( !paymentRequestID) {
      return NextResponse.json({ error: "Missing paymentID parameter" }, { status: 400 });
    }
    const swimmer = await SwimmingCompetitionForm.findOne({ paymentRequestID });
    if (!swimmer) {
      return NextResponse.json({ error: "Swimmer not found" }, { status: 404 });
    }
    return NextResponse.json(swimmer, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
