"use client";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import type { ITaskResponse, StatusType } from "../types";
import { defineStatusColor } from "../utils";
import { TaskCard } from "./task-card";

interface PROPS {
  id: StatusType;
  className?: string;
  data: ITaskResponse[];
}

export const TaskColumn = ({ id, className, data }: PROPS) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const defineData = useMemo(() => {
    if (data.filter((item) => item.status === id).length === 0) {
      return <div className="text-sm text-zinc-400">No task available</div>;
    }
    return data
      .filter((item) => {
        return item.status === id;
      })
      .map((task, index) => (
        <TaskCard href={"/dashboard/" + task.id} key={index} {...task} />
      ));
  }, [data, id]);

  const defineTitleColor = useMemo(() => {
    return defineStatusColor(id);
  }, [id]);

  return (
    <div
      ref={setNodeRef}
      className={
        "h-auto min-h-36 w-full space-y-3 rounded-lg border border-zinc-400 p-4 transition-all dark:border-zinc-600 " +
        className
      }
    >
      <h2 className={"text-base font-semibold uppercase " + defineTitleColor}>
        {id}
      </h2>
      <div className="border-b border-zinc-400 dark:border-zinc-600" />
      <div className="space-y-2">{defineData}</div>
    </div>
  );
};
