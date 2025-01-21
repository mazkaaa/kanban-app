"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, TaskColumn } from "../reusables";
import { taskService } from "../services";
import { ModalForm } from "./modal-form";

export const DashboardPage = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService().getTasks(),
  });

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authData");
    router.push("/");
    toast.success("Successfully logged out");
  }, [router])

  useEffect(() => {
    if (!localStorage.getItem("authData")) {
      toast.error("You need to login to access this page");
      router.push("/");
    }
  }, [router]);

  return (
    <main className="space-y-6">
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create task
      </Button>
      <section className="grid grid-cols-4 gap-4">
        <TaskColumn data={tasks || []} className="col-span-2" type="to do" />
        <TaskColumn data={tasks || []} className="col-span-2" type="doing" />
        <TaskColumn data={tasks || []} className="col-span-full" type="done" />
      </section>
      <ModalForm
        type="add"
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <Button
        onClick={handleLogout}
        variant='outline_danger'
      >
        Logout
      </Button>
    </main>
  );
};
