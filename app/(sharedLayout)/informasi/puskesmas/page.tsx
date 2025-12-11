import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Phone,
  MapPin,
  Clock,
  Stethoscope,
  Pill,
  Baby,
} from "lucide-react";

export default function PuskesmasPage() {
  const layanan = [
    {
      icon: Stethoscope,
      title: "Pemeriksaan Umum",
      description: "Konsultasi dan pemeriksaan kesehatan umum",
      jadwal: "Senin - Sabtu, 08.00 - 14.00",
    },
    {
      icon: Baby,
      title: "Kesehatan Ibu & Anak",
      description: "Layanan kesehatan ibu hamil, bayi, dan balita",
      jadwal: "Setiap hari, 08.00 - 12.00",
    },
    {
      icon: Pill,
      title: "Apotek",
      description: "Penyediaan obat-obatan dan resep dokter",
      jadwal: "Senin - Sabtu, 08.00 - 15.00",
    },
  ];

  const fasilitasKesehatan = [
    {
      nama: "Puskesmas Kecamatan",
      alamat: "Jl. Kesehatan No. 45, Jakarta Selatan",
      telepon: "021-1234567",
      jarak: "500 meter",
    },
    {
      nama: "Klinik Pratama Sehat",
      alamat: "Jl. Sejahtera No. 12, Jakarta Selatan",
      telepon: "021-7654321",
      jarak: "800 meter",
    },
    {
      nama: "RS Umum Harapan",
      alamat: "Jl. Harapan Raya No. 100, Jakarta Selatan",
      telepon: "021-9876543",
      jarak: "2 km",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Informasi Puskesmas & Kesehatan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Informasi layanan kesehatan terdekat untuk warga
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Phone className="size-8 text-destructive" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      Nomor Darurat Kesehatan
                    </h3>
                    <p className="text-2xl font-bold text-destructive">
                      119 / 021-1234567
                    </p>
                  </div>
                </div>
                <Button variant="destructive" size="lg">
                  <Phone className="mr-2 size-5" />
                  Hubungi Ambulans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Layanan */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Layanan Kesehatan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {layanan.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      {item.jadwal}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Fasilitas Kesehatan Terdekat */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Fasilitas Kesehatan Terdekat
          </h2>
          <div className="space-y-4">
            {fasilitasKesehatan.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.nama}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="size-4 flex-shrink-0 mt-1" />
                          <span className="text-sm">{item.alamat}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="size-4" />
                          <span className="text-sm">{item.telepon}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {item.jarak}
                      </span>
                      <Button variant="outline" size="sm">
                        Lihat Peta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Jadwal Posyandu */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Posyandu</CardTitle>
              <CardDescription>
                Pelayanan kesehatan ibu dan anak di lingkungan RW
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    posyandu: "Posyandu Melati (RT 001)",
                    jadwal: "Rabu Minggu ke-1, 08.00 - 11.00",
                  },
                  {
                    posyandu: "Posyandu Mawar (RT 002)",
                    jadwal: "Rabu Minggu ke-2, 08.00 - 11.00",
                  },
                  {
                    posyandu: "Posyandu Anggrek (RT 003)",
                    jadwal: "Rabu Minggu ke-3, 08.00 - 11.00",
                  },
                  {
                    posyandu: "Posyandu Dahlia (RT 004)",
                    jadwal: "Rabu Minggu ke-4, 08.00 - 11.00",
                  },
                  {
                    posyandu: "Posyandu Kenanga (RT 005)",
                    jadwal: "Kamis Minggu ke-1, 08.00 - 11.00",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold mb-1">{item.posyandu}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.jadwal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Kesehatan */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tips Hidup Sehat</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    Rutin melakukan pemeriksaan kesehatan minimal 6 bulan sekali
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    Konsumsi makanan bergizi seimbang dan perbanyak sayur serta
                    buah
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Olahraga teratur minimal 30 menit setiap hari</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Istirahat yang cukup 7-8 jam per hari</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Jaga kebersihan diri dan lingkungan</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Hindari rokok dan minuman beralkohol</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
