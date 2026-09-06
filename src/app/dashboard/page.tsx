import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Interactive prediction dashboard — pick a market, a horizon and a scenario, and ${SITE_NAME} returns the forecast, the decision ladder and the evidence behind it.`,
  alternates: {
    canonical: "/dashboard",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DashboardPage() {
  return <DashboardShell />;
}
