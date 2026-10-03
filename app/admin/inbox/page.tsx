import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAllContacts } from "@/lib/db-pg";

export const metadata: Metadata = {
  title: "Inbox — ConnectXeo Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const contacts = await getAllContacts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Inbox</h1>
        <p className="text-muted-foreground">Manage incoming contacts</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Total contacts: {contacts.length}
        </p>
      </div>

      <div>
        {contacts.length === 0 ? (
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">No contacts</h2>
            <p className="text-muted-foreground">No contacts found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.id} className="p-4 border rounded-md bg-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{c.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      From: {c.name} ({c.email})
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className={c.replied ? "text-green-600" : "text-red-600"}>
                      {c.replied ? "Replied" : "New"}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground truncate">
                  {c.message.substring(0, 100)}{c.message.length > 100 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}