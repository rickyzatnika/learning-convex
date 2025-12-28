"use client";

import { useMemo, useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Send, MessageSquare, FilterX, Inbox, Search, Paperclip, Smile } from "lucide-react";
import { EmojiCDNPicker } from "@/components/web/EmojiCDNPicker";

export default function InboxPage() {
  const [statusFilter, setStatusFilter] = useState<"open" | "pending" | "closed" | undefined>("open");
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiButtonRef = (null as any) as React.RefObject<HTMLButtonElement>;

  // Queries
  const threads = useQuery(api.livechat.listThreads, {
    status: statusFilter,
    limit: 100,
  });

  const messages = useQuery(
    api.livechat.listMessages,
    selectedThreadId ? { threadId: selectedThreadId as any } : "skip"
  );

  // Mutations
  const sendMessage = useMutation(api.livechat.sendMessage);
  const markRead = useMutation(api.livechat.markRead);
  const markMessagesRead = useMutation(api.livechat.markMessagesRead);
  const updateStatus = useMutation(api.livechat.updateThreadStatus);

  // Mark as read for agent when selecting a thread
  useEffect(() => {
    if (!selectedThreadId) return;
    Promise.all([
      markRead({ threadId: selectedThreadId as any, reader: "agent" }),
      markMessagesRead({ threadId: selectedThreadId as any, reader: "agent" }),
    ]).catch(() => {});
  }, [selectedThreadId, markRead, markMessagesRead]);

  const filteredThreads = useMemo(() => {
    if (!threads) return [];
    const q = search.toLowerCase().trim();
    return threads.filter((t) => {
      if (!q) return true;
      const fields = [
        t.contactName || "",
        t.contactEmail || "",
        t.lastMessagePreview || "",
        t.tags?.join(" ") || "",
      ].join(" ").toLowerCase();
      return fields.includes(q);
    });
  }, [threads, search]);

  const [uploading, setUploading] = useState(false);

  const onSend = async () => {
    if (!selectedThreadId || !draft.trim()) return;
    await sendMessage({
      threadId: selectedThreadId as any,
      text: draft.trim(),
      senderType: "agent",
    });
    setDraft("");
  };

  const selectedThread = useMemo(() => {
    if (!selectedThreadId || !threads) return null;
    return threads.find((t) => (t._id as any) === selectedThreadId) || null;
  }, [selectedThreadId, threads]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Left: Threads list */}
      <div className="md:col-span-1">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Inbox className="h-4 w-4" />
            <div className="font-semibold">Inbox</div>
          </div>

          <div className="mt-3 flex gap-1 flex-wrap">
            <Button
              variant={statusFilter === "open" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("open")}
            >
              Open
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "closed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("closed")}
            >
              Closed
            </Button>
            <Button aria-label="Reset filter" title="Reset filter" variant="ghost" size="sm" onClick={() => setStatusFilter(undefined)}>
              <FilterX className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-3 relative">
            <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, atau pesan..."
              className="pl-8"
            />
          </div>

          <Separator className="my-3" />

          <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
            {!threads && (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <Spinner className="mr-2" /> Memuat...
              </div>
            )}

            {threads && filteredThreads.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">Tidak ada percakapan.</div>
            )}

            {filteredThreads.map((t) => (
              <button
                key={(t._id as any) as string}
                className={cn(
                  "w-full text-left rounded-md border p-3 hover:bg-accent/50",
                  selectedThreadId === (t._id as any) && "bg-accent"
                )}
                onClick={() => setSelectedThreadId((t._id as any) as string)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium line-clamp-1">
                    {t.contactName || t.contactEmail || t.visitorId || "Pengunjung"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.status}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {t.lastMessagePreview || "(tidak ada preview)"}
                </div>
                {(t.unreadCountAgent || 0) > 0 && (
                  <div className="mt-1 text-xs inline-flex items-center gap-1 text-primary">
                    <MessageSquare className="h-3 w-3" /> {(t.unreadCountAgent || 0)} baru
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Right: Messages */}
      <div className="md:col-span-2">
        <Card className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div>
              <div className="font-semibold">
                {selectedThread ? (selectedThread.contactName || selectedThread.contactEmail || selectedThread.visitorId || "Pengunjung") : "Pilih percakapan"}
              </div>
              {selectedThread && (
                <div className="text-xs text-muted-foreground">
                  Status: {selectedThread.status}
                </div>
              )}
            </div>
            {selectedThread && selectedThread.status !== "closed" && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus({ threadId: selectedThread._id as any, status: "pending" })}
                >
                  Tandai Pending
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => updateStatus({ threadId: selectedThread._id as any, status: "closed" })}
                >
                  Tutup
                </Button>
              </div>
            )}
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {!selectedThread && (
              <div className="h-full grid place-items-center text-muted-foreground">
                Pilih percakapan di sebelah kiri untuk melihat pesan.
              </div>
            )}
            {selectedThread && !messages && (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <Spinner className="mr-2" /> Memuat pesan...
              </div>
            )}
            {selectedThread && messages && messages.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">Belum ada pesan.</div>
            )}
            {selectedThread && messages && messages.map((m, idx) => {
              const isAgent = m.senderType === "agent";
              // Show read receipt for the last agent message if user has read it
              const lastAgentIdx = (() => {
                if (!messages || messages.length === 0) return -1;
                for (let i = messages.length - 1; i >= 0; i--) {
                  if ((messages as any)[i]?.senderType === "agent") return i;
                }
                return -1;
              })();
              const isLastAgentMsg = isAgent && lastAgentIdx === idx;
              const readTime = isLastAgentMsg ? (m.readAtUser as number | undefined) : undefined;
              const showRead = !!readTime;
              const fmtTime = (ts?: number) => {
                if (!ts) return null;
                const d = new Date(ts);
                const hh = String(d.getHours()).padStart(2, "0");
                const mm = String(d.getMinutes()).padStart(2, "0");
                return `${hh}:${mm}`;
              };
              return (
                <div key={(m._id as any) as string} className={cn("flex", isAgent ? "justify-end" : "justify-start")}> 
                  <div className={cn("rounded-2xl px-3 py-2 text-sm max-w-[80%]", isAgent ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm")}> 
                    <div className="text-[11px] opacity-70 mb-0.5">
                      {m.senderName || m.senderType}
                    </div>
                    {/* Text */}
                    {m.text && <div className="whitespace-pre-wrap break-words">{m.text}</div>}
                    {/* Attachments preview */}
                    {Array.isArray((m as any).attachments) && (m as any).attachments.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {(m as any).attachments.map((att: any, i: number) => {
                          const isImage = typeof att?.type === "string" && att.type.startsWith("image/");
                          const href = att?.url || (att?.storageId ? `/api/convex/file-url?storageId=${encodeURIComponent(att.storageId)}&redirect=1` : undefined);
                          const name = att?.name || "file";
                          return (
                            <div key={i}>
                              {isImage && href ? (
                                <a href={href} target="_blank" rel="noreferrer" className="block">
                                  <img src={href} alt={name} className="rounded-md max-h-56 object-cover" />
                                </a>
                              ) : (
                                <a href={href} target="_blank" rel="noreferrer" className="text-xs underline break-all">
                                  {name}
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {showRead && (
                      <div className="text-[10px] opacity-70 mt-1 text-right">Dibaca {fmtTime(readTime)}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <div className="border-t p-3 flex items-end gap-2">
            <div className="relative">
              <Button ref={emojiButtonRef as any} type="button" variant="outline" size="icon-sm" aria-label="Tambah emoji" title="Emoji" className="shrink-0" onClick={() => setShowEmoji((v) => !v)}>
                <Smile className="h-4 w-4" />
              </Button>
              {showEmoji && (
                <div className="absolute bottom-10 left-0 z-10" onBlur={() => setShowEmoji(false)}>
                  <EmojiCDNPicker onPick={(e) => { setDraft((d) => d + e); setShowEmoji(false); }} />
                </div>
              )}
            </div>
            <label className="inline-flex">
              <input type="file" className="hidden" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  if (!selectedThreadId) return;
                  if (file.size > 5 * 1024 * 1024) {
                    alert("Ukuran file maksimal 5MB");
                    return;
                  }
                  setUploading(true);
                  // get upload url
                  const res = await fetch("/api/convex/upload-url");
                  const { uploadUrl } = await res.json();
                  const form = new FormData();
                  form.append("file", file);
                  const uploadResp = await fetch(uploadUrl, { method: "POST", body: form });
                  const { storageId } = await uploadResp.json();
                  const urlRes = await fetch(`/api/convex/file-url?storageId=${encodeURIComponent(storageId)}`);
                  const { url } = await urlRes.json().catch(() => ({ url: undefined }));
                  await sendMessage({
                    threadId: selectedThreadId as any,
                    text: draft.trim() || file.name,
                    senderType: "agent",
                    attachments: [
                      { storageId, url, name: file.name, type: file.type, size: file.size },
                    ],
                  });
                  setDraft("");
                } catch (err) {
                  console.error(err);
                  alert("Gagal mengunggah file");
                } finally {
                  setUploading(false);
                  e.currentTarget.value = "";
                }
              }} />
              <Button type="button" variant="outline" size="icon-sm" aria-label="Unggah file" title="Lampirkan file" className="shrink-0" disabled={uploading}>
                {uploading ? <Spinner className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}
              </Button>
            </label>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={selectedThread ? "Tulis balasan..." : "Pilih percakapan terlebih dahulu"}
              className="min-h-9 max-h-28 resize-y"
              rows={2}
              disabled={!selectedThread}
            />
            <Button onClick={onSend} disabled={!selectedThread || !draft.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
