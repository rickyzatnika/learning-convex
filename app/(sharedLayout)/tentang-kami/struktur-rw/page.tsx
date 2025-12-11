import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";

export default function StrukturRWPage() {
  const struktur = [
    { jabatan: "Ketua RW", nama: "Bapak Ahmad Suryanto", foto: 1 },
    { jabatan: "Wakil Ketua RW", nama: "Bapak Budi Santoso", foto: 2 },
    { jabatan: "Sekretaris", nama: "Ibu Siti Nurhaliza", foto: 3 },
    { jabatan: "Bendahara", nama: "Ibu Dewi Lestari", foto: 4 },
    { jabatan: "Seksi Keamanan", nama: "Bapak Eko Prasetyo", foto: 5 },
    { jabatan: "Seksi Kebersihan", nama: "Bapak Hadi Wijaya", foto: 6 },
    { jabatan: "Seksi Kesehatan", nama: "Ibu Rina Kartika", foto: 7 },
    { jabatan: "Seksi Sosial", nama: "Ibu Maya Sari", foto: 8 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Network className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Struktur Organisasi RW</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pengurus RW periode 2023-2026
          </p>
        </div>

        {/* Organizational Chart */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            {struktur.map((person, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                    <img
                      src={`https://i.pravatar.cc/150?u=${person.nama}`}
                      alt={person.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{person.jabatan}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{person.nama}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tentang Struktur Organisasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Struktur organisasi RW dirancang untuk memastikan pelayanan yang optimal kepada seluruh warga. 
                Setiap pengurus memiliki tugas dan tanggung jawab yang jelas dalam menjalankan program-program RW.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-semibold mb-2">Periode Kepengurusan</h3>
                  <p className="text-muted-foreground">2023 - 2026</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Jumlah Pengurus</h3>
                  <p className="text-muted-foreground">8 Orang</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Jumlah RT</h3>
                  <p className="text-muted-foreground">5 RT</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Jumlah KK</h3>
                  <p className="text-muted-foreground">250 Kepala Keluarga</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}