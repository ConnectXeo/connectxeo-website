import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — ConnectXeo",
  description:
    "Six integrated practices — AI/ML solutions, custom model training, agentic systems, voice agents, automation, web engineering, and cloud infrastructure.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
