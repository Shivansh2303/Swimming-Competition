import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "@/lib/db";
import EmailService from "@/lib/EmailService";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    // Validate required fields
    const { paymentRequestID, paymentID, paymentStatus } = payload.userData;
    if (!paymentRequestID || !paymentID || !paymentStatus) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await connectToMongoDB();

    // Find swimmer by paymentRequestID
    const swimmer = await SwimmingCompetitionForm.findOne({ paymentRequestID });

    if (!swimmer) {
      console.error(
        "Swimmer not found for paymentRequestID:",
        paymentRequestID
      );
      return NextResponse.json({ error: "Swimmer not found" }, { status: 404 });
    }
    const updatedSwimmer = await SwimmingCompetitionForm.findByIdAndUpdate(
      swimmer._id,
      {
        paymentID: paymentID,
        paymentStatus: paymentStatus,
      },
      { new: true }
    );
    if (updatedSwimmer) {
      EmailService(updatedSwimmer);
      return NextResponse.json({
        message: "Swimmer updated and email sent successfully",
        swimmer: updatedSwimmer,
      });
    }
    return NextResponse.json(
      { error: "Failed to update swimmer" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
