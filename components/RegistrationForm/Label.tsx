// components/Label.tsx
import { ReactNode } from 'react';

interface LabelProps {
  readonly htmlFor: string;
  readonly children: ReactNode;
}

export default function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="block mb-2 font-semibold text-gray-700 md:text-m text-sm">
      {children}
    </label>
  );
}
