// components/CheckboxField.tsx
import { ChangeEvent } from 'react';
import Label from './Label';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxField({ id, label, checked, onChange }: CheckboxFieldProps) {
  return (
    <div className="mb-4">
      <div className="inline-flex items-center">
        <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={id}>
          <input
            type="checkbox"
            id={id}
            name={id}
            // checked={checked}
            onChange={onChange}
            className="before:content[''] bg-white peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            />
        </label>
        <label className="mt-px font-normal text-gray-700 cursor-pointer select-none" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}
