"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button, TaskColumn } from "../reusables";
import { ITaskResponse } from "../types";

interface PROPS {
  tasks: ITaskResponse[];
}
export const DashboardPage = ({ tasks }: PROPS) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("authData")) {
      toast.error("You need to login to access this page");
      router.push("/");
    }
  }, [router]);

  return (
    <main className="space-y-6">
      <Button>Create task</Button>
      <section className="grid grid-cols-4 gap-4">
        <TaskColumn data={tasks} className="col-span-2" type="to do" />
        <TaskColumn data={tasks} className="col-span-2" type="doing" />
        <TaskColumn data={tasks} className="col-span-full" type="done" />
      </section>
    </main>
  );
};
