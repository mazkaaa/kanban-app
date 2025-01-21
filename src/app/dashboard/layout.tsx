import { Header } from "@/components/reusables";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6 px-4 py-4 md:px-16 md:py-16">
      <Header />
      {children}
    </div>
  );
}
