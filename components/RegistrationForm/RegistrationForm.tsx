"use client";
import { ChangeEvent, useEffect, useState } from 'react';
import InputField from './InputField';
import SelectField from './Dropdown';
import CheckboxField from './CheckBoxField';
import FileUploader from './FileUploader';
import DateSelector from './DatePicker';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import validationSchema from '@/lib/Formvalidations';
import {  State } from "country-state-city";
import Label from './Label';


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

const ageGroupOptions = [
  { value: "", label: "Select Age Group" },
  {
    value: "Group 1",
    label: "Group - 1 (Born between 1/1/2007 to 31/12/2009)",
  },
  { value: "Group 2", label: "Group - 2 (Born 2010)" },
  { value: "Group 3", label: "Group - 3 (Born 2011)" },
  { value: "Group 4", label: "Group - 4 (Born 2012)" },
  { value: "Group 5", label: "Group - 5 (Born 2013)" },
  { value: "Group 6", label: "Group - 6 (Born 2014)" },
  { value: "Group 7", label: "Group - 7 (Born 2015)" },
  { value: "Group 8", label: "Group - 8 (Born 2016)" },
  { value: "Group 9", label: "Group - 9 (Born 2017)" },
  { value: "Group 10", label: "Group - 10 (Born 2018)" },
  { value: "Group 11", label: "Group - 11 (Born 2019)" },
  { value: "Seniors", label: "Seniors Boys & Girls: 18 yrs. To 29 yrs." },
  { value: "Masters A", label: "Masters Group - A: 30 to 40 yrs." },
  { value: "Masters B", label: "Masters Group - B: 41 to 50 yrs." },
  { value: "Masters C", label: "Masters Group - C: 51+ yrs." },
];
interface FormValues {
  swimmerName: string;
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
}
  
