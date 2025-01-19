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
    // <div className="relative">
    //   <button
    //     onBlur={() => setIsOpen(false)}
    //     onClick={() => setIsOpen(!isOpen)}
    //     type="button"
    //     className={
    //       "inline-flex w-full rounded-lg border bg-transparent outline-none focus-within:border-foreground " +
    //       className +
    //       " " +
    //       inputSize[variant] +
    //       (isError ? " border-red-600" : " border-zinc-400") +
    //       " cursor-pointer" +
    //       " " +
    //       (value ? "text-foreground" : "text-gray-400")
    //     }
    //   >
    //     {options?.find((item) => item.value === value)?.label || placeholder}
    //   </button>
    //   {isOpen && (
    //     <div className="fixed z-50 mt-2 h-full w-full rounded-lg bg-foreground text-background shadow-md">
    //       {options?.map((item, index) => (
    //         <button
    //           key={index}
    //           onClick={() => {
    //             if (onChange) onChange(item.value);
    //             setIsOpen(false);
    //           }}
    //           className={
    //             "w-full px-4 py-2 text-left hover:bg-zinc-400 hover:text-background " +
    //             (value === item.value ? "bg-zinc-400 text-background" : "")
    //           }
    //         >
    //           {item.label}
    //         </button>
    //       ))}
    //     </div>
    //   )}
    // </div>
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
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
