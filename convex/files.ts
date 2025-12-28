import { action, mutation } from "./_generated/server";
import { v } from "convex/values";

// Generate an upload URL for client-side direct upload to Convex storage
export const generateUploadUrl = action({
  args: {},
  handler: async (ctx) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return { uploadUrl };
  },
});

// Save file metadata into a message attachment if needed later
export const getFileUrl = action({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return { url };
  },
});
