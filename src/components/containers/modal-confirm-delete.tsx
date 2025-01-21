"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { Button, Modal } from "../reusables";
import { taskService } from "../services";

interface PROPS {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string;
}
export const ModalConfirmDelete = ({ isOpen, onClose, selectedId }: PROPS) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutationDelete = useMutation({
    mutationFn: taskService().deleteTask,
  });
  const handleDelete = useCallback(() => {
    toast.promise(mutationDelete.mutateAsync(selectedId), {
      loading: "Deleting task...",
      success: () => {
        onClose();
        router.push("/dashboard");
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
        return "Task deleted successfully";
      },
      error: "An error occurred while deleting task",
    });
  }, [mutationDelete, onClose, queryClient, router, selectedId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task">
      <div className="space-y-4">
        <p>Are you sure you want to delete this task?</p>
        <div className="flex justify-end space-x-4">
          <Button
            className="w-full md:w-auto"
            onClick={onClose}
            type="button"
            variant="primary"
          >
            Cancel
          </Button>
          <Button
            className="w-full md:w-auto"
            onClick={handleDelete}
            type="button"
            variant="outline_danger"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
