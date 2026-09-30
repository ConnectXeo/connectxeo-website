import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — ConnectXeo",
  description:
    "Tell ConnectXeo about your AI, automation, or web project — we reply within one business day. Based in Pakistan, serving clients globally.",
};

export default function ContactPage() {
  return <ContactClient />;
}
