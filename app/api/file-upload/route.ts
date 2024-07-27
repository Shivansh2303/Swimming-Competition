// app/api/file-upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file  = form.get("file") as File;
    if(!file.name){
        return NextResponse.json({ error: "No file provided  "}, { status: 500 });
    }
    
const blob = await put(file.name,file,{
    access:"public"
})
    return NextResponse.json(blob, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
