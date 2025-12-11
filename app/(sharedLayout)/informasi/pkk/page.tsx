import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, GraduationCap, Utensils, Scissors } from "lucide-react";

export default function PKKPage() {
  const programs = [
    {
      icon: GraduationCap,
      title: "Pendidikan dan Keterampilan",
      description: "Pelatihan keterampilan untuk meningkatkan kemampuan ibu-ibu",
      kegiatan: ["Kursus menjahit", "Pelatihan membuat kue", "Kelas bahasa Inggris"],
    },
    {
      icon: Heart,
      title: "Kesehatan",
      description: "Program kesehatan untuk keluarga",
      kegiatan: ["Posyandu balita", "Senam sehat", "Penyuluhan kesehatan"],
    },
    {
      icon: Utensils,
      title: "Pangan dan Gizi",
      description: "Edukasi gizi dan ketahanan pangan",
      kegiatan: ["Demo masak sehat", "Kebun sayur bersama", "Penyuluhan gizi"],
    },
    {
      icon: Scissors,
      title: "Kerajinan Tangan",
      description: "Membuat produk kerajinan bernilai ekonomi",
      kegiatan: ["Kerajinan dari limbah", "Pembuatan bros", "Tas rajut"],
    },
  ];

  const jadwalKegiatan = [
    { kegiatan: "Posyandu Balita", waktu: "Setiap Rabu, 08.00 - 11.00", tempat: "Balai RW" },
    { kegiatan: "Senam Sehat", waktu: "Setiap Jumat, 06.00 - 07.00", tempat: "Lapangan RW" },
    { kegiatan: "Arisan PKK", waktu: "Minggu ke-2, 14.00 - 16.00", tempat: "Balai RW" },
    { kegiatan: "Pelatihan Keterampilan", waktu: "Minggu ke-3, 13.00 - 15.00", tempat: "Balai RW" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">PKK (Pemberdayaan Kesejahteraan Keluarga)</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Memberdayakan keluarga untuk kehidupan yang lebih sejahtera
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden">
          <img
            src="https://picsum.photos/1200/400?random=40"
            alt="PKK"
            className="w-full h-[300px] object-cover"
          />
        </div>

        {/* About PKK */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Tentang PKK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PKK adalah gerakan pembangunan masyarakat yang tumbuh dari bawah yang pengelolaannya dari, oleh, dan untuk masyarakat menuju terwujudnya keluarga yang beriman dan bertaqwa kepada Tuhan Yang Maha Esa, berakhlak mulia dan berbudi luhur, sehat sejahtera, maju dan mandiri, kesetaraan dan keadilan gender serta kesadaran hukum dan lingkungan.
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
            {programs.map((program, i) => {
              const Icon = program.icon;
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
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
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
              <CardDescription>Kegiatan PKK yang dilaksanakan secara berkala</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jadwalKegiatan.map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold mb-1">{item.kegiatan}</h4>
                      <p className="text-sm text-muted-foreground">{item.waktu}</p>
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
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Galeri Kegiatan</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <img
                  src={`https://picsum.photos/300/300?random=${i + 50}`}
                  alt={`Kegiatan ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Bergabung dengan PKK</h3>
              <p className="text-muted-foreground mb-6">
                Mari bergabung dan berkontribusi untuk kesejahteraan keluarga dan lingkungan
              </p>
              <Button size="lg">Daftar Sekarang</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}