import * as Yup from "yup";
const schema=Yup.object().shape({
    swimmerName: Yup.string().required(),
    gender:Yup.string().required(),
    grade:Yup.string().required(),
    school:Yup.string().required(),
    state: Yup.string().required(),
    dob:Yup.date().required(),
    proofOfAge: Yup.string().required(),
    ageGroup: Yup.string().required(),
    events:Yup.array().required(),
    relay:Yup.boolean().required(),
    swimathon:Yup.bool().required(),
    parentContact:Yup.number().required(),
    coachContact:Yup.number().required(),
    parentName:Yup.string().required(),
    referral:Yup.string().required(),
})
export default schema;