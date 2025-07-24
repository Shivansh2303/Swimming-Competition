import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "@/lib/db";
import EmailService from "@/lib/EmailService";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        payload[key] = value;
      } else if (value instanceof File) {
        payload[key] = value.name;
      } else {
        payload[key] = String(value);
      }
    });
    connectToMongoDB();
    const swimmer = await SwimmingCompetitionForm.findOne({
      paymentRequestID: payload.payment_request_id,
    });

    if (!swimmer) {
      console.error(
        "Swimmer not found for paymentRequestID:",
        payload.payment_request_id
      );
      return NextResponse.json({ error: "Swimmer not found" }, { status: 404 });
    }
    const updatedSwimmer = await SwimmingCompetitionForm.findByIdAndUpdate(
      swimmer._id,
      {
        paymentID: payload.payment_id,
        paymentStatus: payload.status,
      },
      { new: true }
    );
    if (updatedSwimmer) {
      const swimmerFirstName = updatedSwimmer.swimmerFirstName;
      const swimmerLastName = updatedSwimmer.swimmerLastName;
      const email = updatedSwimmer.email;
      const paymentID = updatedSwimmer.paymentID;
      EmailService({ swimmerFirstName, swimmerLastName, email, paymentID });
      console.log("Email sent successfully for swimmer:", updatedSwimmer._id);
      return NextResponse.json({
        message: "Swimmer updated and email sent successfully",
      });
    }
    console.error("Failed to update swimmer:", swimmer._id);
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
