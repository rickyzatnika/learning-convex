"use server";

import z from "zod";
import { newsSchema } from "./schemas/news";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";

// LiveChat: server action to send a message (create/get thread then send)
const liveChatSendSchema = z.object({
  threadId: z.string().optional(),
  text: z.string().min(1, "Pesan tidak boleh kosong").max(4000),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  visitorId: z.string().optional(),
});

export async function sendLiveChatMessageAction(
  values: z.infer<typeof liveChatSendSchema>
) {
  const parsed = liveChatSendSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid chat data");
  }
  const v = parsed.data;

  // Ensure thread exists (if no threadId provided)
  const threadId =
    v.threadId ||
    (await fetchMutation(api.livechat.getOrCreateThread, {
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
  try {
    const parsed = newsSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error("Invalid data");
    }

    const token = await getToken();

    const imageUrl = await fetchMutation(
      api.news.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult.ok) {
      throw new Error("Image upload failed");
    }

    const uploadJson = await uploadResult.json();
    const storageId =
      typeof uploadJson === "string" ? uploadJson : uploadJson?.storageId;

    if (typeof storageId !== "string") {
      throw new Error(
        `Unexpected upload response; expected { storageId: string } but got: ${JSON.stringify(
          uploadJson
        )}`
      );
    }

    await fetchMutation(
      api.news.createNews,
      {
        title: parsed.data.title,
        content: parsed.data.content,
        author: parsed.data.author,
        imageStorageId: storageId as any,
        desc: parsed.data.desc,
      },
      { token }
    );
  } catch (error) {
    return {
      error: "Unknown error",
    };
  }
}
