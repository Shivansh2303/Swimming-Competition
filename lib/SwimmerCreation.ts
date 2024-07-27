// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "./db";

export async function SwimmerCreate(data: any) {
  try {
    connectToMongoDB();
    const swimmer = await SwimmingCompetitionForm.create(data);
    return swimmer;
  } catch (error: any) {
    return { error: error.message };
  }
}
