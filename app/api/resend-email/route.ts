import { NextRequest, NextResponse } from "next/server";
import EmailService from "@/lib/EmailService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const { email, swimmerFirstName, swimmerLastName, paymentID } = body;

    const swimmer = await EmailService({ swimmerFirstName, swimmerLastName, email, paymentID });

    return NextResponse.json(swimmer, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
