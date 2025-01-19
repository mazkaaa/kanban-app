import { DashboardPage } from "@/components/containers";
import { taskService } from "@/components/services";
import { QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService().getTasks(),
  });
  return <DashboardPage />;
}
