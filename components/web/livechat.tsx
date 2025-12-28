"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X, MessageCircle, Send, Paperclip, Smile } from "lucide-react";
import { EmojiCDNPicker } from "@/components/web/EmojiCDNPicker";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Using liveMessages from Convex for rendering; no local store needed for history
  const [threadId, setThreadId] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load/generate visitor id
  useEffect(() => {
    try {
      const key = "livechat_visitor_id";
      let id = localStorage.getItem(key);
      if (!id) {
        id = Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem(key, id);
      }
      setVisitorId(id);
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  // Subscribe to messages when we have a threadId
  const liveMessages = useQuery(
    api.livechat.listMessages,
    threadId ? { threadId: threadId as any } : "skip"
  );
  // Subscribe to thread to detect admin read/unread state
  const liveThread = useQuery(
    api.livechat.getThread,
    threadId ? { threadId: threadId as any } : "skip"
  );

  // Mutations
  const getOrCreateThread = useMutation(api.livechat.getOrCreateThread);
  const sendConvexMessage = useMutation(api.livechat.sendMessage);
  const markRead = useMutation(api.livechat.markRead);
  const markMessagesRead = useMutation(api.livechat.markMessagesRead);

  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // When panel opens and we already have a thread, mark as read for user and set per-message receipts
    if (open && threadId) {
      Promise.all([
        markRead({ threadId: threadId as any, reader: "user" }),
        markMessagesRead({ threadId: threadId as any, reader: "user" }),
      ]).catch(() => {});
    }
  }, [open, threadId, markRead, markMessagesRead]);

  useEffect(() => {
    // autoscroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [liveMessages, open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);

    try {
      const isClosed = !!(
        liveThread && (liveThread as any).status === "closed"
      );
      let tId = isClosed ? null : threadId;
      if (!tId) {
        // Ensure thread exists (if thread closed, create a new one)
        tId = await getOrCreateThread({
          contactName: name || undefined,
          contactEmail: email || undefined,
          visitorId: visitorId || undefined,
        });
        setThreadId(tId as any as string);
      }

      await sendConvexMessage({
        threadId: tId as any,
        text: message.trim(),
        senderType: "user",
        senderId: visitorId || undefined,
        senderName: name || undefined,
      });
      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pointer-events-none">
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <Button
          aria-label={open ? "Tutup Live Chat" : "Buka Live Chat"}
          className={cn(
            "rounded-full shadow-lg h-12 w-12 p-0 flex items-center justify-center",
            open ? "bg-primary/90" : "bg-primary"
          )}
          onClick={() => setOpen((v) => !v)}
          title="LiveChat"
        >
          {open ? (
            <X className="h-5 w-5 text-primary-foreground" />
          ) : (
            <MessageCircle className="h-5 w-5 text-primary-foreground" />
          )}
        </Button>
      </div>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed z-50 right-6 bottom-24 w-[92vw]  max-w-sm sm:max-w-md pointer-events-auto",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none",
          "transition-all duration-200"
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="rounded-xl border bg-background shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex-1">
              <div className="text-sm font-semibold">Live Chat</div>
              <div className="text-xs opacity-90">
                Biasanya membalas dalam beberapa menit
              </div>
            </div>
            <Button
              size="icon-sm"
              variant="ghost"
              className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary/20"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Pre-chat form (name/email) similar to LiveChat style */}
          <div className="px-4 py-3 space-y-2">
            <div className="text-sm font-medium">Perkenalkan diri Anda</div>
            <div className="grid grid-cols-1 gap-2">
              <Input
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email (opsional)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Status banner when closed */}
          {liveThread && (liveThread as any).status === "closed" && (
            <div className="px-4 py-2 text-xs bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              Percakapan ini telah ditutup oleh admin.
              <Button
                variant="outline"
                size="sm"
                className="ml-2 h-6 px-2 py-0 text-xs"
                onClick={async () => {
                  const tId = await getOrCreateThread({
                    contactName: name || undefined,
                    contactEmail: email || undefined,
                    visitorId: visitorId || undefined,
                  });
                  setThreadId(tId as any as string);
                }}
              >
                Mulai percakapan baru
              </Button>
            </div>
          )}

          {/* Messages */}
          <div
            ref={scrollRef}
            className="px-4 py-3 space-y-2 max-h-[620px] overflow-y-auto"
          >
            {(() => {
              const msgs = liveMessages ?? [];
              const lastUser = [...msgs]
                .reverse()
                .find((mm) => mm.senderType === "user");
              const lastUserId = lastUser
                ? (lastUser._id as any as string)
                : null;
              const fmtTime = (ts?: number) => {
                if (!ts) return null;
                const d = new Date(ts);
                const hh = String(d.getHours()).padStart(2, "0");
                const mm = String(d.getMinutes()).padStart(2, "0");
                return `${hh}:${mm}`;
              };
              return msgs.map((m) => {
                const isUser = m.senderType === "user";
                const isLastUser =
                  isUser && lastUserId === (m._id as any as string);
                const readTime = isLastUser
                  ? (m.readAtAgent as number | undefined)
                  : undefined;
                const showRead = !!readTime;
                return (
                  <div
                    key={m._id as any as string}
                    className={cn(
                      "flex",
                      isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-3 py-2 text-sm max-w-[80%]",
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      )}
                    >
                      {/* Text */}
                      {m.text && (
                        <div className="whitespace-pre-wrap break-words">
                          {m.text}
                        </div>
                      )}
                      {/* Attachments preview */}
                      {Array.isArray((m as any).attachments) &&
                        (m as any).attachments.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {(m as any).attachments.map(
                              (att: any, i: number) => {
                                const isImage =
                                  typeof att?.type === "string" &&
                                  att.type.startsWith("image/");
                                const href =
                                  att?.url ||
                                  (att?.storageId
                                    ? `/api/convex/file-url?storageId=${encodeURIComponent(att.storageId)}&redirect=1`
                                    : undefined);
                                const name = att?.name || "file";
                                return (
                                  <div key={i}>
                                    {isImage && href ? (
                                      <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block"
                                      >
                                        <img
                                          src={href}
                                          alt={name}
                                          className="rounded-md max-h-40 object-cover"
                                        />
                                      </a>
                                    ) : (
                                      <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs underline break-all"
                                      >
                                        {name}
                                      </a>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      {showRead && (
                        <div className="text-[10px] opacity-70 mt-1 text-right">
                          Dibaca {fmtTime(readTime)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              });
            })()}
            {(liveMessages?.length ?? 0) === 0 && (
              <div className="text-sm text-muted-foreground">
                Mulai percakapan dengan mengetik pesan di bawah.
              </div>
            )}
          </div>

          <Separator />

          {/* Composer */}
          <form onSubmit={onSubmit} className="p-3 flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Tambah emoji"
                  title="Emoji"
                  className="shrink-0"
                  onClick={() => setShowEmoji((v) => !v)}
                >
                  <Smile className="h-4 w-4" />
                </Button>
                {showEmoji && (
                  <div className="absolute bottom-10 left-0 z-10">
                    <EmojiCDNPicker
                      onPick={(e) => {
                        setMessage((m) => m + e);
                        setShowEmoji(false);
                      }}
                    />
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    // ensure thread exists
                    let tId = threadId;
                    if (!tId) {
                      tId = await getOrCreateThread({
                        contactName: name || undefined,
                        contactEmail: email || undefined,
                        visitorId: visitorId || undefined,
                      });
                      setThreadId(tId as any as string);
                    }
                    // get upload url
                    // validation
                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("Ukuran file maksimal 5MB");
                      return;
                    }
                    setUploading(true);
                    const res = await fetch("/api/convex/upload-url");
                    const { uploadUrl } = await res.json();
                    const form = new FormData();
                    form.append("file", file);
                    const uploadResp = await fetch(uploadUrl, {
                      method: "POST",
                      body: form,
                    });
                    const { storageId } = await uploadResp.json();
                    // optional get public url
                    const urlRes = await fetch(
                      `/api/convex/file-url?storageId=${encodeURIComponent(storageId)}`
                    );
                    const { url } = await urlRes
                      .json()
                      .catch(() => ({ url: undefined }));
                    await sendConvexMessage({
                      threadId: tId as any,
                      text: message.trim() || file.name,
                      senderType: "user",
                      senderId: visitorId || undefined,
                      senderName: name || undefined,
                      attachments: [
                        {
                          storageId,
                          url,
                          name: file.name,
                          type: file.type,
                          size: file.size,
                        },
                      ],
                    });
                    setMessage("");
                  } catch (err) {
                    console.error(err);
                    toast.error("Gagal mengunggah file");
                  } finally {
                    setUploading(false);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Unggah file"
                title="Lampirkan file"
                className="shrink-0"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <Paperclip className="h-4 w-4" />
                )}
              </Button>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  liveThread && (liveThread as any).status === "closed"
                    ? "Percakapan ditutup. Mulai percakapan baru untuk lanjut."
                    : "Tulis pesan Anda..."
                }
                className="min-h-9 max-h-28 resize-y"
                rows={2}
                disabled={
                  !!(liveThread && (liveThread as any).status === "closed")
                }
              />
              <Button
                type="submit"
                className="self-stretch"
                disabled={
                  sending ||
                  !message.trim() ||
                  !!(liveThread && (liveThread as any).status === "closed")
                }
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Kirim</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
