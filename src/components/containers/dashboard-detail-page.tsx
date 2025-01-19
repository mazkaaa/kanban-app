"use client";

import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services";

export interface PROPS {
  id: string;
}
export const DashboardDetailPage = (props: PROPS) => {
  const { data: task } = useQuery({
    queryKey: ["task", props.id],
    queryFn: () => taskService().getTask(props.id),
  });

  return (
    <div className="space-y-4">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">{task?.name}</h1>
        <p className="text-sm text-zinc-400">{task?.description}</p>
      </section>
    </div>
  );
};
