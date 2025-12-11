import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Phone, Camera, Users, Clock } from "lucide-react";

export default function KeamananPage() {
  const programs = [
    {
      icon: Users,
      title: "Ronda Malam",
      description: "Patroli keamanan setiap malam oleh warga secara bergiliran",
      jadwal: "Setiap hari, 22.00 - 05.00 WIB",
    },
    {
      icon: Camera,
      title: "CCTV Monitoring",
      description: "Sistem CCTV di titik-titik strategis untuk pemantauan 24 jam",
      jadwal: "Aktif 24/7",
    },
    {
      icon: Shield,
      title: "Pos Keamanan",
      description: "Pos jaga di pintu masuk kompleks dengan petugas yang siaga",
      jadwal: "Aktif 24/7",
    },
    {
      icon: Phone,
      title: "Hotline Darurat",
      description: "Nomor darurat yang dapat dihubungi kapan saja",
      jadwal: "Siaga 24/7",
    },
  ];

  const jadwalRonda = [
    { hari: "Senin", rt: "RT 001", petugas: "5 Orang" },
    { hari: "Selasa", rt: "RT 002", petugas: "5 Orang" },
    { hari: "Rabu", rt: "RT 003", petugas: "5 Orang" },
    { hari: "Kamis", rt: "RT 004", petugas: "5 Orang" },
    { hari: "Jumat", rt: "RT 005", petugas: "5 Orang" },
    { hari: "Sabtu", rt: "RT 001 & 002", petugas: "6 Orang" },
    { hari: "Minggu", rt: "RT 003 & 004", petugas: "6 Orang" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Keamanan Wilayah</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sistem keamanan terpadu untuk kenyamanan dan ketenangan warga
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Phone className="size-8 text-destructive" />
                  <div>
                    <h3 className="font-semibold text-lg">Nomor Darurat</h3>
                    <p className="text-2xl font-bold text-destructive">0812-3456-7890</p>
                  </div>
                </div>
                <Button variant="destructive" size="lg">
                  <Phone className="mr-2 size-5" />
                  Hubungi Sekarang
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programs */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Program Keamanan</h2>
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
                      <Clock className="size-4" />
                      {program.jadwal}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Jadwal Ronda */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Ronda Malam</CardTitle>
              <CardDescription>Jadwal patroli keamanan per RT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Hari</th>
                      <th className="text-left py-3 px-4">RT Bertugas</th>
                      <th className="text-left py-3 px-4">Jumlah Petugas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jadwalRonda.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{item.hari}</td>
                        <td className="py-3 px-4">{item.rt}</td>
                        <td className="py-3 px-4">{item.petugas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tips Keamanan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Selalu kunci pintu dan jendela rumah, terutama saat tidur atau bepergian</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Laporkan segera jika melihat orang atau aktivitas mencurigakan</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Jangan memberikan informasi pribadi kepada orang yang tidak dikenal</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Simpan nomor darurat di tempat yang mudah dijangkau</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Ikuti jadwal ronda sesuai giliran untuk menjaga keamanan bersama</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Pasang penerangan yang cukup di area rumah</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}