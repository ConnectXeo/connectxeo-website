import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — ConnectXeo",
  description:
    "ConnectXeo is a Pakistan-based AI and automation company founded in 2025 by Sami Ullah — on a mission to make AI accessible to every business.",
};

export default function AboutPage() {
  return <AboutClient />;
}
