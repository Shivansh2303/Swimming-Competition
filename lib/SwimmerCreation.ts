// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "./db";
import EmailService from "./EmailService";
export async function SwimmerCreate(data: any) {
  try {
    connectToMongoDB();
    const swimmerExist = await SwimmingCompetitionForm.findOne({
      paymentID: data.paymentID,
      paymentRequestID:data.paymentRequestID,
    });
    if (swimmerExist) {
      return swimmerExist;
    }
    const swimmer = await SwimmingCompetitionForm.create(data);
    // await EmailService(swimmer);
    return swimmer;
  } catch (error: any) {
    console.error("Error: ", error);
    throw new Error(error);
  }
}
