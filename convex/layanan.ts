import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new service item
export const createServices = mutation({
  args: {
    nama: v.string(),
    waktu: v.string(),
    persyaratan: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("services", {
      nama: args.nama,
      waktu: args.waktu,
      persyaratan: args.persyaratan,
    });
    return id;
  },
});

// Get all services
export const getServices = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("services").collect();
    // Optionally sort by creation time descending if needed
    return items.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Get a single service by id
export const getServicesById = query({
  args: { id: v.id("services") },
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    return doc ?? null;
  },
});

// Delete a service by id
export const deleteById = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return { ok: true };
  },
});
