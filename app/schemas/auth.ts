import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(32, "Nama maksimal 32 karakter"),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(32, "Password maksimal 32 karakter"),
});

export const loginSchema = z.object({
  email: z.email("Email atau password salah!"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(32, "Password maksimal 32 karakter"),
});
