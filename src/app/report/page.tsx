import type { Metadata } from "next";
import OpportunityReportApp from "@/components/report/OpportunityReportApp";
import { REPORT_META } from "@/lib/opportunityReport/data";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `${REPORT_META.title} — Opportunity Report`,
  description:
    "The full NVILE opportunity report: verdict, current state, evidence trail, forecast, competitive intensity, timing window, invalidation risks and recommendation, every figure labelled by evidence tier.",
  alternates: {
    canonical: "/report",
  },
  openGraph: {
    type: "article",
    title: `${REPORT_META.title} — Opportunity Report — ${SITE_NAME}`,
    description: "Verdict, evidence, forecast, competitive intensity, timing and recommendation in one document.",
  },
};

export default function ReportPage() {
  return <OpportunityReportApp />;
}
