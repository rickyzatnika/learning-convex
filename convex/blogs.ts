import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createBlog = mutation({
  args: { title: v.string(), content: v.string(), authorId: v.string(), author: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)

    if(!user){
      throw new ConvexError("Unauthorized")
    }

    const newBlogId = await ctx.db.insert("blogs", { title: args.title, content: args.content, authorId: user._id, author: user.name});
    return newBlogId;
  },
});





// Return the last 100 tasks in a given task list.
export const getBlogs = query({
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("blogs")
      .collect();
  
    return tasks;
  },
});


// Get single blog by ID
export const getBlogById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.id);
    return blog;
  },
});

