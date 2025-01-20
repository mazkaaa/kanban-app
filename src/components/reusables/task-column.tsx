import Link from "next/link";
import { useMemo } from "react";
import type { ITaskResponse, StatusType } from "../types";
import { defineStatusColor } from "../utils";
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
      .map((task, index) => (
        <Link
          className="flex flex-col"
          key={index}
          href={`/dashboard/${task.id}`}
        >
          <TaskCard {...task} />
        </Link>
      ));
  }, [data, type]);

  const defineTitleColor = useMemo(() => {
    return defineStatusColor(type);
  }, [type]);

  return (
    <div
      className={
        "h-auto min-h-36 w-full space-y-3 rounded-lg border border-zinc-400 p-4 transition-all dark:border-zinc-600 " +
        className
      }
    >
      <h2 className={"text-base font-semibold uppercase " + defineTitleColor}>
        {type}
      </h2>
      <div className="border-b border-zinc-400 dark:border-zinc-600" />
      <div className="space-y-2">
        {/* Tasks will be displayed here */}
        {defineData}
      </div>
    </div>
  );
};
