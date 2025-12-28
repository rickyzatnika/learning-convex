"use server"

import z from "zod";
import { newsSchema } from "./schemas/news";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";

// LiveChat: server action to send a message (create/get thread then send)
const liveChatSendSchema = z.object({
  threadId: z.string().optional(),
  text: z.string().min(1, "Pesan tidak boleh kosong").max(4000),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  visitorId: z.string().optional(),
});

export async function sendLiveChatMessageAction(values: z.infer<typeof liveChatSendSchema>) {
  const parsed = liveChatSendSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid chat data");
  }
  const v = parsed.data;

  // Ensure thread exists (if no threadId provided)
  const threadId = v.threadId || (await fetchMutation(api.livechat.getOrCreateThread, {
    contactName: v.contactName,
    contactEmail: v.contactEmail,
    visitorId: v.visitorId,
  } as any));

  await fetchMutation(api.livechat.sendMessage, {
    threadId: threadId as any,
    text: v.text,
    senderType: "user",
    senderId: v.visitorId,
    senderName: v.contactName,
  } as any);

  return { threadId };
}

export async function createNewsAction(values: z.infer<typeof newsSchema>) {
    const parsed = newsSchema.safeParse(values);

    if(!parsed.success) {
        throw new Error('Invalid data');
    }

    await fetchMutation(api.news.createNews, {
        title: parsed.data.title,
        content: parsed.data.content,
        author: parsed.data.author,
        image: parsed.data.image,
        desc: parsed.data.desc,
    });

 
}