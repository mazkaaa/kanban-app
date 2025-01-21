"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, TaskColumn } from "../reusables";
import { taskService } from "../services";
import type { ITaskRequest, ITaskResponse, StatusType } from "../types";
import { ModalForm } from "./modal-form";

export const DashboardPage = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<ITaskResponse[]>([]);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService().getTasks(),
  });

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ITaskRequest }) =>
      taskService().updateTask(id, payload),
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authData");
    router.push("/");
    toast.success("Successfully logged out");
  }, [router]);

  useEffect(() => {
    if (!localStorage.getItem("authData")) {
      toast.error("You need to login to access this page");
      router.push("/");
    }
  }, [router]);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const updatedTasks = tasks.map((task) => {
          if (task.id === active.id) {
            return {
              ...task,
              status: over.id as StatusType,
            };
          }
          return task;
        });
        setTasks(updatedTasks);
        try {
          const taskToUpdate = updatedTasks.find(
            (task) => task.id === active.id,
          );
          if (taskToUpdate && taskToUpdate.name) {
            toast.promise(
              mutation.mutateAsync({
                id: active.id.toString(),
                payload: {
                  name: taskToUpdate.name,
                  description: taskToUpdate.description || "",
                  team: taskToUpdate.team || [],
                  status: taskToUpdate.status,
                  createdAt: taskToUpdate.createdAt || "",
                  updatedAt: new Date().toISOString(),
                },
              }),
              {
                loading: "Updating task...",
                success: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["tasks"],
                  });
                  return "Task updated successfully";
                },
                error: () => {
                  setTasks(tasks);
                  return "Failed to update task";
                },
              },
            );
          }
          toast.success("Task updated successfully");
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unknown error occurred");
          }
        }
      }
    },
    [mutation, queryClient, tasks],
  );

  return (
    <main className="space-y-6">
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create task
      </Button>
      <DndContext onDragEnd={handleDragEnd}>
        <section className="grid grid-cols-4 gap-4">
          <TaskColumn id="to do" data={tasks} className="col-span-2" />
          <TaskColumn id="doing" data={tasks} className="col-span-2" />
          <TaskColumn id="done" data={tasks} className="col-span-full" />
        </section>
      </DndContext>
      <ModalForm
        type="add"
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <Button onClick={handleLogout} variant="outline_danger">
        Logout
      </Button>
    </main>
  );
};
