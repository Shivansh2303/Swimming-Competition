// app/api/create-customer/route.ts
import SwimmingCompetitionForm from "@/app/models/form.models";

export async function SwimmerCreate(data:any) {
  try {
    console.log({data:data});
    const swimmer = await SwimmingCompetitionForm.create(data);
    console.log({swimmerResponse:swimmer});
    
    return swimmer;
  } catch (error: any) {
    return  {error: error.message} 
  }
}
