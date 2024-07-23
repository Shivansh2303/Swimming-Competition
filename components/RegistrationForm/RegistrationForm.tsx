"use client";
import { ChangeEvent, useEffect, useState } from 'react';
import InputField from './InputField';
import SelectField from './Dropdown';
import CheckboxField from './CheckBoxField';
import Label from './Label';
import FileUploader from './FileUploader';
import DateSelector from './DatePicker';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import validationSchema from '@/lib/Formvalidations';
import SwimmingCompetitionForm from '@/app/models/form.models';
import axios from 'axios';

const statesOptions = [
  { value: "", label: "Select State" },
  { value: "AP", label: "Andhra Pradesh" },
  { value: "AR", label: "Arunachal Pradesh" },
  { value: "AS", label: "Assam" },
  { value: "BR", label: "Bihar" },
  { value: "CT", label: "Chhattisgarh" },
  { value: "GA", label: "Goa" },
  { value: "GJ", label: "Gujarat" },
  { value: "HR", label: "Haryana" },
  { value: "HP", label: "Himachal Pradesh" },
  { value: "JH", label: "Jharkhand" },
  { value: "KA", label: "Karnataka" },
  { value: "KL", label: "Kerala" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "MH", label: "Maharashtra" },
  { value: "MN", label: "Manipur" },
  { value: "ML", label: "Meghalaya" },
  { value: "MZ", label: "Mizoram" },
  { value: "NL", label: "Nagaland" },
  { value: "OR", label: "Odisha" },
  { value: "PB", label: "Punjab" },
  { value: "RJ", label: "Rajasthan" },
  { value: "SK", label: "Sikkim" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "TG", label: "Telangana" },
  { value: "TR", label: "Tripura" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "UK", label: "Uttarakhand" },
  { value: "WB", label: "West Bengal" },
];

const genderOptions = [
  { value: "", label: "Select Gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
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


export default function SwimmingRegistrationForm() {
  const [events, setEvents]=useState<string[]>([])
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      swimmerFirstName: '',
      swimmerSecondName: '',
      gender: '',
      school: '',
      grade: '',
      country: '',
      state: '',
      dob: null,
      proofOfAge: null,
      ageGroup: '',
      // events: [''],
      relay: false,
      swimathon: false,
      email: '',
      parentName: '',
      parent1Contact: '',
      parent2Contact: '',
      coachContact: '',
      referral: '',
    },
    validationSchema,
    onSubmit: async (values) => {
     if (typeof window !== "undefined") {
      window.localStorage.setItem('swimmerData',JSON.stringify(values))
    }
     router.push('/payment')
    },
  });
  const toggleItem =(inputValue:string)=>{
    if (inputValue) {
      if (events.includes(inputValue)) {
        setError('');
        setEvents(events.filter(item => item !== inputValue));
      }else if(events.length< 2){
        setError('');
          setEvents([...events, inputValue]);
        } else {
          setError('You can only add up to 2 items.');
        }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log('Value changed:', e.target.name, e.target.value);
    formik.handleChange(e);  // Continue to handle the change with Formik
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue('proofOfAge', file);
  };
  const handleMongo=()=>{
    console.log("dreatinf mongo");
    
    const formData=new SwimmingCompetitionForm({
      swimmerFirstName:"Anshul",
 swimmerSecondName:"Kate"
    })
   //  const formData=await SwimmingCompetitionForm.create({})
    formData.save()
    console.log({formData:formData});
    
  }

  useEffect(() => {
    if(events.length<2) {setError('')}
    
    console.log('Formik values:', formik.values);
    console.log('Formik errors:', formik.errors);
  },[formik.errors,formik.values,events.length]);
  return (
    <form  onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-blue-200  mt-10 pt-10">
      <h1 className="text-2xl mb-4 font-bold font-serif text-center">
        Swim For India Academy
      </h1>
      <h1 className="text-2xl mb-4 font-semibold font-serif">
        Delhi Open Talent Search Swimming Competition 2024 
      </h1>

      <InputField
        id="swimmerFirstName"
        label="Swimmer's First Name"
        value={formik.values.swimmerFirstName}
        onChange={handleChange}
      />
      {formik.errors.swimmerFirstName && formik.touched.swimmerFirstName && <span className='text-red-700'>{formik.errors.swimmerFirstName}</span>}
      <InputField
        id="swimmerSecondName"
        label="Swimmer's Second Name"
        value={formik.values.swimmerSecondName}
        onChange={handleChange}
      />
      {formik.errors.swimmerSecondName && formik.touched.swimmerSecondName && <span className='text-red-700'>{formik.errors.swimmerSecondName}</span>}
      
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
     
      <SelectField
        id="country"
        label="Country"
        value={formik.values.country}
        options={statesOptions}
        onChange={handleChange}
      />
      {formik.errors.country && formik.touched.country && <span className='text-red-700'>{formik.errors.country}</span>}

      <SelectField
        id="state"
        label="State"
        value={formik.values.state}
        options={statesOptions}
        onChange={handleChange}
      />
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
      <div className="mb-4">
        <label htmlFor="events" className="block text-sm font-medium text-gray-700">
          Select Swimming Events (Maximum Two)
        </label>
        <div className="mt-1 ml-8 space-y-2">
          {['50 meter Freestyle', '50 meter Breast Stroke', '50 meter Back Stroke', '50 meter Butterfly'].map((event) => (
            <div key={event}>
              <CheckboxField
                id={event}
                label={event}
                checked={events.includes(event)}
                onChange={e=>toggleItem(event)}
              />
            </div>
          ))}
        </div>
        {error && <span className='text-red-700'>{error}</span>}
      </div>

      <CheckboxField
        id="relay"
        label="4x50 meter Mixed Relay 2 Boys 2 Girls"
        checked={formik.values.relay}
        onChange={handleChange}
      />
      {formik.errors.relay && formik.touched.relay && <span className='text-red-700'>{formik.errors.relay}</span>}

      <CheckboxField
        id="swimathon"
        label="Swimathon Events (OPEN AGE GROUP)"
        checked={formik.values.swimathon}
        onChange={handleChange}
      />
      {formik.errors.swimathon && formik.touched.swimathon && <span className='text-red-700'>{formik.errors.swimathon}</span>}

      <InputField
        id="email"
        label="Email Address (of parent)"
        value={formik.values.email}
        onChange={handleChange}
      />
      {formik.errors.email && formik.touched.email && <span className='text-red-700'>{formik.errors.email}</span>}
        
      <InputField
        id="parentName"
        label="Parent's / Guardian's Name)"
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
        id="coachContact"
        label="Parent 2 Contact Number (WhatsApp)"
        value={formik.values.parent2Contact}
        onChange={handleChange}
      />
      {formik.errors.parent2Contact && formik.touched.parent2Contact && <span className='text-red-700'>{formik.errors.parent2Contact}</span>}
      <InputField
        id="coachContact"
        label="Coach/Sports Teacher Contact Number (WhatsApp)"
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
      <br />
      <button
        type="submit"
        onClick={e=>handleMongo}
        className="m-8 ml-1 p-2 bg-blue-500 text-white rounded-md shadow-sm"
      >
        Submit
      </button>
    </form>
  );
}
