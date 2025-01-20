"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Button } from "../reusables";
import { taskService } from "../services";
import { defineStatusColor, formatDateToFulldate } from "../utils";
import { ModalConfirmDelete } from "./modal-confirm-delete";
import { ModalForm } from "./modal-form";

export interface PROPS {
  id: string;
}
export const DashboardDetailPage = (props: PROPS) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const { data: task, isPending } = useQuery({
    queryKey: ["task", props.id],
    queryFn: () => taskService().getTask(props.id),
  });

  const defineColor = useMemo(() => {
    if (task) {
      return defineStatusColor(task.status);
    }
    return "";
  }, [task]);

  const defineContent = useMemo(() => {
    if (isPending) {
      return <div>Loading...</div>;
    }
    if (!task) {
      return <div>Task not found</div>;
    }
    return (
      <>
        <section className="space-y-2">
          <div className="flex items-end space-x-2">
            <h1 className="text-2xl font-bold">{task.name}</h1>
            <span className={defineColor + " text-sm uppercase"}>
              ({task.status})
            </span>
          </div>
          <p className="text-sm text-zinc-400">{task?.description}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-medium">Assigned to:</h2>
          <ul className="text-zinc-300">
            {task.team.map((member, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="border-b border-dashed">{member}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-medium text-zinc-300">Created at:</h2>
            <p className="text-sm text-zinc-400">
              {formatDateToFulldate(task.createdAt)}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-zinc-300">Updated at:</h2>
            <p className="text-sm text-zinc-400">
              {task.updatedAt ? formatDateToFulldate(task.updatedAt) : "-"}
            </p>
          </div>
        </section>
        <section className="flex space-x-4">
          <Button
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setIsConfirmDeleteOpen(true);
            }}
            variant="outline_danger"
          >
            Delete
          </Button>
        </section>
      </>
    );
  }, [defineColor, isPending, task]);

  return (
    <div className="space-y-4">
      {defineContent}
      <ModalForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
        }}
        type="edit"
        selectedData={task}
      />
      <ModalConfirmDelete
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
        }}
        selectedId={props.id}
      />
    </div>
  );
};
