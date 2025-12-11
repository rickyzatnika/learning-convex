"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdministrasiPage() {
  const layanan = useQuery(api.layanan.getServices);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Administrasi Kependudukan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Layanan pengurusan surat-surat kependudukan untuk warga
          </p>
        </div>

        {/* Info Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="size-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Jam Pelayanan</h3>
                  <p className="text-muted-foreground">
                    Senin - Jumat: 08.00 - 15.00 WIB
                    <br />
                    Sabtu: 08.00 - 12.00 WIB
                    <br />
                    Minggu & Hari Libur: Tutup
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Jenis Layanan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {layanan?.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{item.nama}</span>
                    <CheckCircle2 className="size-5 text-primary flex-shrink-0" />
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="size-4" />
                    Estimasi: {item.waktu}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2 text-sm">Persyaratan:</h4>
                  <ul className="space-y-1">
                    {item.persyaratan.map((req, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Procedure */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Prosedur Pengajuan</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Siapkan Persyaratan</h4>
                    <p className="text-muted-foreground text-sm">
                      Lengkapi semua dokumen yang diperlukan sesuai jenis surat
                      yang diajukan
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Datang ke Sekretariat
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Kunjungi sekretariat RW pada jam pelayanan dengan membawa
                      dokumen lengkap
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Isi Formulir</h4>
                    <p className="text-muted-foreground text-sm">
                      Lengkapi formulir permohonan yang disediakan dengan data
                      yang benar
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Tunggu Proses</h4>
                    <p className="text-muted-foreground text-sm">
                      Surat akan diproses sesuai estimasi waktu yang ditentukan
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    5
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Ambil Surat</h4>
                    <p className="text-muted-foreground text-sm">
                      Surat dapat diambil setelah proses selesai dengan
                      menunjukkan tanda terima
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg">Hubungi Kami untuk Informasi Lebih Lanjut</Button>
        </div>
      </div>
    </div>
  );
}
