"use client";
import { ChangeEvent, useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./Dropdown";
import CheckboxField from "./CheckBoxField";
import FileUploader from "./FileUploader";
import DateSelector from "./DatePicker";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import validationSchema from "@/lib/Formvalidations";
import { State } from "country-state-city";
import Label from "./Label";
import axios from "axios";

const genderOptions = [
  { value: "", label: "Select Gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const referral = [
  { value: "", label: "Select" },
  { value: "Child School", label: "Child School" },
  { value: "Child Coach", label: "Child Coach" },
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "Whatsapp", label: "Whatsapp" },
  { value: "Google", label: "Google" },
  { value: "Other", label: "Other" },
];

const ageGroupOptionsMale = [
  { value: "", label: "Select Age Group", startYear: 0, endYear: 0 },
  {
    value: "Group 1 Boys",
    label: "Group - 1 Boys (Born between 1/1/2008 to 31/12/2010)",
    startYear: 2008,
    endYear: 2010,
  },
  {
    value: "Group 2 Boys",
    label: "Group - 2 Boys (Born 2011)",
    startYear: 2011,
    endYear: 2011,
  },
  {
    value: "Group 3 Boys",
    label: "Group - 3 Boys (Born 2012)",
    startYear: 2012,
    endYear: 2012,
  },
  {
    value: "Group 4 Boys",
    label: "Group - 4 Boys (Born 2013)",
    startYear: 2013,
    endYear: 2013,
  },
  {
    value: "Group 5 Boys",
    label: "Group - 5 Boys (Born 2014)",
    startYear: 2014,
    endYear: 2014,
  },
  {
    value: "Group 6 Boys",
    label: "Group - 6 Boys (Born 2015)",
    startYear: 2015,
    endYear: 2015,
  },
  {
    value: "Group 7 Boys",
    label: "Group - 7 Boys (Born 2016)",
    startYear: 2016,
    endYear: 2016,
  },
  {
    value: "Group 8 Boys",
    label: "Group - 8 Boys (Born 2017)",
    startYear: 2017,
    endYear: 2017,
  },
  {
    value: "Group 9 Boys",
    label: "Group - 9 Boys (Born 2018)",
    startYear: 2018,
    endYear: 2018,
  },
  {
    value: "Group 10 Boys",
    label: "Group - 10 Boys (Born 2019)",
    startYear: 2019,
    endYear: 2019,
  },
  {
    value: "Group 11 Boys",
    label: "Group - 11 Boys (Born 2020)",
    startYear: 2020,
    endYear: 2020,
  },
  {
    value: "Seniors Men: 18 yrs to 29 yrs",
    label: "Seniors Men: 18 yrs to 29 yrs",
    startYear: 2007,
    endYear: 1996,
  },
  {
    value: "Group A Men: 30 to 40 yrs",
    label: "Group-A Men: 30 to 40 yrs",
    startYear: 1997,
    endYear: 1988,
  },
  {
    value: "Group B Men: 41 to 50 yrs",
    label: "Group-B Men: 41 to 50 yrs",
    startYear: 1987,
    endYear: 1978,
  },
  {
    value: "Group C Men: 51 to 60 yrs",
    label: "Group-C Men: 51 to 60 yrs",
    startYear: 1977,
    endYear: 1968,
  },
  {
    value: "Group D Men: 61+ yrs",
    label: "Group-D Men: 61+ yrs",
    startYear: 1967,
    endYear: null,
  },
];

const ageGroupOptionsFemale = [
  { value: "", label: "Select Age Group", startYear: 0, endYear: 0 },
  {
    value: "Group 1 Girls",
    label: "Group - 1 Girls (Born between 1/1/2008 to 31/12/2010)",
    startYear: 2008,
    endYear: 2010,
  },
  {
    value: "Group 2 Girls",
    label: "Group - 2 Girls (Born 2011)",
    startYear: 2011,
    endYear: 2011,
  },
  {
    value: "Group 3 Girls",
    label: "Group - 3 Girls (Born 2012)",
    startYear: 2012,
    endYear: 2012,
  },
  {
    value: "Group 4 Girls",
    label: "Group - 4 Girls (Born 2013)",
    startYear: 2013,
    endYear: 2013,
  },
  {
    value: "Group 5 Girls",
    label: "Group - 5 Girls (Born 2014)",
    startYear: 2014,
    endYear: 2014,
  },
  {
    value: "Group 6 Girls",
    label: "Group - 6 Girls (Born 2015)",
    startYear: 2015,
    endYear: 2015,
  },
  {
    value: "Group 7 Girls",
    label: "Group - 7 Girls (Born 2016)",
    startYear: 2016,
    endYear: 2016,
  },
  {
    value: "Group 8 Girls",
    label: "Group - 8 Girls (Born 2017)",
    startYear: 2017,
    endYear: 2017,
  },
  {
    value: "Group 9 Girls",
    label: "Group - 9 Girls (Born 2018)",
    startYear: 2018,
    endYear: 2018,
  },
  {
    value: "Group 10 Girls",
    label: "Group - 10 Girls (Born 2019)",
    startYear: 2019,
    endYear: 2019,
  },
  {
    value: "Group 11 Girls",
    label: "Group - 11 Girls (Born 2020)",
    startYear: 2020,
    endYear: 2020,
  },
  {
    value: "Seniors Women: 18 yrs to 29 yrs",
    label: "Seniors Women: 18 yrs to 29 yrs",
    startYear: 2007,
    endYear: 1996,
  },
  {
    value: "Group A Women: 30 to 40 yrs",
    label: "Group-A Women: 30 to 40 yrs",
    startYear: 1995,
    endYear: 1985,
  },
  {
    value: "Group B Women: 41 to 50 yrs",
    label: "Group-B Women: 41 to 50 yrs",
    startYear: 1984,
    endYear: 1975,
  },
  {
    value: "Group C Women: 51 to 60 yrs",
    label: "Group-C Women: 51 to 60 yrs",
    startYear: 1974,
    endYear: 1965,
  },
  {
    value: "Group D Women: 61+ yrs",
    label: "Group-D Women: 61+ yrs",
    startYear: 1964,
    endYear: null,
  },
];
interface FormValues {
  swimmerFirstName: string;
  swimmerLastName: string;
  gender: string;
  school: string;
  grade: string;
  state: string;
  dob: string | null;
  proofOfAge: string | null;
  ageGroup: string;
  event_freestyle: boolean;
  freestyleTime: string;
  event_breast_Stroke: boolean;
  breast_StrokeTime: string;
  event_back_Stroke: boolean;
  back_StrokeTime: string;
  event_butterfly: boolean;
  butterflyTime: string;
  relay: boolean;
  email: string;
  parentName: string;
  parent1Contact: string;
  parent2Contact: string;
  coachContact: string;
  referral: string;
  amount: number;
  terms_conditions: boolean;
}

export default function SwimmingRegistrationForm() {
  const [error, setError] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      swimmerFirstName: "",
      swimmerLastName: "",
      gender: "",
      school: "",
      grade: "",
      state: "",
      dob: new Date().toISOString().split("T")[0],
      proofOfAge: null,
      ageGroup: "",
      event_freestyle: false,
      freestyleTime: "",
      event_breast_Stroke: false,
      breast_StrokeTime: "",
      event_back_Stroke: false,
      back_StrokeTime: "",
      event_butterfly: false,
      butterflyTime: "",
      relay: false,
      swimmer1: "",
      swimmer2: "",
      email: "",
      confirm_email: "",
      parentName: "",
      parent1Contact: "",
      parent2Contact: "",
      coachContact: "",
      referral: "",
      amount: 0,
      terms_conditions: false,
    },
    
    validationSchema,
    onSubmit: async (values) => {
      const formvalues = formik.values as FormValues;

      const selectedCheckboxes = Object.keys(formvalues).filter(
        (key) => key.startsWith("event_") && formvalues[key as keyof FormValues]
      ).length;
      if (selectedCheckboxes >= 1) {
        values.amount = calculateCompetitionFees(values);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("swimmerData", JSON.stringify(values));
        }
        router.push("/payment");
      } else {
        setError("Must select 1 swimming event.");
      }
    },

    validate(values) {
      const errors: Partial<typeof values> = {};
      if (values.email && values.confirm_email && values.email !== values.confirm_email) {
      errors.confirm_email = "Emails do not match";
      }
      return errors;
    },
  });

  const calculateCompetitionFees = (userData: any) => {
    const currentDate = new Date();
    let hasSwimmingEvents = 0;
    const {
      relay,
      event_freestyle,
      event_breast_Stroke,
      event_butterfly,
      event_back_Stroke,
    } = userData;
    if (
      event_freestyle ||
      event_breast_Stroke ||
      event_butterfly ||
      event_back_Stroke
    ) {
      hasSwimmingEvents = 1;
    }
    const hasRelay = relay ? 1 : 0;
    const date1 = new Date(
      (process.env.NEXT_PUBLIC_LATE_FEES_DATE1 as string) ?? ""
    );
    const date2 = new Date(
      (process.env.NEXT_PUBLIC_LATE_FEES_DATE2 as string) ?? ""
    );
    const date3 = new Date(
      (process.env.NEXT_PUBLIC_LATE_FEES_DATE2 as string) ?? ""
    );


    const feeStructure = [
      {
        date: date1,
        swimmingEventFee: process.env.NEXT_PUBLIC_EVENT_LATE_FEES_AMOUNT1
          ? parseInt(process.env.NEXT_PUBLIC_EVENT_LATE_FEES_AMOUNT1, 10)
          : 0,
        relayFee: process.env.NEXT_PUBLIC_RELAY_LATE_FEES_AMOUNT1
          ? parseInt(process.env.NEXT_PUBLIC_RELAY_LATE_FEES_AMOUNT1, 10)
          : 0,
      },
      {
        date: date2,
        swimmingEventFee: process.env.NEXT_PUBLIC_EVENT_LATE_FEES_AMOUNT2
          ? parseInt(process.env.NEXT_PUBLIC_EVENT_LATE_FEES_AMOUNT2, 10)
          : 0,
        relayFee: process.env.NEXT_PUBLIC_RELAY_LATE_FEES_AMOUNT2
          ? parseInt(process.env.NEXT_PUBLIC_RELAY_LATE_FEES_AMOUNT2, 10)
          : 0,
      },
      {
        date: date3,
        swimmingEventFee: process.env.NEXT_PUBLIC_EVENT_LATE_FEES_AMOUNT3
          ? parseInt(process.env.NEXT_PUBLIC_EVENT_LATE_FEES_AMOUNT3, 10)
          : 0,
        relayFee: process.env.NEXT_PUBLIC_RELAY_LATE_FEES_AMOUNT3
          ? parseInt(process.env.NEXT_PUBLIC_RELAY_LATE_FEES_AMOUNT3, 10)
          : 0,
      },
    ];

    let calculatedAmount = 0;
    for (const fee of feeStructure) {
      if (currentDate < fee.date) {
        calculatedAmount =
          hasSwimmingEvents * fee.swimmingEventFee + hasRelay * fee.relayFee;
        break;
      }
    }

    if (calculatedAmount === 0) {
      const lastFee = feeStructure[feeStructure.length - 1];
      calculatedAmount =
        hasSwimmingEvents * lastFee.swimmingEventFee +
        hasRelay * lastFee.relayFee;
    }

    return calculatedAmount;
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // Cast formik.values to the FormValues type
    const values = formik.values as FormValues;

    const selectedCheckboxes = Object.keys(values).filter(
      (key) => key.startsWith("event_") && values[key as keyof FormValues]
    ).length;

    if (selectedCheckboxes < 2 || !checked) {
      formik.setFieldValue(name, checked);
      if (!checked) {
        formik.setFieldValue(`${name.replace("event_", "")}Time`, "");
      }
      setError("");
    } else {
      setError("Only two events can be selected at a time.");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    formik.handleChange(e);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (file.size > 1000000) {
      setFileSize("File size should be less than 1MB");
      return;
    }
    setFileSize(""); // Clear previous error
    const formData = new FormData();
    formData.append("file", file as Blob);
    try {
      const response = await axios.post("/api/file-upload", formData);
      if (!response?.data?.url) {
        setFileSize("Failed to upload file");
        return;
      }
      formik.setFieldValue("proofOfAge", response.data.url);
    } catch (err) {
      console.error("File upload error:", err);
      setFileSize("Failed to upload file");
    }
  };

  const getAgeGroup = (birthYear: number, gender?: string) => {
    const groups =
      formik.values.gender === "Male"
        ? ageGroupOptionsMale
        : ageGroupOptionsFemale;
    for (const group of groups) {
      if (group.endYear === null) {
        if (birthYear <= group.startYear) return group.value;
      } else if (group.startYear !== undefined && group.endYear !== undefined) {
        if (
          (group.startYear <= group.endYear &&
            birthYear >= group.startYear &&
            birthYear <= group.endYear) ||
          (group.startYear > group.endYear &&
            birthYear <= group.startYear &&
            birthYear >= group.endYear)
        ) {
          return group.value;
        }
      }
    }
    return "Unknown Group";
  };

  // Enhanced: Auto-select age group on DOB or gender change
  useEffect(() => {
    if (formik.values.dob && formik.values.gender) {
      const birthYear = new Date(formik.values.dob).getFullYear();
      const ageGroup = getAgeGroup(birthYear, formik.values.gender);
      formik.setFieldValue("ageGroup", ageGroup);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.dob, formik.values.gender]);

  let ageGroupOptions:
    | typeof ageGroupOptionsMale
    | typeof ageGroupOptionsFemale
    | Array<{ value: string; label: string }>;
  if (formik.values.gender === "Male") {
    ageGroupOptions = ageGroupOptionsMale;
  } else if (formik.values.gender === "Female") {
    ageGroupOptions = ageGroupOptionsFemale;
  } else {
    ageGroupOptions = [{ value: "", label: "Select Age Group" }];
  }

  useEffect(() => {
    if (formik.values.relay) {
      if (!formik.values.swimmer1 || !formik.values.swimmer2) {
        formik.setFieldError("swimmer1", "Relay swimmer 1 is required");
        formik.setFieldError("swimmer2", "Relay swimmer 2 is required");
      }
    }
  }, [
    formik,
    formik.values.relay,
    formik.values.swimmer1,
    formik.values.swimmer2,
  ]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-blue-300 mt-10 pt-10`}
    >
      <div>
        <h1 className="md:text-3xl text-2xl mb-4 mt-4 font-bold font-sans  text-center text-gray-800">
          Swim For India Academy
        </h1>
        <h1 className="md:text-2xl text-lg mb-4 font-bold font-sans text-center text-gray-800">
          Sunday, 24 August
        </h1>
        <h1 className="md:text-[25px] text-lg text-center mb-4 font-bold font-sans">
          Delhi Open Talent Search Swimming Competition 2025
        </h1>
      </div>
      <div className="mb-6 p-4 bg-blue-200 rounded-lg border border-blue-400 text-center shadow">
        <p className="font-semibold text-blue-900 mb-2">
          Want to stay updated with our Delhi Open Talent Search Swimming
          Competition?
        </p>
        <p className="mb-2 text-blue-800">
          Click the link below to join our official WhatsApp group for all event
          updates, announcements, and registration alerts.
        </p>
        <a
          href="https://chat.whatsapp.com/InMpz9O9Yg34jCeXtnBya6?mode=ac_c"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition"
        >
          Join WhatsApp Group
        </a>
        <p className="mt-4 text-blue-900 font-semibold"></p>
        <p className="mt-4 text-blue-900 font-semibold">
          For sponsorship collaborations please write a mail at{" "}
          <a
            href="mailto:swimforindiaacademy@gmail.com"
            className="text-blue-700 underline"
          >
            swimforindiaacademy@gmail.com
          </a>
        </p>
      </div>
      <InputField
        id="swimmerFirstName"
        label="Swimmer's First Name"
        value={formik.values.swimmerFirstName}
        onChange={handleChange}
      />
      {formik.errors.swimmerFirstName && formik.touched.swimmerFirstName && (
        <span className="text-red-700">{formik.errors.swimmerFirstName}</span>
      )}
      <InputField
        id="swimmerLastName"
        label="Swimmer's Last Name"
        value={formik.values.swimmerLastName}
        onChange={handleChange}
      />
      {formik.errors.swimmerLastName && formik.touched.swimmerLastName && (
        <span className="text-red-700">{formik.errors.swimmerLastName}</span>
      )}
      <SelectField
        id="gender"
        label="Gender"
        value={formik.values.gender}
        options={genderOptions}
        onChange={handleChange}
      />
      {formik.errors.gender && formik.touched.gender && (
        <span className="text-red-700">{formik.errors.gender}</span>
      )}
      <InputField
        id="school"
        label="School Name"
        value={formik.values.school}
        onChange={handleChange}
      />
      {formik.errors.school && formik.touched.school && (
        <span className="text-red-700">{formik.errors.school}</span>
      )}
      <InputField
        id="grade"
        label="Grade/Class"
        value={formik.values.grade}
        onChange={handleChange}
      />
      {formik.errors.grade && formik.touched.grade && (
        <span className="text-red-700">{formik.errors.grade}</span>
      )}
      <div className="mb-4">
        <Label htmlFor="state">State</Label>
        <div className="relative h-10 w-full min-w-[200px]">
          <select
            name="state"
            onChange={handleChange}
            className="peer h-full w-full rounded-[7px] bg-white border border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-800 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option key="" value="" className="bg-white">
              Select State
            </option>
            {State.getStatesOfCountry("IN").map((option) => (
              <option
                key={option.isoCode}
                value={option.name}
                className="bg-white"
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {formik.errors.state && formik.touched.state && (
        <span className="text-red-700">{formik.errors.state}</span>
      )}
      <DateSelector
        id="dob"
        label="Date of Birth"
        onChange={(e) => {
          formik.setFieldValue("dob", e);
        }}
      />
      {formik.errors.dob && formik.touched.dob && (
        <span className="text-red-700">{formik.errors.dob}</span>
      )}
      <SelectField
        id="ageGroup"
        label="Age Group"
        value={formik.values.ageGroup}
        options={ageGroupOptions}
        onChange={handleChange}
      />
      {formik.errors.ageGroup && formik.touched.ageGroup && (
        <span className="text-red-700">{formik.errors.ageGroup}</span>
      )}
      <FileUploader
        id="proofFile"
        label="Upload Proof of Age"
        type="file"
        onChange={handleFileChange}
      />
      {fileSize && <span className="text-red-700">{fileSize}</span>}
      {formik.errors.proofOfAge && formik.touched.proofOfAge && (
        <span className="text-red-700">{formik.errors.proofOfAge}</span>
      )}
      <div className="border-4 p-4 mb-2 rounded-lg">
        <label
          htmlFor="events"
          className="block mb-2 font-semibold text-gray-700 md:text-m text-sm"
        >
          Select Swimming Events (Maximum Two)
        </label>
        <div className=" ml-5 ">
          <CheckboxField
            id="event_freestyle"
            label="50 meter Freestyle"
            checked={formik.values.event_freestyle}
            onChange={handleCheckboxChange}
          />
          {
            <>
              <label
                className="ml-4 mr-2 font-semibold text-gray-700 md:text-m text-sm"
                htmlFor="back_StrokeTime"
              >
                {" "}
                Please add event time here
              </label>
              <input
                className="h-5 w-40 pl-2 rounded-md text-xs border-[1px] "
                disabled={!formik.values.event_freestyle}
                id="freestyleTime"
                placeholder="Ex 1 minute 52 seconds"
                value={formik.values.freestyleTime}
                onChange={handleChange}
                required={formik.values.event_freestyle}
              />
            </>
          }
          {formik.errors.freestyleTime && formik.touched.freestyleTime && (
            <span className="text-red-700">{formik.errors.freestyleTime}</span>
          )}

          <CheckboxField
            id="event_breast_Stroke"
            label="50 meter Breast Stroke"
            checked={formik.values.event_breast_Stroke}
            onChange={handleCheckboxChange}
          />
          {
            <>
              <label
                className="ml-4 mr-2 font-semibold text-gray-700 md:text-m text-sm"
                htmlFor="back_StrokeTime"
              >
                {" "}
                Please add event time here
              </label>
              <input
                className="h-5 w-40 pl-2 rounded-md text-xs border-[1px] "
                disabled={!formik.values.event_breast_Stroke}
                id="breast_StrokeTime"
                placeholder="Ex 1 minute 52 seconds"
                value={formik.values.breast_StrokeTime}
                onChange={handleChange}
                required={formik.values.event_breast_Stroke}
              />
            </>
          }
          {formik.errors.breast_StrokeTime &&
            formik.touched.breast_StrokeTime && (
              <span className="text-red-700">
                {formik.errors.breast_StrokeTime}
              </span>
            )}

          <CheckboxField
            id="event_back_Stroke"
            label="50 meter Back Stroke"
            checked={formik.values.event_back_Stroke}
            onChange={handleCheckboxChange}
          />
          {
            <>
              <label
                className="ml-4 mr-2 font-semibold text-gray-700 md:text-m text-sm"
                htmlFor="back_StrokeTime"
              >
                {" "}
                Please add event time here
              </label>
              <input
                className=" w-40 pl-2 rounded-md text-xs border-[1px] h-5 "
                disabled={!formik.values.event_back_Stroke}
                id="back_StrokeTime"
                placeholder="Ex 1 minute 52 seconds"
                value={formik.values.back_StrokeTime}
                onChange={handleChange}
                required={formik.values.event_back_Stroke}
              />
            </>
          }
          {formik.errors.back_StrokeTime && formik.touched.back_StrokeTime && (
            <span className="text-red-700">
              {formik.errors.back_StrokeTime}
            </span>
          )}

          <CheckboxField
            id="event_butterfly"
            label="50 meter Butterfly"
            checked={formik.values.event_butterfly}
            onChange={handleCheckboxChange}
          />
          {
            <>
              <label
                className="ml-4 mr-2 font-semibold text-gray-700 md:text-m text-sm"
                htmlFor="back_StrokeTime"
              >
                Please add event time here
              </label>
              <input
                disabled={!formik.values.event_butterfly}
                className={`w-40 pl-2 rounded-md text-xs border-[1px] h-5 border-gray-600}`}
                id="butterflyTime"
                placeholder="Ex 1 minute 52 seconds"
                value={formik.values.butterflyTime}
                onChange={handleChange}
                required={formik.values.event_butterfly}
              />
            </>
          }
          {formik.errors.butterflyTime && formik.touched.butterflyTime && (
            <span className="text-red-700">{formik.errors.butterflyTime}</span>
          )}
        </div>
        {error && (
          <span className="text-red-700 md:text-m text-sm">{error}</span>
        )}
      </div>
      <div className="border-4 p-4 mb-2 rounded-lg">
        <CheckboxField
          id="relay"
          label="2x50m Mixed Freestyle Relay (Teams consist of 2 swimmers, regardless of gender.)"
          checked={formik.values.relay}
          onChange={handleChange}
        />
        {formik.errors.relay && formik.touched.relay && (
          <span className="text-red-700">{formik.errors.relay}</span>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="swimmer1"
            label="Relay Swimmer 1 Name"
            value={formik.values.swimmer1}
            onChange={handleChange}
          />
          {formik.errors.swimmer1 && formik.touched.swimmer1 && (
            <span className="text-red-700">{formik.errors.swimmer1}</span>
          )}
          <InputField
            id="swimmer2"
            label="Relay Swimmer 2 Name"
            value={formik.values.swimmer2}
            onChange={handleChange}
          />
          {formik.errors.swimmer2 && formik.touched.swimmer2 && (
            <span className="text-red-700">{formik.errors.swimmer2}</span>
          )}
        </div>
      </div>
      <InputField
        id="email"
        label="Email Address (of parent)"
        value={formik.values.email}
        onChange={handleChange}
      />
      {formik.errors.email && formik.touched.email && (
        <span className="text-red-700">{formik.errors.email}</span>
      )}
      <InputField
        id="confirm_email"
        label="Confirm Email Address (of parent)"
        value={formik.values.confirm_email}
        onChange={handleChange}
      />
      {formik.errors.confirm_email && formik.touched.confirm_email && (
        <span className="text-red-700">{formik.errors.confirm_email}</span>
      )}
      <InputField
        id="parentName"
        label="Parent's / Guardian's Name"
        value={formik.values.parentName}
        onChange={handleChange}
      />
      {formik.errors.parentName && formik.touched.parentName && (
        <span className="text-red-700">{formik.errors.parentName}</span>
      )}
      <InputField
        id="parent1Contact"
        label="Parent 1 Contact Number (WhatsApp)"
        value={formik.values.parent1Contact}
        onChange={handleChange}
      />
      {formik.errors.parent1Contact && formik.touched.parent1Contact && (
        <span className="text-red-700">{formik.errors.parent1Contact}</span>
      )}
      <InputField
        id="parent2Contact"
        label="Parent 2 Contact Number (WhatsApp) Optional"
        value={formik.values.parent2Contact}
        onChange={handleChange}
      />
      {formik.errors.parent2Contact && formik.touched.parent2Contact && (
        <span className="text-red-700">{formik.errors.parent2Contact}</span>
      )}
      <div className="pt-6">
        <InputField
          id="coachContact"
          label="Coach/Sports Teacher Contact Number (WhatsApp)"
          value={formik.values.coachContact}
          onChange={handleChange}
        />
        {formik.errors.coachContact && formik.touched.coachContact && (
          <span className="text-red-700">{formik.errors.coachContact}</span>
        )}
      </div>{" "}
      <div className="pt-6 ">
        <SelectField
          id="referral"
          label="How did you come to know of Swimming Competition 2025?"
          value={formik.values.referral}
          options={referral}
          onChange={handleChange}
        />
        {formik.errors.referral && formik.touched.referral && (
          <span className="text-red-700 ">{formik.errors.referral}</span>
        )}
      </div>
      <div className="inline-flex items-center">
        <input
          type="checkbox"
          id="terms_conditions"
          name="terms_conditions"
          checked={formik.values.terms_conditions}
          onChange={(e) =>
            formik.setFieldValue(
              "terms_conditions",
              !formik.values.terms_conditions
            )
          }
          className="before:content[''] bg-white peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
        />
        <p className="font-normal ml-4">
          I accept all the{" "}
          <a
            className={`md:text-m text-sm font-normal cursor-pointer select-none text-blue-500 underline`}
            href="https://k6sa9dnnyttq1amd.public.blob.vercel-storage.com/Terms%20%26%20Conditions%202025.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Terms & Conditions
          </a>
        </p>
      </div>
      {formik.errors.terms_conditions && formik.touched.terms_conditions && (
        <span className="text-red-700">{formik.errors.terms_conditions}</span>
      )}
      <br />
      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}
