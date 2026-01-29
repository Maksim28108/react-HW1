import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}: Props) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}
