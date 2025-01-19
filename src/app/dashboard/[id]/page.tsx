import { DashboardDetailPage } from "@/components/containers";
import { taskService } from "@/components/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["task", id],
    queryFn: () => taskService().getTask(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardDetailPage id={id} />
    </HydrationBoundary>
  );
}
