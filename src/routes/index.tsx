import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

const title = "Chirayu Sharma — Data Analyst & Power BI Developer";
const description = "Portfolio of Chirayu Sharma, a Data Analyst and Power BI Developer in Ahmedabad turning raw operational data into clear dashboards and business insights.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
