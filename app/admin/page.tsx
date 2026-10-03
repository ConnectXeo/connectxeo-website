import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAllPosts } from "@/lib/db-pg";
import AdminLayout from "./layout";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin — ConnectXeo",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const posts = await getAllPosts();
  return (
    <AdminLayout>
      <AdminClient posts={posts} />
    </AdminLayout>
  );
}