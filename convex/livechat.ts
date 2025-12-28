import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or fetch an open thread for a visitor/auth user
export const getOrCreateThread = mutation({
  args: {
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    visitorId: v.optional(v.string()),
    authUserId: v.optional(v.string()),
    firstMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Try by auth user first
    if (args.authUserId) {
      const existing = await ctx.db
        .query("chatThreads")
        .withIndex("by_authUser", (q) => q.eq("authUserId", args.authUserId))
        .filter((q) => q.neq(q.field("status"), "closed"))
        .order("desc")
        .first();
      if (existing) return existing._id;
    }

    // Next by contact email (so returning users on new device but same email re-open the same thread)
    if (args.contactEmail) {
      const existing = await ctx.db
        .query("chatThreads")
        .withIndex("by_contactEmail", (q) => q.eq("contactEmail", args.contactEmail))
        .filter((q) => q.neq(q.field("status"), "closed"))
        .order("desc")
        .first();
      if (existing) return existing._id;
    }

    // Then by visitor id
    if (args.visitorId) {
      const existing = await ctx.db
        .query("chatThreads")
        .withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
        .filter((q) => q.neq(q.field("status"), "closed"))
        .order("desc")
        .first();
      if (existing) return existing._id;
    }

    const threadId = await ctx.db.insert("chatThreads", {
      contactName: args.contactName,
      contactEmail: args.contactEmail,
      visitorId: args.visitorId,
      authUserId: args.authUserId,
      status: "open",
      lastMessageAt: now,
      lastMessagePreview: args.firstMessage || "",
      unreadCountAgent: args.firstMessage ? 1 : 0,
      unreadCountUser: 0,
      channel: "web",
    });

    if (args.firstMessage) {
      await ctx.db.insert("chatMessages", {
        threadId,
        text: args.firstMessage,
        senderType: "user",
        senderId: args.authUserId || args.visitorId,
        senderName: args.contactName,
        delivered: true,
      });
    }

    return threadId;
  },
});

export const sendMessage = mutation({
  args: {
    threadId: v.id("chatThreads"),
    text: v.string(),
    senderType: v.union(
      v.literal("user"),
      v.literal("agent"),
      v.literal("system")
    ),
    senderId: v.optional(v.string()),
    senderName: v.optional(v.string()),
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const thread = await ctx.db.get(args.threadId);
    if (!thread) throw new Error("Thread tidak ditemukan");
    if (thread.status === "closed") throw new Error("Thread sudah ditutup");

    await ctx.db.patch(args.threadId, {
      lastMessageAt: now,
      lastMessagePreview: args.text.slice(0, 200),
      unreadCountAgent: args.senderType === "user" ? (thread.unreadCountAgent || 0) + 1 : 0,
      unreadCountUser: args.senderType === "agent" ? (thread.unreadCountUser || 0) + 1 : 0,
    });

    return await ctx.db.insert("chatMessages", {
      threadId: args.threadId,
      text: args.text,
      senderType: args.senderType,
      senderId: args.senderId,
      senderName: args.senderName,
      delivered: true,
      attachments: args.attachments,
      // If sender is agent, mark user hasn't read yet; vice versa
      readAtUser: args.senderType === "agent" ? undefined : undefined,
      readAtAgent: args.senderType === "user" ? undefined : undefined,
    });
  },
});

export const listMessages = query({
  args: { threadId: v.id("chatThreads") },
  handler: async (ctx, args) => {
    const msgs = await ctx.db
      .query("chatMessages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .collect();
    return msgs;
  },
});

export const listThreads = query({
  args: {
    status: v.optional(v.union(v.literal("open"), v.literal("pending"), v.literal("closed"))),
    assignedAgentId: v.optional(v.string()),
    visitorId: v.optional(v.string()),
    authUserId: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Convex only allows a single withIndex per query chain.
    // Choose the most specific available filter to seed the query.
    let threads;

    if (args.visitorId) {
      threads = await ctx.db
        .query("chatThreads")
        .withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
        .collect();
    } else if (args.authUserId) {
      threads = await ctx.db
        .query("chatThreads")
        .withIndex("by_authUser", (q) => q.eq("authUserId", args.authUserId))
        .collect();
    } else if (args.assignedAgentId) {
      threads = await ctx.db
        .query("chatThreads")
        .withIndex("by_assignedAgent", (q) => q.eq("assignedAgentId", args.assignedAgentId))
        .collect();
    } else if (args.status) {
      threads = await ctx.db
        .query("chatThreads")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    } else {
      // fallback to index by lastMessageAt for recents
      threads = await ctx.db
        .query("chatThreads")
        .withIndex("by_lastMessageAt")
        .order("desc")
        .collect();
    }

    // Additional in-memory filtering for status if we didn't seed by it
    if (threads && args.status) {
      threads = threads.filter((t) => t.status === args.status);
    }

    // Sort by lastMessageAt desc as final ordering
    threads.sort((a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0));

    return args.limit ? threads.slice(0, args.limit) : threads;
  },
});

export const markRead = mutation({
  args: {
    threadId: v.id("chatThreads"),
    reader: v.union(v.literal("user"), v.literal("agent")),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) throw new Error("Thread tidak ditemukan");
    const patch: any = {};
    if (args.reader === "agent") {
      patch.unreadCountAgent = 0;
    } else {
      patch.unreadCountUser = 0;
    }
    await ctx.db.patch(args.threadId, patch);
  },
});

// Per-message read receipts: mark all messages from the opposite party as read
export const markMessagesRead = mutation({
  args: {
    threadId: v.id("chatThreads"),
    reader: v.union(v.literal("user"), v.literal("agent")),
  },
  handler: async (ctx, args) => {
    const isAgent = args.reader === "agent";
    const msgs = await ctx.db
      .query("chatMessages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .collect();

    for (const m of msgs) {
      if (isAgent) {
        if (m.senderType !== "agent" && !m.readAtAgent) {
          await ctx.db.patch(m._id, { readAtAgent: Date.now() });
        }
      } else {
        if (m.senderType !== "user" && !m.readAtUser) {
          await ctx.db.patch(m._id, { readAtUser: Date.now() });
        }
      }
    }
  },
});

export const assignAgent = mutation({
  args: { threadId: v.id("chatThreads"), agentId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.threadId, {
      assignedAgentId: args.agentId,
      status: "pending",
    });
  },
});

export const updateThreadStatus = mutation({
  args: {
    threadId: v.id("chatThreads"),
    status: v.union(v.literal("open"), v.literal("pending"), v.literal("closed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.threadId, { status: args.status });
  },
});

export const getThread = query({
  args: { threadId: v.id("chatThreads") },
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    return thread;
  },
});
