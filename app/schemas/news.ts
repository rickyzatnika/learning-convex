import z from "zod";

export const newsSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),
  image: z.instanceof(File),
  author: z
    .string()
    .min(3, "Author must be at least 3 characters long")
    .max(50, "Author must be at most 50 characters long"),
  desc: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .max(1000, "Content must be at most 1000 characters long"),
});
