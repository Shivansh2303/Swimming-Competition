// components/CheckboxField.tsx
import { ChangeEvent } from 'react';
import Label from './Label';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxField({ id, label, checked ,onChange }: CheckboxFieldProps) {
  return (<>
  <div className="">
      <div className="inline-flex items-center">
        <label className="relative  flex items-center p-3 rounded-full cursor-pointer" htmlFor={id}>
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={checked}
            onChange={onChange}
            className="before:content[''] bg-white peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            />
        </label>
        <label className={`md:text-m text-sm font-semibold text-gray-700 cursor-pointer select-none ${id==="terms_conditions"?"text-blue-500":""}`} htmlFor={id}>
          {label}
        </label>
      </div>
      
    </div>
    {/* {id!=='relay'&&( <input
      id={id}
      name={id}
      type="text"
      onChange={onChange}
      className={`peer w-32 ml-4 h-5 bg-white text-blue-gray-700 font-sans font-normal outline outline-0  focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 ${checked?"":"hidden ml-20"}`}
    />)} */}
  </>
    
  );
}
