import mongoose, { Schema, Document } from "mongoose";
import { getMongoose } from "@/lib/db";
// const mongoose=getMongoose();
// Define an interface representing a document in MongoDB
interface ISwimmingCompetitionForm extends Document {
  swimmerFirstName: string;
  swimmerSecondName: string;
  gender: string;
  grade: string;
  school: string;
  country: string;
  state: string;
  dob: Date | null;
  proofOfAge: Buffer | null;
  ageGroup: string;
  events:[],
  relay:boolean,
  swimathon: boolean;
  email: string;
  parent1Contact: string;
  parent2Contact: string;
  coachContact: string;
  parentName: string;
  referral: string;
}

// Create a schema corresponding to the document interface
const SwimmingCompetitionFormSchema: Schema = new Schema({
  swimmerFirstName: { type: String, required: true },
  swimmerSecondName: { type: String, required: true },
  gender: { type: String, required: true },
  grade: { type: String, required: true },
  school: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  dob: { type: Date, required: true },
  proofOfAge: { type: Buffer, required: false },
  ageGroup: { type: String, required: true },
  relay: { type: Boolean, required: false },
  swimathon: { type: Boolean, required: false },
  email: { type: String, required: true },
  parent1Contact: { type: String, required: true },
  parent2Contact: { type: String, required: false },
  coachContact: { type: String, required: true },
  parentName: { type: String, required: true },
  referral: { type: String, required: false },
});

// Create and export the model
const SwimmingCompetitionForm = mongoose.model(
  "SwimmingCompetitionForm",
  SwimmingCompetitionFormSchema
);

export default SwimmingCompetitionForm;