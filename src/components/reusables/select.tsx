"use client";

import type { IInputBasic } from "../types";

interface PROPS extends IInputBasic {
  options?: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string) => void;
  value?: string;
}
export const Select = ({
  isError,
  onChange,
  options,
  value,
  className,
  variant = "md",
}: PROPS) => {
  const inputSize = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <select
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
      className={
        "rounded-lg border bg-transparent outline-none focus-within:border-foreground " +
        className +
        " " +
        inputSize[variant] +
        (isError ? " border-red-600" : " border-zinc-400")
      }
    >
      {options?.map((item, index) => (
        <option
          className="bg-foreground text-background"
          key={index}
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>
  );
};
