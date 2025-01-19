import React from "react";

interface PROPS extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
}
export const Button = (props: PROPS) => {
  const { variant = "primary" } = props;
  const color = {
    primary:
      "dark:bg-zinc-100 dark:hover:bg-zinc-300 bg-zinc-800 hover:bg-zinc-700",
    secondary: "bg-zinc-400",
    danger: "bg-red-600",
    success: "bg-green-600",
  };

  return (
    <button
      {...props}
      className={
        "flex w-full items-center justify-center rounded-lg px-4 py-2 text-center font-semibold text-background transition-all focus:outline-none " +
        color[variant] +
        " " +
        props.className
      }
    />
  );
};
