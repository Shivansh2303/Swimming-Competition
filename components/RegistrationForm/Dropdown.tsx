// components/SelectField.tsx
import { ChangeEvent } from 'react';
import Label from './Label';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectField({ id, label, value, options, onChange }: Readonly<SelectFieldProps>) {
  return (
    <div className="mb-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative h-10 w-full min-w-[200px]">
        <select
        name={id}
        value={value}
        onChange={onChange}
          className="peer h-full w-full rounded-[7px] bg-white border border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-800 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
          {options.map((option) => (
            <option key={option.value} value={option.value} className='bg-white'>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
