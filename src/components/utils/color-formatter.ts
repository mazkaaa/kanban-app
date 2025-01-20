import type { StatusType } from "../types";

export const defineStatusColor = (status: StatusType) => {
  if (status === "to do") {
    return "dark:text-zinc-400 text-zinc-600";
  } else if (status === "doing") {
    return "text-yellow-600";
  } else {
    return "text-teal-600";
  }
};
