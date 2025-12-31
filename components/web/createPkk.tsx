"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { pkkJadwalItemSchema, pkkProgramSchema } from "@/app/schemas/pkk";

const iconOptions = [
  { value: "education", label: "Pendidikan" },
  { value: "health", label: "Kesehatan" },
  { value: "food", label: "Pangan" },
  { value: "craft", label: "Kerajinan" },
] as const;

type IconKey = (typeof iconOptions)[number]["value"];

const formSchema = z.object({
  programs: z
    .array(
      z.object({
        iconKey: z.custom<IconKey>(),
        title: z.string().min(3),
        description: z.string().min(5),
        kegiatanText: z.string().min(1, "Minimal 1 kegiatan (pisahkan baris)"),
      })
    )
    .min(1, "Minimal 1 program"),
  jadwal: z
    .array(
      z.object({
        kegiatan: z.string().min(3),
        waktu: z.string().min(3),
        tempat: z.string().min(2),
      })
    )
    .min(1, "Minimal 1 jadwal"),
  gallery: z
    .array(z.object({ url: z.string().url() }))
    .min(1, "Minimal 1 URL gambar"),
});

export default function CreatePkkForm({
  setIsModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const createPKK = useMutation(api.pkk.createPKK);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programs: [
        { iconKey: "education", title: "", description: "", kegiatanText: "" },
      ],
      jadwal: [{ kegiatan: "", waktu: "", tempat: "" }],
      gallery: [{ url: "" }],
    },
  });

  const programsFA = useFieldArray({ name: "programs", control: form.control });
  const jadwalFA = useFieldArray({ name: "jadwal", control: form.control });
  const galleryFA = useFieldArray({ name: "gallery", control: form.control });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        // Transform kegiatanText to array and validate via pkkProgramSchema
        const programs = values.programs.map((p) => {
          const kegiatan = p.kegiatanText
            .split(/\r?\n|,/)
            .map((s) => s.trim())
            .filter(Boolean);
          return {
            iconKey: p.iconKey,
            title: p.title,
            description: p.description,
            kegiatan,
          };
        });
        const programsValidation = z
          .array(pkkProgramSchema)
          .safeParse(programs);
        if (!programsValidation.success) {
          throw new Error("Program tidak valid. Periksa isian Anda.");
        }

        const jadwalValidation = z
          .array(pkkJadwalItemSchema)
          .safeParse(values.jadwal);
        if (!jadwalValidation.success) {
          throw new Error("Jadwal tidak valid. Periksa isian Anda.");
        }

        const galleryImageUrls = values.gallery.map((g) => g.url);

        await createPKK({
          programs: programsValidation.data,
          jadwal: jadwalValidation.data,
          galleryImageUrls,
        } as any);

        toast.success("PKK dibuat");
        form.reset();
        setIsModalOpen(false);
      } catch (err: any) {
        toast.error(err?.message || "Gagal membuat PKK");
      }
    });
  }

  return (
    <div className="fixed bg-black/50 backdrop-blur top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden  md:inset-0 h-screen flex flex-col items-center justify-center">
      <div className="w-full h-[90vh] mx-auto">
        <Card className="w-full max-w-3xl mx-auto ">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Create PKK Programs</h1>
          </div>
          <CardHeader>
            <CardTitle>PKK</CardTitle>
            <CardDescription>Isi data PKK</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Programs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Programs</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      programsFA.append({
                        iconKey: "education",
                        title: "",
                        description: "",
                        kegiatanText: "",
                      })
                    }
                  >
                    + Tambah Program
                  </Button>
                </div>
                {programsFA.fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="rounded-md border p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Program #{idx + 1}</div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => programsFA.remove(idx)}
                      >
                        Hapus
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field>
                        <FieldLabel>Icon</FieldLabel>
                        <select
                          className="border rounded px-3 py-2"
                          {...form.register(`programs.${idx}.iconKey` as const)}
                        >
                          {iconOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <FieldError
                          errors={[
                            form.formState.errors.programs?.[idx]
                              ?.iconKey as any,
                          ]}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Judul</FieldLabel>
                        <Input
                          {...form.register(`programs.${idx}.title` as const)}
                        />
                        <FieldError
                          errors={[
                            form.formState.errors.programs?.[idx]?.title as any,
                          ]}
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel>Deskripsi</FieldLabel>
                      <Textarea
                        rows={3}
                        {...form.register(
                          `programs.${idx}.description` as const
                        )}
                      />
                      <FieldError
                        errors={[
                          form.formState.errors.programs?.[idx]
                            ?.description as any,
                        ]}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>
                        Kegiatan (satu per baris atau koma)
                      </FieldLabel>
                      <Textarea
                        rows={3}
                        placeholder={"Misal:\nPenyuluhan gizi\nSenam sehat"}
                        {...form.register(
                          `programs.${idx}.kegiatanText` as const
                        )}
                      />
                      <FieldError
                        errors={[
                          form.formState.errors.programs?.[idx]
                            ?.kegiatanText as any,
                        ]}
                      />
                    </Field>
                  </div>
                ))}
              </div>

              {/* Jadwal */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Jadwal</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      jadwalFA.append({ kegiatan: "", waktu: "", tempat: "" })
                    }
                  >
                    + Tambah Jadwal
                  </Button>
                </div>
                {jadwalFA.fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="rounded-md border p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Jadwal #{idx + 1}</div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => jadwalFA.remove(idx)}
                      >
                        Hapus
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Field>
                        <FieldLabel>Kegiatan</FieldLabel>
                        <Input
                          {...form.register(`jadwal.${idx}.kegiatan` as const)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Waktu</FieldLabel>
                        <Input
                          {...form.register(`jadwal.${idx}.waktu` as const)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Tempat</FieldLabel>
                        <Input
                          {...form.register(`jadwal.${idx}.tempat` as const)}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Galeri</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => galleryFA.append({ url: "" })}
                  >
                    + Tambah URL Gambar
                  </Button>
                </div>
                {galleryFA.fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-end"
                  >
                    <Field>
                      <FieldLabel>URL Gambar #{idx + 1}</FieldLabel>
                      <Input
                        placeholder="https://..."
                        {...form.register(`gallery.${idx}.url` as const)}
                      />
                      <FieldError
                        errors={[
                          form.formState.errors.gallery?.[idx]?.url as any,
                        ]}
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => galleryFA.remove(idx)}
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
              </div>

              <div className="w-full flex items-center justify-between gap-8">
                <Button className="flex-1" type="submit" disabled={isPending}>
                  {isPending ? (
                    <div className="flex items-center gap-1">
                      <Spinner /> Loading...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
                <Button
                  className="flex-1"
                  type="button"
                  variant="destructive"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
