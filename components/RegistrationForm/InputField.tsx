// components/InputField.tsx
import { ChangeEvent } from 'react';
import Label from './Label';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ id, label, type = 'text', value, onChange }: Readonly<InputFieldProps>) {
  return (
    <div className={`w-full mb-12 mt-10 `}>
      <div className="relative w-full min-w-[250px] h-10">
        <Label htmlFor={id}>{label}</Label>
        <input
        id={id}
        name={id}
        type="text"
        onChange={onChange}
        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0  focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-[1.7px] text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-600"
        />
      </div>
    </div>
  );
}
