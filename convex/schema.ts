import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  news: defineTable({
    title: v.string(),
    image: v.string(),
    author: v.string(),
    desc: v.string(),
    content: v.string(),
  }),
  services: defineTable({
    nama: v.string(),
    waktu: v.string(),
    persyaratan: v.array(v.string()),
  }),
});