import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createNews = mutation({
  args: {
    title: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    desc: v.string(),
    content: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not Authenticated!");
    }

    const newNewsId = await ctx.db.insert("news", {
      title: args.title,
      desc: args.desc,
      imageStorageId: args.imageStorageId,
      content: args.content,
      author: args.author,
    });
    return newNewsId;
  },
});

// Return the last 100 tasks in a given task list.
export const getNews = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query("news").order("desc").collect();

    return await Promise.all(
      news.map(async (post) => {
        const resolvedImageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});

// Get single news by ID
export const getNewsById = query({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    const news = await ctx.db.get(args.id);
    if (!news) return null;

    const imageUrl =
      news.imageStorageId !== undefined
        ? await ctx.storage.getUrl(news.imageStorageId)
        : null;

    return {
      ...news,
      imageUrl,
    };
  },
});

// Get single news by title

// Get single news by title (case-insensitive)
export const getNewsByTitleCaseInsensitive = query({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const allNews = await ctx.db.query("news").collect();
    const news = allNews.find(
      (n) => n.title.toLowerCase() === args.title.toLowerCase()
    );

    if (!news) return null;

    const imageUrl =
      news.imageStorageId !== undefined
        ? await ctx.storage.getUrl(news.imageStorageId)
        : null;

    return {
      ...news,
      imageUrl,
    };
  },
});

//ImageUpload

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not Authenticated!");
    }

    const storageId = await ctx.storage.generateUploadUrl();
    return storageId;
  },
});
