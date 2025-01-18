import { DashboardPage } from "@/components/containers";
import { taskService } from "@/components/services";

export default async function Page() {
  const data = await taskService().getTasks();
  return <DashboardPage tasks={data || []} />;
}
