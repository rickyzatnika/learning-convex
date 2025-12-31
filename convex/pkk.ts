import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Get singleton PKK document (slug = "default")
export const getPKK = query({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("pkk")
      .withIndex("by_slug", (q) => q.eq("slug", "default"))
      .first();
    return doc ?? null;
  },
});

// Create PKK singleton (will fail if it already exists)
export const createPKK = mutation({
  args: {
    heroImageUrl: v.optional(v.string()),
    programs: v.array(
      v.object({
        iconKey: v.string(),
        title: v.string(),
        description: v.string(),
        kegiatan: v.array(v.string()),
      })
    ),
    jadwal: v.array(
      v.object({
        kegiatan: v.string(),
        waktu: v.string(),
        tempat: v.string(),
      })
    ),
    galleryImageUrls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated!");
    }

    const existing = await ctx.db
      .query("pkk")
      .withIndex("by_slug", (q) => q.eq("slug", "default"))
      .first();

    if (existing) {
      throw new ConvexError("PKK already exists");
    }

    const id = await ctx.db.insert("pkk", {
      slug: "default",
      heroImageUrl: args.heroImageUrl,
      programs: args.programs,
      jadwal: args.jadwal,
      galleryImageUrls: args.galleryImageUrls,
    });

    return id;
  },
});

// Update PKK document by id
export const updatePKK = mutation({
  args: {
    id: v.id("pkk"),
    heroImageUrl: v.optional(v.string()),
    programs: v.array(
      v.object({
        iconKey: v.string(),
        title: v.string(),
        description: v.string(),
        kegiatan: v.array(v.string()),
      })
    ),
    jadwal: v.array(
      v.object({
        kegiatan: v.string(),
        waktu: v.string(),
        tempat: v.string(),
      })
    ),
    galleryImageUrls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated!");
    }

    const patch: any = {
      programs: args.programs,
      jadwal: args.jadwal,
      galleryImageUrls: args.galleryImageUrls,
    };

    if (args.heroImageUrl !== undefined) {
      patch.heroImageUrl = args.heroImageUrl;
    }

    await ctx.db.patch(args.id, patch);
    return args.id;
  },
});

// Delete PKK by id
export const deletePKKById = mutation({
  args: { id: v.id("pkk") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated!");
    }

    // Ensure the document exists
    const doc = await ctx.db.get(args.id);
    if (!doc) {
      throw new ConvexError("PKK not found");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
