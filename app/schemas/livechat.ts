import z from "zod";

// Core message payload from UI
export const liveChatMessageSchema = z.object({
  threadId: z.string().optional(), // empty if creating a new thread
  text: z.string().min(1, "Pesan tidak boleh kosong").max(4000, "Pesan terlalu panjang"),
  senderType: z.enum(["user", "agent", "system"]).default("user"),
  senderId: z.string().optional(),
  senderName: z.string().optional(),
  attachments: z
    .array(
      z.object({
        url: z.string().url(),
        name: z.string().optional(),
        type: z.string().optional(),
        size: z.number().optional(),
      })
    )
    .optional(),
});

export const liveChatStartSchema = z.object({
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  visitorId: z.string().optional(),
  authUserId: z.string().optional(),
  firstMessage: z.string().min(1).max(4000),
});

export const liveChatThreadFilterSchema = z.object({
  status: z.enum(["open", "pending", "closed"]).optional(),
  assignedAgentId: z.string().optional(),
  visitorId: z.string().optional(),
  authUserId: z.string().optional(),
  limit: z.number().min(1).max(100).default(30),
});

export type LiveChatMessageInput = z.infer<typeof liveChatMessageSchema>;
export type LiveChatStartInput = z.infer<typeof liveChatStartSchema>;
export type LiveChatThreadFilter = z.infer<typeof liveChatThreadFilterSchema>;
