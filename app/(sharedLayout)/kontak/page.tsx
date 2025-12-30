import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kami siap membantu dan melayani kebutuhan warga
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-3">
                    Nama Lengkap
                  </Label>
                  <Input id="name" placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-3">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="nama@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-3">
                    Nomor Telepon
                  </Label>
                  <Input id="phone" type="tel" placeholder="08xx-xxxx-xxxx" />
                </div>
                <div>
                  <Label htmlFor="subject" className="mb-3">
                    Subjek
                  </Label>
                  <Input id="subject" placeholder="Subjek pesan" />
                </div>
                <div>
                  <Label htmlFor="message" className="mb-3">
                    Pesan
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 size-4" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Alamat Sekretariat</h4>
                    <p className="text-muted-foreground">
                      Jl. Contoh No. 123
                      <br />
                      Jakarta Selatan, DKI Jakarta
                      <br />
                      12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Telepon</h4>
                    <p className="text-muted-foreground">
                      +62 812-3456-7890
                      <br />
                      +62 21-1234567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      info@rw-example.com
                      <br />
                      sekretariat@rw-example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Jam Operasional</h4>
                    <p className="text-muted-foreground">
                      Senin - Jumat: 08.00 - 15.00 WIB
                      <br />
                      Sabtu: 08.00 - 12.00 WIB
                      <br />
                      Minggu & Libur: Tutup
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Lokasi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src="https://picsum.photos/600/400?random=100"
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Buka di Google Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Bagaimana cara mengurus surat keterangan domisili?",
                a: "Anda dapat datang langsung ke sekretariat RW dengan membawa fotocopy KTP dan KK, serta mengisi formulir permohonan. Surat akan selesai dalam 1 hari kerja.",
              },
              {
                q: "Kapan jadwal ronda malam?",
                a: "Ronda malam dilaksanakan setiap hari mulai pukul 22.00 - 05.00 WIB dengan sistem bergiliran per RT.",
              },
              {
                q: "Bagaimana cara bergabung dengan kegiatan PKK?",
                a: "Silakan hubungi Ketua PKK atau datang langsung saat kegiatan arisan PKK yang diadakan setiap minggu kedua.",
              },
              {
                q: "Dimana lokasi bank sampah?",
                a: "Bank sampah berlokasi di Balai RW dan buka setiap hari Sabtu pukul 08.00 - 12.00 WIB.",
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
