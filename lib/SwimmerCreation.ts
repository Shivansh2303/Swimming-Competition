// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "./db";

export async function SwimmerCreate(data: any) {
  try {
    connectToMongoDB();
    const swimmerExist = await SwimmingCompetitionForm.findOne({paymentID:data.paymentID});
    if (swimmerExist){
      return swimmerExist
    }
    const swimmer = await SwimmingCompetitionForm.create(data);
    
    return swimmer;
  } catch (error: any) {
    throw new Error(error)
  }
}
