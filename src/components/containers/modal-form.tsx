"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Modal, Select, SelectMultiple } from "../reusables";
import { taskService } from "../services";
import type { ITaskRequest, ITaskResponse, TeamType } from "../types";

interface PROPS {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "edit";
  selectedData?: ITaskResponse;
}
export const ModalForm = ({ isOpen, onClose, type, selectedData }: PROPS) => {
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
  const mutationCreate = useMutation({
    mutationFn: taskService().createTask,
  });
  const mutationEdit = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ITaskRequest }) =>
      taskService().updateTask(id, {
        createdAt: data.createdAt,
        description: data.description,
        name: data.name,
        status: data.status,
        team: data.team,
        updatedAt: data.updatedAt,
      }),
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
      if (type === "add") {
        mutationCreate.mutateAsync(
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
      } else {
        mutationEdit.mutateAsync(
          {
            id: selectedData?.id || "",
            data: {
              createdAt: payload.createdAt,
              description: payload.description,
              name: payload.name,
              status: payload.status,
              team: payload.team,
              updatedAt: new Date().toISOString(),
            },
          },
          {
            onError: (error) => {
              toast.error(error.message);
            },
            onSuccess: () => {
              toast.success("Task updated successfully");
              onClose();
              Promise.all([
                queryClient.invalidateQueries({
                  queryKey: ["tasks"],
                }),
                queryClient.invalidateQueries({
                  queryKey: ["task"],
                }),
              ]);
            },
          },
        );
      }
    }
  }, [
    error,
    mutationCreate,
    mutationEdit,
    onClose,
    payload.createdAt,
    payload.description,
    payload.name,
    payload.status,
    payload.team,
    queryClient,
    selectedData?.id,
    type,
  ]);

  useEffect(() => {
    if (isOpen) {
      if (type === "edit" && selectedData) {
        setPayload({
          createdAt: selectedData.createdAt,
          description: selectedData.description,
          name: selectedData.name,
          status: selectedData.status,
          team: selectedData.team,
          updatedAt: selectedData.updatedAt,
        });
      } else {
        setPayload({
          createdAt: "",
          description: "",
          name: "",
          status: "to do",
          team: [],
          updatedAt: "",
        });
      }
    }
  }, [isOpen, selectedData, type]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={
      type === "add" ? "Add new task" : "Edit task"
    }>
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
        {type === "add" ? (
          <Button type="submit" disabled={mutationCreate.isPending}>
            {mutationCreate.isPending ? "Creating task..." : "Submit"}
          </Button>
        ) : (
          <Button type="submit" disabled={mutationCreate.isPending}>
            {mutationEdit.isPending ? "Updating task..." : "Save changes"}
          </Button>
        )}
      </form>
    </Modal>
  );
};
