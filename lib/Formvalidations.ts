import * as Yup from "yup";

const validationSchema = Yup.object({
  swimmerFirstName: Yup.string().required("Swimmer’s First Name is required"),
  swimmerLastName: Yup.string().required("Swimmer’s Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  school: Yup.string().required("School/club/academy name is required"),
  grade: Yup.string().required("Grade/Class is required"),
  state: Yup.string().required("State is required"),
  dob: Yup.date().required("Date of Birth is required").nullable(),
  proofOfAge: Yup.string().required("Proof of Age is required"),
  ageGroup: Yup.string().required("Age Group is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  parentName: Yup.string().required("Parent’s / Guardian’s name is required"),
  parent1Contact: Yup.string().required("Parent contact is required").max(10).min(10),
  parent2Contact: Yup.string().max(10).min(10),
  coachContact: Yup.string().required("Coach contact is required").max(10).min(10),
  referral: Yup.string().required("Referral is required"),
  terms_conditions: Yup.boolean()
  .required("The terms and conditions must be accepted.")
  .oneOf([true], "The terms and conditions must be accepted."),
  amount: Yup.number()
});

export default validationSchema;
