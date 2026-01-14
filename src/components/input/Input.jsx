export default function Input({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    inputClass,
    labelClass,
}) {
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
