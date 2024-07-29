import React from "react";
import {  Popover} from "@material-tailwind/react";
import Label from "./Label";

interface DateType {
  id: string;
  label: string;
  onChange: (date: Date | undefined) => void;
}

export default function DateSelector({ id, label, onChange }: Readonly<DateType>) {

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {  
    const selectedDate = event.target.value ? new Date(event.target.value) : undefined;
    onChange(selectedDate);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.type = 'date';
  };

  return (
    <div className="mt-5 mb-5">
      <Label htmlFor={id}>{label}</Label>
      <Popover placement="bottom">
          <input 
            type="text" 
            placeholder="Select Date (DD-MM-YYYY)" 
            name={id} 
            id={id} 
            onFocus={handleFocus}
            className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-[1.7px] text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-600" 
            onChange={handleDate}
          />
      
      </Popover>
    </div>
  );
}
