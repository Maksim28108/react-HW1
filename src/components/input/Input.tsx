import { ChangeEvent } from "react";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputClass?: string;
  labelClass?: string;
};

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  inputClass,
  labelClass,
}: InputProps) {
  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClass}
      />
    </>
  );
}
