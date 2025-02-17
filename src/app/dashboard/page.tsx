import { DashboardPage } from "@/components/containers";
import { taskService } from "@/components/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService().getTasks(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage />
    </HydrationBoundary>
  );
}
