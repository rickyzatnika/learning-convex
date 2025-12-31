"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, GraduationCap, Utensils, Scissors } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const iconMap: Record<string, any> = {
  education: GraduationCap,
  health: Heart,
  food: Utensils,
  craft: Scissors,
};

export default function PKKPage() {
  const data = useQuery(api.pkk.getPKK);

  if (data === undefined) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">Memuat...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">Data PKK belum tersedia.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            PKK (Pemberdayaan Kesejahteraan Keluarga)
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Memberdayakan keluarga untuk kehidupan yang lebih sejahtera
          </p>
        </div>

        {/* Hero Image */}
        {data.heroImageUrl && (
          <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden">
            <img
              src={data.heroImageUrl}
              alt="PKK"
              className="w-full h-[300px] object-cover"
            />
          </div>
        )}

        {/* About PKK */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Tentang PKK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PKK adalah gerakan pembangunan masyarakat yang tumbuh dari bawah
                yang pengelolaannya dari, oleh, dan untuk masyarakat menuju
                terwujudnya keluarga yang beriman dan bertaqwa kepada Tuhan Yang
                Maha Esa, berakhlak mulia dan berbudi luhur, sehat sejahtera,
                maju dan mandiri, kesetaraan dan keadilan gender serta kesadaran
                hukum dan lingkungan.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Ketua PKK RW</h4>
                  <p className="text-muted-foreground">Ibu Siti Aminah</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Jumlah Anggota</h4>
                  <p className="text-muted-foreground">120 Ibu-ibu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programs */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Program PKK</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.programs.map((program, i) => {
              const Icon = iconMap[program.iconKey] ?? GraduationCap;
              return (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-sm">Kegiatan:</h4>
                    <ul className="space-y-1">
                      {program.kegiatan.map((item, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Jadwal Kegiatan */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Kegiatan Rutin</CardTitle>
              <CardDescription>
                Kegiatan PKK yang dilaksanakan secara berkala
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.jadwal.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold mb-1">{item.kegiatan}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.waktu}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {item.tempat}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery */}
        {data.galleryImageUrls?.length ? (
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Galeri Kegiatan</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {data.galleryImageUrls.map((url, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src={url}
                    alt={`Kegiatan ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Bergabung dengan PKK</h3>
              <p className="text-muted-foreground mb-6">
                Mari bergabung dan berkontribusi untuk kesejahteraan keluarga
                dan lingkungan
              </p>
              <Button size="lg">Daftar Sekarang</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
