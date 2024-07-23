import { ChangeEvent } from 'react';
import Label from './Label';

interface FileUploaderProps {
  id: string;
  label: string;
  type:string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploader({ id, label, type,onChange }: FileUploaderProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={id}
        type={type}
        accept=".jpg,.jpeg,.png,.pdf" // Modify this to the file types you want to accept
        onChange={onChange}
        className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-sm "
      />
    </div>
  );
}
