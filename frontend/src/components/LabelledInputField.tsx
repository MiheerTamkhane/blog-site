import React from "react";

interface LabelledInputFieldTypes {
  type?: string;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const LabelledInputField = ({
  type,
  label,
  placeholder,
  onChange,
  required = false,
}: LabelledInputFieldTypes) => {
  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        id={label}
        placeholder={placeholder}
        name={label}
        onChange={onChange}
        type={type}
        required={required}
      />
    </div>
  );
};
