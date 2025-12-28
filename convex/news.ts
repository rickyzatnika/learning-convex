import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createNews = mutation({
  args: { title: v.string(),image: v.string(), desc: v.string(), content: v.string(),  author: v.string() },
  handler: async (ctx, args) => {
   

    const newNewsId = await ctx.db.insert("news", { title: args.title, desc: args.desc, image: args.image, content: args.content, author: args.author});
    return newNewsId;
  },
});





// Return the last 100 tasks in a given task list.
export const getNews = query({
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("news")
      .order("desc")
      .collect();
  
    return tasks;
  },
});


// Get single news by ID
export const getNewsById = query({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    const news = await ctx.db.get(args.id);
    return news;
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
    return news;
  },
});