export default function SwimmingRegistrationForm() {
  const [error, setError] = useState<string>('');
  const [event, setEvent] = useState<number>(0);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      swimmerName: '',
      gender: '',
      school: '',
      grade: '',
      state: '',
      dob: null,
      proofOfAge: null,
      ageGroup: '',
      event_freestyle: false,
      freestyleTime: "",
      event_breast_Stroke: false,
      breast_StrokeTime: "",
      event_back_Stroke: false,
      back_StrokeTime: "",
      event_butterfly: false,
      butterflyTime: "",
      relay: false,
      email: '',
      parentName: '',
      parent1Contact: '',
      parent2Contact: '',
      coachContact: '',
      referral: '',
      amount: 0
    },
    validationSchema,
    onSubmit: async (values) => {

      values.amount = calculateCompetitionFees(values);
      if (typeof window !== "undefined") {
        window.localStorage.setItem('swimmerData', JSON.stringify(values));
      }
      router.push('/payment');
    },
  });

  const calculateCompetitionFees = (userData: any) => {
    const currentDate = new Date();
    const { relay } = userData;
    const hasSwimmingEvents = event? 1 : 0;
    const hasRelay = relay ? 1 : 0;

    const feeStructure = [
      { date: new Date("2024-07-30"), swimmingEventFee: 1000, relayFee: 1500, marathonFee: 1500 },
      { date: new Date("2024-08-10"), swimmingEventFee: 1500, relayFee: 2000, marathonFee: 2000 },
      { date: new Date("2024-08-15"), swimmingEventFee: 2000, relayFee: 2500, marathonFee: 2500 },
      { date: new Date("2024-08-25"), swimmingEventFee: 2500, relayFee: 3000, marathonFee: 3000 }
    ];

    let calculatedAmount = 0;
    for (const fee of feeStructure) {
      if (currentDate < fee.date) {
        calculatedAmount = hasSwimmingEvents * fee.swimmingEventFee + hasRelay * fee.relayFee;
        break;
      }
    }

    if (calculatedAmount === 0) {
      const lastFee = feeStructure[feeStructure.length - 1];
      calculatedAmount = hasSwimmingEvents * lastFee.swimmingEventFee + hasRelay * lastFee.relayFee;
    }

    return calculatedAmount;
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
  
    // Cast formik.values to the FormValues type
    const values = formik.values as FormValues;
    
    const selectedCheckboxes = Object.keys(values)
      .filter(key => key.startsWith('event_') && values[key as keyof FormValues])
      .length;
    console.log(selectedCheckboxes);
  
    setEvent(selectedCheckboxes);
    if (selectedCheckboxes < 2 || !checked) {
      formik.setFieldValue(name, checked);
      if (!checked) {
        formik.setFieldValue(`${name.replace('event_', '')}Time`, '');
      }
      setError('');
    } else {
      setError('Only two events can be selected at a time.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    formik.handleChange(e);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue('proofOfAge', file);
  };

  useEffect(() => {


  }, [formik.errors]);

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-blue-200 mt-10 pt-10">
      <h1 className="text-2xl mb-4 mt-4 font-bold font-sans text-center">Swim For India Academy</h1>
      <h1 className="md:text-2xl text-lg mb-4 font-bold font-sans text-center text-gray-800">Sunday, 24 August</h1>
      <h1 className="md:text-[25px] text-lg text-center mb-4 font-bold font-sans">Delhi Open Talent Search Swimming Competition 2024</h1>

      <InputField
        id="swimmerName"
        label="Swimmer's Name"
        value={formik.values.swimmerName}
        onChange={handleChange}
      />
      {formik.errors.swimmerName && formik.touched.swimmerName && <span className='text-red-700'>{formik.errors.swimmerName}</span>}

      <SelectField
        id="gender"
        label="Gender"
        value={formik.values.gender}
        options={genderOptions}
        onChange={handleChange}
      />
      {formik.errors.gender && formik.touched.gender && <span className='text-red-700'>{formik.errors.gender}</span>}

      <InputField
        id="school"
        label="School Name"
        value={formik.values.school}
        onChange={handleChange}
      />
      <InputField
        id="grade"
        label="Grade/Class"
        value={formik.values.grade}
        onChange={handleChange}
      />
      {formik.errors.grade && formik.touched.grade && <span className='text-red-700'>{formik.errors.grade}</span>}

      <div className="mb-4">
        <Label htmlFor="state">State</Label>
        <div className="relative h-10 w-full min-w-[200px]">
          <select
            name="state"
            onChange={handleChange}
            className="peer h-full w-full rounded-[7px] bg-white border border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-800 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            <option key="" value="" className='bg-white'>Select State</option>
            {State.getStatesOfCountry("IN").map((option) => (
              <option key={option.isoCode} value={option.name} className='bg-white'>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {formik.errors.state && formik.touched.state && <span className='text-red-700'>{formik.errors.state}</span>}

      <DateSelector
        id="dob"
        label="Date of Birth"
        onChange={(date) => formik.setFieldValue('dob', date)}
      />
      {formik.errors.dob && formik.touched.dob && <span className='text-red-700'>{formik.errors.dob}</span>}

      <SelectField
        id="ageGroup"
        label="Age Group"
        value={formik.values.ageGroup}
        options={ageGroupOptions}
        onChange={handleChange}
      />
      {formik.errors.ageGroup && formik.touched.ageGroup && <span className='text-red-700'>{formik.errors.ageGroup}</span>}

      <FileUploader
        id="proofFile"
        label="Upload Proof of Age"
        type="file"
        onChange={handleFileChange}
      />
      {formik.errors.proofOfAge && formik.touched.proofOfAge && <span className='text-red-700'>{formik.errors.proofOfAge}</span>}
      <div className='border-4 p-4 mb-2 rounded-lg'>
        <label htmlFor="events" className="block mb-2 font-semibold text-gray-700 md:text-m text-sm">
          Select Swimming Events (Maximum Two)
        </label>
        <div className=' ml-5 space-y-2  '>
          <CheckboxField
            id="event_freestyle"
            label="50 meter Freestyle"
            checked={formik.values.event_freestyle}
            onChange={handleCheckboxChange}
          />
          {/* {formik.values.event_freestyle && (
        <InputField
          id="freestyleTime"
          label="Freestyle"
          value={formik.values.freestyleTime}
          onChange={handleChange}
        />
      )}
      {formik.errors.freestyleTime && formik.touched.freestyleTime && <span className='text-red-700'>{formik.errors.freestyleTime}</span>} */}

          <CheckboxField
            id="event_breast_Stroke"
            label="50 meter Breast Stroke"
            checked={formik.values.event_breast_Stroke}
            onChange={handleCheckboxChange}
          />
          {/* {formik.values.event_breast_Stroke && (
        <InputField
          id="breast_StrokeTime"
          label="Breast Stroke Timing"
          value={formik.values.breast_StrokeTime}
          onChange={handleChange}
        />
      )}
      {formik.errors.breast_StrokeTime && formik.touched.breast_StrokeTime && <span className='text-red-700'>{formik.errors.breast_StrokeTime}</span>} */}

          <CheckboxField
            id="event_back_Stroke"
            label="50 meter Back Stroke"
            checked={formik.values.event_back_Stroke}
            onChange={handleCheckboxChange}
          />
          {/* {formik.values.event_back_Stroke && (
        <InputField
          id="back_StrokeTime"
          label="Back Stroke Timing"
          value={formik.values.back_StrokeTime}
          onChange={handleChange}
        />
      )}
      {formik.errors.back_StrokeTime && formik.touched.back_StrokeTime && <span className='text-red-700'>{formik.errors.back_StrokeTime}</span>} */}

          <CheckboxField
            id="event_butterfly"
            label="50 meter Butterfly"
            checked={formik.values.event_butterfly}
            onChange={handleCheckboxChange}
          />
          {/* {formik.values.event_butterfly && (
        <InputField
          id="butterflyTime"
          label="Butterfly Timing"
          value={formik.values.butterflyTime}
          onChange={handleChange}
        />
      )}
      {formik.errors.butterflyTime && formik.touched.butterflyTime && <span className='text-red-700'>{formik.errors.butterflyTime}</span>} */}

          {error && <span className='text-red-700 md:text-m text-sm'>{error}</span>}
        </div>
      </div>
      <CheckboxField
        id="relay"
        label="2x50 meter Freestyle Relay (Any two swimmers, regardless of gender)"
        checked={formik.values.relay}
        onChange={handleChange}
      />
      {formik.errors.relay && formik.touched.relay && <span className='text-red-700'>{formik.errors.relay}</span>}

      <InputField
        id="email"
        label="Email Address (of parent)"
        value={formik.values.email}
        onChange={handleChange}
      />
      {formik.errors.email && formik.touched.email && <span className='text-red-700'>{formik.errors.email}</span>}

      <InputField
        id="parentName"
        label="Parent's / Guardian's Name"
        value={formik.values.parentName}
        onChange={handleChange}
      />
      {formik.errors.parentName && formik.touched.parentName && <span className='text-red-700'>{formik.errors.parentName}</span>}

      <InputField
        id="parent1Contact"
        label="Parent 1 Contact Number (WhatsApp)"
        value={formik.values.parent1Contact}
        onChange={handleChange}
      />
      {formik.errors.parent1Contact && formik.touched.parent1Contact && <span className='text-red-700'>{formik.errors.parent1Contact}</span>}

      <InputField
        id="parent2Contact"
        label="Parent 2 Contact Number (WhatsApp) Optional"
        value={formik.values.parent2Contact}
        onChange={handleChange}
      />
      {formik.errors.parent2Contact && formik.touched.parent2Contact && <span className='text-red-700'>{formik.errors.parent2Contact}</span>}

      <InputField
        id="coachContact"
        label="Coach/Sports Teacher Contact Number"
        value={formik.values.coachContact}
        onChange={handleChange}
      />
      {formik.errors.coachContact && formik.touched.coachContact && <span className='text-red-700'>{formik.errors.coachContact}</span>}

      <SelectField
        id="referral"
        label="How did you come to know of Swimming Competition 2024?"
        value={formik.values.referral}
        options={referral}
        onChange={handleChange}
      />
      {formik.errors.referral && formik.touched.referral && <span className='text-red-700'>{formik.errors.referral}</span>}

      <button type="submit" className="mt-6 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800 transition duration-300">
        Submit
      </button>
    </form>
  );
}
