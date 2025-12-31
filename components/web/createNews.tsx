"use client";

import { createNewsAction } from "@/app/action";
import { newsSchema } from "@/app/schemas/news";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CreateNewsForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
      image: undefined,
      desc: "",
    },
  });

  function onSubmit(values: z.infer<typeof newsSchema>) {
    startTransition(async () => {
      try {
        await createNewsAction(values);

        toast.success("News created successfully!");
        form.reset();
        setIsModalOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create blog"
        );
      }
    });
  }

  return (
    <div className="fixed bg-black/50 backdrop-blur top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold">Create POST</h1>
        <p className="pb-6">Membuat Form CREATE POST to database Convex</p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
          <CardDescription>Post your blog to database Convex</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Judul :</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Example: John Doe"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="author"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Author :</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Example: John Doe"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="desc"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Deskripsi :</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="deskripsi konten"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Gambar :</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="url gambar"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file);
                      }}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Konten :</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="masukkan konten minimal 100 karakter"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-1">
                  <Spinner /> Loading...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNewsForm;
