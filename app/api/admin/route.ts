import { NextRequest, NextResponse } from "next/server";
import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await connectToMongoDB();
    const userData = await SwimmingCompetitionForm.find({});
    return NextResponse.json({ data: userData }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
