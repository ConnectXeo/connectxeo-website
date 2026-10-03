import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAllContacts } from "@/lib/db-pg";
import AdminLayout from "../layout";
import InboxClient from "./InboxClient";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const contacts = await getAllContacts();

  return (
    <AdminLayout>
      <InboxClient contacts={contacts} />
    </AdminLayout>
  );
}