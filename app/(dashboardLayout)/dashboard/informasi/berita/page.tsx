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
import { Input } from "@/components/ui/input";
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
import CreateNewsForm from "@/components/web/createNews";

const editNewsSchema = z.object({
  title: z.string().min(3, "Minimal 3 karakter").max(50),
  author: z.string().min(3, "Minimal 3 karakter").max(50),
  desc: z.string().min(10, "Minimal 10 karakter").max(1000),
  content: z.string().min(10, "Minimal 10 karakter").max(1000),
  image: z.instanceof(File).optional(),
});

type EditNewsValues = z.infer<typeof editNewsSchema>;

export default function NewsPage() {
  const berita = useQuery(api.news.getNews);
  const updateNews = useMutation(api.news.updateNews);
  const deleteNews = useMutation(api.news.deleteNews);
  const generateUploadUrl = useMutation(api.news.generateImageUploadUrl);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();

  // Edit modal state
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<EditNewsValues>({
    resolver: zodResolver(editNewsSchema),
    defaultValues: { title: "", author: "", desc: "", content: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (editing) {
      form.reset({
        title: editing.title ?? "",
        author: editing.author ?? "",
        desc: editing.desc ?? "",
        content: editing.content ?? "",
      });
    }
  }, [editing, form]);

  const handleOpenEdit = (item: any) => {
    setEditing(item);
    setOpen(true);
  };

  const handleSubmitEdit = form.handleSubmit(async (values) => {
    if (!editing?._id) return;
    try {
      let imageStorageId: string | undefined = undefined;
      if (values.image instanceof File) {
        const uploadUrl = await generateUploadUrl({} as any);
        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": values.image.type },
          body: values.image,
        });
        const uploadJson = await uploadRes.json();
        imageStorageId =
          typeof uploadJson === "string" ? uploadJson : uploadJson?.storageId;
        if (!imageStorageId) throw new Error("Gagal mengunggah gambar");
      }

      await updateNews({
        id: editing._id,
        title: values.title,
        author: values.author,
        desc: values.desc,
        content: values.content,
        imageStorageId: imageStorageId as any,
      } as any);
      toast.success("Berita berhasil diperbarui");
      setOpen(false);
      setEditing(null);
    } catch (e: any) {
      toast.error(e?.message || "Gagal memperbarui berita");
    }
  });

  const handleDeleteConfirm = async () => {
    if (!deleting?._id) return;
    try {
      setIsDeleting(true);
      await deleteNews({ id: deleting._id } as any);
      toast.success("Berita dihapus");
      setDeleteOpen(false);
      setDeleting(null);
    } catch (e: any) {
      toast.error(e?.message || "Gagal menghapus berita");
    } finally {
      setIsDeleting(false);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Daftar Berita</h1>
        {isAuthenticated && (
          <Button className="" onClick={() => setIsModalOpen(true)}>
            Tambah Berita
          </Button>
        )}
      </div>

      {berita === undefined ? (
        <div>Memuat...</div>
      ) : berita.length === 0 ? (
        <div>Tidak ada data.</div>
      ) : (
        <div className="overflow-x-auto relative">
          {isModalOpen && <CreateNewsForm setIsModalOpen={setIsModalOpen} />}
          <table className="min-w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="p-3 border">Judul</th>
                <th className="p-3 border">Author</th>
                <th className="p-3 border max-w-[320px]">Deskripsi</th>
                <th className="p-3 border">Dibuat</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {berita.map((item: any) => (
                <tr key={item._id} className="hover:bg-accent/40">
                  <td className="p-3 border font-medium">{item.title}</td>
                  <td className="p-3 border">{item.author}</td>
                  <td
                    className="p-3 border max-w-[320px] truncate"
                    title={item.desc}
                  >
                    {item.desc}
                  </td>
                  <td className="p-3 border">
                    {new Date(item._creationTime).toLocaleString()}
                  </td>
                  <td className="p-3 border">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setDeleting(item);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setEditing(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Berita</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="title">Judul</FieldLabel>
              <FieldContent>
                <Input
                  id="title"
                  {...form.register("title")}
                  aria-invalid={!!form.formState.errors.title}
                />
                <FieldError errors={[form.formState.errors.title]} />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="author">Author</FieldLabel>
              <FieldContent>
                <Input
                  id="author"
                  {...form.register("author")}
                  aria-invalid={!!form.formState.errors.author}
                />
                <FieldError errors={[form.formState.errors.author]} />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="desc">Deskripsi</FieldLabel>
              <FieldContent>
                <Textarea
                  id="desc"
                  rows={3}
                  {...form.register("desc")}
                  aria-invalid={!!form.formState.errors.desc}
                />
                <FieldError errors={[form.formState.errors.desc]} />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="content">Konten</FieldLabel>
              <FieldContent>
                <Textarea
                  id="content"
                  rows={6}
                  {...form.register("content")}
                  aria-invalid={!!form.formState.errors.content}
                />
                <FieldError errors={[form.formState.errors.content]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Gambar</FieldLabel>
              <FieldContent>
                {editing?.imageUrl && (
                  <img
                    src={editing.imageUrl}
                    alt="preview"
                    className="h-24 w-24 object-cover rounded mb-2"
                  />
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    form.setValue("image", file as any, {
                      shouldValidate: true,
                    });
                  }}
                />
                <FieldError errors={[form.formState.errors as any]} />
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

      <Dialog
        open={deleteOpen}
        onOpenChange={(v) => {
          setDeleteOpen(v);
          if (!v) setDeleting(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Berita</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>Apakah Anda yakin ingin menghapus berita ini?</p>
            {deleting && (
              <div className="p-3 border rounded bg-muted/40">
                <div className="font-medium">{deleting.title}</div>
                <div className="text-xs text-muted-foreground">
                  {deleting.author}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
