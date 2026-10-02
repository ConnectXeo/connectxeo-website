"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from "@/components/ui/table";
import { X, Check } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { getAllContacts } from "@/lib/db-pg";

export default function InboxPage() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllContacts().then(setContacts);
  }, []);

  const filtered = contacts.filter((c) => {
    if (filter === "new" && c.replied) return false;
    if (filter === "replied" && !c.replied) return false;
    if (query) {
      const q = query.toLowerCase();
      return c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q);
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">No contacts</h2>
        <p className="text-muted-foreground">No contacts match your criteria.</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Refresh</Button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Inbox</h1>
        <p className="text-muted-foreground">Manage incoming contacts</p>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search contacts..."
          onValueChange={setQuery}
          className="w-full"
        />
        <div className="flex gap-2 mt-2">
          <Button variant="outline" onClick={() => setFilter("all")} className="sm:flex-1">
            All ({contacts.length})
          </Button>
          <Button variant="outline" onClick={() => setFilter("new")} className="sm:flex-1">
            New ({contacts.filter(c => !c.replied).length})
          </Button>
          <Button variant="outline" onClick={() => setFilter("replied")} className="sm:flex-1">
            Replied ({contacts.filter(c => c.replied).length})
          </Button>
        </div>
      </div>

      <div>
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">No contacts</h2>
            <p className="text-muted-foreground">No contacts match your criteria.</p>
          </div>
        ) : (
          <Table>
            <TableHead>
              <tr>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </tr>
            </TableHead>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <X className="h-4 w-4" />
                      </span>
                      <span>{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.subject}</TableCell>
                  <TableCell>
                    <Badge variant={c.replied ? "default" : "destructive"} className="text-xs">
                      {c.replied ? "Replied" : "New"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => alert("Delete contact " + c.id)}
                      className="text-sm px-2 py-1"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}