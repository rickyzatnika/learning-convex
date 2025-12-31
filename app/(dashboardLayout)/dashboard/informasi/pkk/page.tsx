"use client";

import { api } from "@/convex/_generated/api";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import CreatePkkForm from "@/components/web/createPkk";

const editSchema = z.object({
  heroImageUrl: z.string().url().optional().or(z.literal("")),
  programsJson: z.string().min(2, "Wajib diisi (array JSON)"),
  jadwalJson: z.string().min(2, "Wajib diisi (array JSON)"),
  galleryJson: z.string().min(2, "Wajib diisi (array JSON URL)"),
});

export default function PKKPage() {
  const pkk = useQuery(api.pkk.getPKK);
  const updatePKK = useMutation(api.pkk.updatePKK);
  const deletePKK = useMutation(api.pkk.deletePKKById);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();

  // Edit modal state
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      heroImageUrl: "",
      programsJson: "[]",
      jadwalJson: "[]",
      galleryJson: "[]",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (pkk) {
      form.reset({
        heroImageUrl: pkk.heroImageUrl || "",
        programsJson: JSON.stringify(pkk.programs || [], null, 2),
        jadwalJson: JSON.stringify(pkk.jadwal || [], null, 2),
        galleryJson: JSON.stringify(pkk.galleryImageUrls || [], null, 2),
      });
    }
  }, [pkk, form]);

  const handleSubmitEdit = form.handleSubmit(async (values) => {
    if (!pkk?._id) return;
    try {
      const programs = JSON.parse(values.programsJson || "[]");
      const jadwal = JSON.parse(values.jadwalJson || "[]");
      const galleryImageUrls = JSON.parse(values.galleryJson || "[]");

      if (
        !Array.isArray(programs) ||
        !Array.isArray(jadwal) ||
        !Array.isArray(galleryImageUrls)
      ) {
        throw new Error("Format JSON tidak valid");
      }

      await updatePKK({
        id: pkk._id,
        heroImageUrl: values.heroImageUrl || undefined,
        programs,
        jadwal,
        galleryImageUrls,
      } as any);

      toast.success("PKK berhasil diperbarui");
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Gagal memperbarui PKK");
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  async function handleDelete() {
    if (!pkk?._id) return;
    const ok = window.confirm(
      "Yakin ingin menghapus data PKK ini? Tindakan ini tidak dapat dibatalkan."
    );
    if (!ok) return;
    try {
      setIsDeleting(true);
      await deletePKK({ id: pkk._id });
      toast.success("PKK berhasil dihapus");
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Gagal menghapus PKK");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Data PKK</h1>
        {isAuthenticated && (
          <Button className="" onClick={() => setIsModalOpen(true)}>
            Buat PKK
          </Button>
        )}
      </div>

      {pkk === undefined ? (
        <div>Memuat...</div>
      ) : !pkk ? (
        <>
          <div>Belum ada data PKK, silakan buat.</div>
        </>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="min-w-full text-sm border rounded-lg overflow-hidden relative">
            {isModalOpen && <CreatePkkForm setIsModalOpen={setIsModalOpen} />}
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="p-3 border">Jumlah Program</th>
                <th className="p-3 border">Jumlah Jadwal</th>
                <th className="p-3 border">Jumlah Gambar</th>
                <th className="p-3 border">Dibuat</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-accent/40">
                <td className="p-3 border font-medium">
                  {pkk.programs?.length ?? 0}
                </td>
                <td className="p-3 border">{pkk.jadwal?.length ?? 0}</td>
                <td className="p-3 border">
                  {pkk.galleryImageUrls?.length ?? 0}
                </td>
                <td className="p-3 border">
                  {new Date(pkk._creationTime).toLocaleString()}
                </td>
                <td className="p-3 border">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setOpen(true)}
                      disabled={isDeleting}
                    >
                      Edit
                    </Button>
                    {isAuthenticated && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Menghapus..." : "Delete"}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit PKK</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="heroImageUrl">Hero Image URL</FieldLabel>
              <FieldContent>
                <Textarea
                  id="heroImageUrl"
                  rows={2}
                  {...form.register("heroImageUrl")}
                />
                <FieldError
                  errors={[form.formState.errors.heroImageUrl as any]}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="programsJson">Programs (JSON)</FieldLabel>
              <FieldContent>
                <Textarea
                  id="programsJson"
                  rows={6}
                  {...form.register("programsJson")}
                />
                <FieldError
                  errors={[form.formState.errors.programsJson as any]}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="jadwalJson">Jadwal (JSON)</FieldLabel>
              <FieldContent>
                <Textarea
                  id="jadwalJson"
                  rows={6}
                  {...form.register("jadwalJson")}
                />
                <FieldError
                  errors={[form.formState.errors.jadwalJson as any]}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="galleryJson">
                Gallery Image URLs (JSON)
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="galleryJson"
                  rows={4}
                  {...form.register("galleryJson")}
                />
                <FieldError
                  errors={[form.formState.errors.galleryJson as any]}
                />
              </FieldContent>
            </Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
