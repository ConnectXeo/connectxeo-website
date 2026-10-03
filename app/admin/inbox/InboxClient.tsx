"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Trash2,
  Reply,
  Mail,
  MailOpen,
  Building2,
  Clock,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
import { toast } from "@/hooks/use-toast";
import type { ContactRow } from "@/lib/db-pg";

type Filter = "all" | "new" | "replied";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function InboxClient({ contacts }: { contacts: ContactRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ContactRow | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      if (filter === "new" && c.replied) return false;
      if (filter === "replied" && !c.replied) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.message.toLowerCase().includes(q) ||
          (c.company && c.company.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [contacts, filter, query]);

  const counts = useMemo(
    () => ({
      all: contacts.length,
      new: contacts.filter((c) => !c.replied).length,
      replied: contacts.filter((c) => c.replied).length,
    }),
    [contacts]
  );

  const handleReply = async () => {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/admin/contacts/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replied: true,
          reply_text: replyText.trim(),
          status: "replied",
        }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Reply sent", description: `Response sent to ${selected.email}` });
      setSelected(null);
      setReplyText("");
      router.refresh();
    } catch {
      toast({
        title: "Failed to send reply",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast({ title: "Contact deleted" });
      if (selected?.id === id) setSelected(null);
      router.refresh();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setDeleting(null);
    }
  };

  const handleMarkNew = async (contact: ContactRow) => {
    try {
      const res = await fetch(`/api/admin/contacts/${contact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replied: false, status: "new" }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Marked as new" });
      router.refresh();
    } catch {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Email Leads
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Contact form submissions from your website
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 rounded-full border border-border p-1">
          {(["all", "new", "replied"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                filter === f
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-16 text-center">
          <Mail className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {query
              ? "No leads match your search."
              : filter === "new"
                ? "No new leads — all caught up."
                : filter === "replied"
                  ? "No replied leads yet."
                  : "No leads yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(c)}
                >
                  <TableCell>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.email}</div>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <span className="block truncate text-sm">{c.subject}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      <span className="truncate">{c.company || "—"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(c.created_at)}
                      <span className="text-xs text-muted-foreground/60">
                        {formatTime(c.created_at)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {c.replied ? (
                      <Badge variant="success">
                        <MailOpen className="mr-1 h-3 w-3" />
                        Replied
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <Mail className="mr-1 h-3 w-3" />
                        New
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelected(c)}
                        title="View & Reply"
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleDelete(c.id)}
                          >
                            Delete lead
                          </DropdownMenuItem>
                          {c.replied && (
                            <DropdownMenuItem onClick={() => handleMarkNew(c)}>
                              Mark as new
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selected.subject}</DialogTitle>
                    <DialogDescription className="mt-2 flex flex-col gap-1">
                      <span className="font-medium text-foreground">
                        {selected.name}
                      </span>
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-primary hover:underline"
                      >
                        {selected.email}
                      </a>
                      {selected.company && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          {selected.company}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(selected.created_at)} at{" "}
                        {formatTime(selected.created_at)}
                      </span>
                    </DialogDescription>
                  </div>
                  <Badge variant={selected.replied ? "success" : "destructive"}>
                    {selected.replied ? "Replied" : "New"}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="rounded-xl border border-border bg-card p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {selected.message}
                </p>
              </div>

              {selected.replied && selected.reply_text && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-green-600">
                    <Send className="h-3 w-3" />
                    Your reply
                  </p>
                  <p className="whitespace-pre-wrap text-sm text-foreground">
                    {selected.reply_text}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  {selected.replied ? "Send another reply" : "Reply to this lead"}
                </label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response..."
                  rows={4}
                />
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelected(null);
                    setReplyText("");
                  }}
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>
                <Button
                  onClick={handleReply}
                  disabled={!replyText.trim() || sending}
                >
                  <Send className="h-4 w-4" />
                  {sending ? "Sending..." : "Send Reply"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}