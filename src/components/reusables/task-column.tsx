import { useMemo } from "react";
import type { ITaskResponse, StatusType } from "../types";
import { TaskCard } from "./task-card";

interface PROPS {
  type: StatusType;
  className?: string;
  data: ITaskResponse[];
}
export const TaskColumn = ({ type, className, data }: PROPS) => {
  const defineData = useMemo(() => {
    if (data.filter((item) => item.status === type).length === 0) {
      return <div className="text-sm text-zinc-400">No task available</div>;
    }
    return data
      .filter((item) => {
        return item.status === type;
      })
      .map((task, index) => <TaskCard {...task} key={index} />);
  }, [data, type]);

  const defineTitleColor = useMemo(() => {
    if (type === "to do") {
      return "text-zinc-400";
    } else if (type === "doing") {
      return "text-yellow-600";
    } else {
      return "text-teal-600";
    }
  }, [type]);

  return (
    <div
      className={
        "h-auto min-h-32 w-full space-y-3 divide-zinc-600 rounded-lg border border-zinc-600 p-4 " +
        className
      }
    >
      <h2 className={"text-base font-semibold uppercase " + defineTitleColor}>
        {type}
      </h2>
      <div className="border-b border-zinc-600" />
      <div className="space-y-3">
        {/* Tasks will be displayed here */}
        {defineData}
      </div>
    </div>
  );
};
