// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userData } = await req.json();
    console.log({swimmerData:userData})
    delete userData.proofOfAge;
    const swimmer = await SwimmingCompetitionForm.create(userData);
  console.log({swimmer:swimmer});
  
    return NextResponse.json(swimmer, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
