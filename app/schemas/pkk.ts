import { z } from "zod";

export const pkkProgramSchema = z.object({
  iconKey: z
    .enum(["education", "health", "food", "craft"])
    .describe("Tipe ikon untuk program"),
  title: z.string().min(3).max(100),
  description: z.string().min(5).max(200),
  kegiatan: z.array(z.string().min(1)).min(1),
});

export const pkkJadwalItemSchema = z.object({
  kegiatan: z.string().min(3).max(100),
  waktu: z.string().min(3).max(100),
  tempat: z.string().min(2).max(100),
});

export const pkkSchema = z.object({
  slug: z.literal("default"),
  programs: z.array(pkkProgramSchema).min(1),
  jadwal: z.array(pkkJadwalItemSchema).min(1),
  galleryImageUrls: z.array(z.string().url()).min(1),
});

export type PKK = z.infer<typeof pkkSchema>;
export type PKKProgram = z.infer<typeof pkkProgramSchema>;
export type PKKJadwalItem = z.infer<typeof pkkJadwalItemSchema>;
