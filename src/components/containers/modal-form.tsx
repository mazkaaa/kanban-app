"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Modal, Select, SelectMultiple } from "../reusables";
import { taskService } from "../services";
import type { ITaskRequest, TeamType } from "../types";

interface PROPS {
  isOpen: boolean;
  onClose: () => void;
}
export const ModalForm = ({ isOpen, onClose }: PROPS) => {
  const [payload, setPayload] = useState<ITaskRequest>({
    createdAt: "",
    description: "",
    name: "",
    status: "to do",
    team: [],
    updatedAt: "",
  });
  const [error, setError] = useState({
    name: false,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: taskService().createTask,
  });

  const handleSubmit = useCallback(async () => {
    if (!payload.name) {
      setError({
        ...error,
        name: true,
      });
    }
    if (payload.name) {
      setError({
        name: false,
      });
      mutation.mutateAsync(
        {
          createdAt: new Date().toISOString(),
          description: payload.description,
          name: payload.name,
          status: payload.status,
          team: payload.team,
          updatedAt: "",
        },
        {
          onError: (error) => {
            toast.error(error.message);
          },
          onSuccess: () => {
            toast.success("Task created successfully");
            onClose();
            queryClient.invalidateQueries({
              queryKey: ["tasks"],
            });
          },
        },
      );
    }
  }, [
    error,
    mutation,
    onClose,
    payload.description,
    payload.name,
    payload.status,
    payload.team,
    queryClient,
  ]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Task">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        <section className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Task name</label>
            <Input
              value={payload.name}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  name: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter task name..."
              isError={error.name}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Description</label>
            <Input
              value={payload.description}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  description: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter task description..."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Status</label>
            <Select
              onChange={(value) => {
                setPayload({
                  ...payload,
                  status: value as "to do" | "doing" | "done",
                });
              }}
              value={payload.status}
              placeholder="Select status"
              options={[
                { label: "To do", value: "to do" },
                { label: "Doing", value: "doing" },
                { label: "Done", value: "done" },
              ]}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Assigned to</label>
            <SelectMultiple
              onChange={(value) => {
                setPayload({
                  ...payload,
                  team: value as TeamType[],
                });
              }}
              value={payload.team}
              placeholder="Select team members"
              options={[
                { label: "Frontend", value: "frontend" },
                { label: "Backend", value: "backend" },
                { label: "Design", value: "design" },
              ]}
            />
          </div>
        </section>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating task..." : "Submit"}
        </Button>
      </form>
    </Modal>
  );
};
