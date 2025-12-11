import z from "zod";

// Schema untuk item layanan administrasi
export const layananItemSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama layanan minimal 3 karakter")
    .max(100, "Nama layanan maksimal 100 karakter"),
  waktu: z
    .string()
    .min(1, "Estimasi waktu wajib diisi")
    .max(50, "Estimasi waktu terlalu panjang"),
  persyaratan: z
    .array(
      z
        .string()
        .min(2, "Persyaratan terlalu pendek")
        .max(120, "Persyaratan terlalu panjang")
    )
    .min(1, "Minimal 1 persyaratan"),
});

// Schema untuk daftar layanan
export const layananListSchema = z.array(layananItemSchema).min(1);

export type LayananItem = z.infer<typeof layananItemSchema>;
export type LayananList = z.infer<typeof layananListSchema>;
