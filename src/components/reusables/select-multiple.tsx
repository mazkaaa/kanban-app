import type { IInputBasic } from "../types";

interface PROPS extends IInputBasic {
  options?: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string[]) => void;
  value?: string[];
}
export const SelectMultiple = ({
  className,
  isError,
  onChange,
  options,
  value,
  variant = "md",
}: PROPS) => {
  const inputSize = {
    sm: "px-0 py-1 text-sm",
    md: "px-2 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };
  return (
    <div
      className={
        "flex items-center space-x-2 rounded-lg border bg-transparent outline-none focus-within:border-foreground " +
        className +
        " " +
        inputSize[variant] +
        (isError ? " border-red-600" : " border-zinc-400")
      }
    >
      {options?.map((item, index) => (
        <button
          type="button"
          key={index}
          onClick={() => {
            if (onChange) {
              if (value?.includes(item.value)) {
                onChange(value.filter((i) => i !== item.value));
              } else {
                onChange([...(value || []), item.value]);
              }
            }
          }}
          className={
            "rounded-lg px-2 py-1 text-sm focus:outline-none " +
            (value?.includes(item.value)
              ? "border bg-zinc-400 text-background"
              : "border bg-transparent text-foreground")
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
