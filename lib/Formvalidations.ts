import * as Yup from "yup";

const validationSchema = Yup.object({
  swimmerFirstName: Yup.string().required("Swimmer’s first name is required"),
  swimmerSecondName: Yup.string().required("Swimmer’s last name is required"),
  gender: Yup.string().required("Gender is required"),
  school: Yup.string().required("School/club/academy name is required"),
  grade: Yup.string().required("Grade/Class is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  dob: Yup.date().required("Date of Birth is required").nullable(),
  proofOfAge: Yup.string().required("Proof of Age is required"),
  ageGroup: Yup.string().required("Age Group is required"),
  // events: Yup.array().of(Yup.string()).max(2, 'You can select up to two events').required('At least one event is required'),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  parentName: Yup.string().required("Parent’s / Guardian’s name is required"),
  parent1Contact: Yup.string().required("Parent contact is required").max(13),
  parent2Contact: Yup.string().max(13),
  coachContact: Yup.string().required("Coach contact is required").max(13),
  referral: Yup.string().required("Referral is required"),
});

export default validationSchema;
