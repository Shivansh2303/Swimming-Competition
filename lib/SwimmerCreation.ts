// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";
import { connectToMongoDB } from "./db";

export async function SwimmerCreate(data:any) {
  try {
    
  connectToMongoDB();
    console.log({data:data});
    const swimmer = await SwimmingCompetitionForm.create(data);
    console.log({swimmerResponse:swimmer});
    
    return swimmer;
  } catch (error: any) {
    return  {error: error.message} 
  }
}
