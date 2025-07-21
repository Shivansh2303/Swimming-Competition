// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "./db";
import EmailService from "./EmailService";
export async function SwimmerCreate(data: any) {
  try {
    connectToMongoDB();
    console.log("1 Connected to MongoDB ");
    console.log(" 2Data received: ", data);
    console.log("3 Checking swimmer exists");
    console.log("4 Payment ID: ", data.paymentID);
    console.log("5 Payment Request ID: ", data.paymentRequestID);
    const swimmerExist = await SwimmingCompetitionForm.findOne({
      paymentID: data.paymentID,
      paymentRequestID:data.paymentRequestID,
    });
    if (swimmerExist) {
      console.log("6 Swimmer already exists");
      console.log("7 Swimmer Data: ", swimmerExist);
      return swimmerExist;
    }
    console.log("8 Creating new swimmer");
    const swimmer = await SwimmingCompetitionForm.create(data);
    console.log("9 New swimmer created: ", swimmer);
    console.log("10 Sending email to swimmer");
    await EmailService(swimmer);
    console.log("14 Email sent to swimmer");
    console.log("15 Swimmer creation process completed");
    return swimmer;
  } catch (error: any) {
    console.error("Error: ", error);
    throw new Error(error);
  }
}
