import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  inputClass?: string;
  labelClass?: string;
};

export default function Input({
  label,
  inputClass,
  labelClass,
  id,
  ...props
}: InputProps) {
  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      <input
        id={id}
        className={inputClass}
        {...props}
      />
    </>
  );
}
