import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  news: defineTable({
    title: v.string(),
    author: v.string(),
    desc: v.string(),
    content: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  }),
  services: defineTable({
    nama: v.string(),
    waktu: v.string(),
    persyaratan: v.array(v.string()),
  }),
  // LiveChat: Threads (rooms/sessions)
  chatThreads: defineTable({
    // Optional info about the visitor/customer initiating chat
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    // Client-side identifier for anonymous visitor (e.g., cookie/localStorage id)
    visitorId: v.optional(v.string()),
    // If your app has authenticated users, you can store their auth user id/email here
    authUserId: v.optional(v.string()),

    // Thread status lifecycle
    status: v.union(
      v.literal("open"),
      v.literal("pending"),
      v.literal("closed")
    ),

    // Assignment for internal agent (store user id/email/label)
    assignedAgentId: v.optional(v.string()),

    // Metadata for listing/sorting
    lastMessageAt: v.optional(v.number()), // use Date.now() timestamps
    lastMessagePreview: v.optional(v.string()),
    unreadCountUser: v.optional(v.number()),
    unreadCountAgent: v.optional(v.number()),

    // Optional tags/channel/source
    tags: v.optional(v.array(v.string())),
    channel: v.optional(v.string()), // e.g., "web"
  })
    .index("by_status", ["status"]) // retrieve open/pending threads
    .index("by_contactEmail", ["contactEmail"]) // find by email
    .index("by_assignedAgent", ["assignedAgentId"]) // agent inbox
    .index("by_visitor", ["visitorId"]) // anonymous visitor session
    .index("by_authUser", ["authUserId"]) // authenticated user session
    .index("by_lastMessageAt", ["lastMessageAt"]), // recents

  // LiveChat: Messages (events in a thread)
  chatMessages: defineTable({
    threadId: v.id("chatThreads"),
    // basic message content
    text: v.string(),

    // Sender metadata
    senderType: v.union(
      v.literal("user"),
      v.literal("agent"),
      v.literal("system")
    ),
    senderId: v.optional(v.string()), // email/user id/visitor id
    senderName: v.optional(v.string()),

    // Delivery state
    delivered: v.optional(v.boolean()),
    readAtUser: v.optional(v.number()), // timestamp read by user
    readAtAgent: v.optional(v.number()), // timestamp read by agent

    // Attachments support (future-proof)
    attachments: v.optional(
      v.array(
        v.object({
          url: v.optional(v.string()),
          storageId: v.optional(v.string()),
          name: v.optional(v.string()),
          type: v.optional(v.string()),
          size: v.optional(v.number()),
        })
      )
    ),
  }).index("by_thread", ["threadId"]), // list messages by thread
});
