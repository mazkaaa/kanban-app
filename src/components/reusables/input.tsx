import React from "react";
import type { IInputBasic } from "../types";

interface PROPS
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IInputBasic {}
export const Input = ({ variant = "md", isError = false, ...props }: PROPS) => {
  const inputSize = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <input
      {...props}
      className={
        "rounded-lg border bg-transparent outline-none focus-within:border-foreground " +
        props.className +
        " " +
        inputSize[variant] +
        (isError ? " border-red-600" : " border-zinc-400")
      }
    />
  );
};
