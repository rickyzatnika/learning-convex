import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Trash2, Recycle, Calendar, MapPin } from "lucide-react";

export default function KebersihanPage() {
  const programs = [
    {
      icon: Trash2,
      title: "Pengangkutan Sampah",
      description: "Pengambilan sampah rumah tangga secara rutin",
      jadwal: "Senin, Rabu, Jumat (06.00 - 08.00)",
    },
    {
      icon: Recycle,
      title: "Bank Sampah",
      description: "Program daur ulang sampah untuk mengurangi limbah",
      jadwal: "Setiap Sabtu (08.00 - 12.00)",
    },
    {
      icon: Leaf,
      title: "Gotong Royong",
      description: "Kerja bakti bersama membersihkan lingkungan",
      jadwal: "Minggu pertama setiap bulan",
    },
    {
      icon: MapPin,
      title: "TPS Terpadu",
      description: "Tempat Pembuangan Sampah Sementara yang terkelola",
      jadwal: "Buka 24/7",
    },
  ];

  const jadwalPengangkutan = [
    { area: "RT 001 & RT 002", hari: "Senin, Rabu, Jumat", waktu: "06.00 - 07.00" },
    { area: "RT 003 & RT 004", hari: "Senin, Rabu, Jumat", waktu: "07.00 - 08.00" },
    { area: "RT 005", hari: "Selasa, Kamis, Sabtu", waktu: "06.00 - 07.00" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kebersihan Lingkungan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Program kebersihan untuk lingkungan yang sehat dan nyaman
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden">
          <img
            src="https://picsum.photos/1200/400?random=30"
            alt="Kebersihan"
            className="w-full h-[300px] object-cover"
          />
        </div>

        {/* Programs */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Program Kebersihan</h2>
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="size-4" />
                      {program.jadwal}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Jadwal Pengangkutan */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Pengangkutan Sampah</CardTitle>
              <CardDescription>Pastikan sampah sudah dikeluarkan sebelum waktu pengangkutan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jadwalPengangkutan.map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold mb-1">{item.area}</h4>
                      <p className="text-sm text-muted-foreground">{item.hari}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <Calendar className="size-4" />
                        {item.waktu}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jenis Sampah */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Pemilahan Sampah</CardTitle>
              <CardDescription>Mari memilah sampah untuk lingkungan yang lebih baik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Recycle className="size-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Sampah Organik</h4>
                  <p className="text-sm text-muted-foreground">
                    Sisa makanan, daun, ranting
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Recycle className="size-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Sampah Anorganik</h4>
                  <p className="text-sm text-muted-foreground">
                    Plastik, kertas, kaleng, botol
                  </p>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-lg">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trash2 className="size-8 text-red-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Sampah B3</h4>
                  <p className="text-sm text-muted-foreground">
                    Baterai, lampu, obat kadaluarsa
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tips Menjaga Kebersihan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Buang sampah pada tempatnya dan sesuai jenisnya</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Keluarkan sampah sesuai jadwal pengangkutan</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Kurangi penggunaan plastik sekali pakai</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Ikuti program bank sampah untuk daur ulang</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Jaga kebersihan selokan dan saluran air</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Partisipasi aktif dalam kegiatan gotong royong</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg">Daftar Bank Sampah</Button>
        </div>
      </div>
    </div>
  );
}