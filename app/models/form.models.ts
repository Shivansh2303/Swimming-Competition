import { Schema, Document, model, models } from "mongoose";
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
  events: [];
  relay: boolean;
  swimathon: boolean;
  email: string;
  parent1Contact: string;
  parent2Contact: string;
  coachContact: string;
  parentName: string;
  referral: string;
}

const SwimmingCompetitionFormSchema: Schema = new Schema(
  {
    swimmerFirstName: { type: String, required: true },
    swimmerLastName: { type: String, required: true },
    gender: { type: String, required: true },
    grade: { type: String, required: true },
    school: { type: String, required: true },
    state: { type: String, required: true },
    dob: { type: Date, required: true },
    proofOfAge: { type: String, required: false },
    ageGroup: { type: String, required: true },
    relay: { type: Boolean, required: false },
    swimathon: { type: Boolean, required: false },
    email: { type: String, required: true },
    event_freestyle: { type: Boolean, required: false },
    freestyleTime: { type: String, required: false },
    event_breast_Stroke: { type: Boolean, required: false },
    breast_StrokeTime: { type: String, required: false },
    event_back_Stroke: { type: Boolean, required: false },
    back_StrokeTime: { type: String, required: false },
    event_butterfly: { type: Boolean, required: false },
    butterflyTime: { type: String, required: false },
    parent1Contact: { type: String, required: true },
    parent2Contact: { type: String, required: false },
    coachContact: { type: String, required: true },
    parentName: { type: String, required: true },
    referral: { type: String, required: false },
    paymentID: { type: String, required: false },
    paymentStatus: { type: String, required: false },
    paymentRequestID: { type: String, required: false },
    amount: { type: Number, required: true },
    terms_conditions: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const SwimmingCompetitionForm =
  models.SwimmingCompetitionForm ||
  model("SwimmingCompetitionForm", SwimmingCompetitionFormSchema);

export default SwimmingCompetitionForm;
