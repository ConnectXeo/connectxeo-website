import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Solutions — ConnectXeo",
  description:
    "AI and automation solutions for startups, SMEs, enterprises, and agencies — shaped around your specific challenges.",
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
