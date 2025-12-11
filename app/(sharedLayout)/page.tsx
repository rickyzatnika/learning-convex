import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Shield,
  Leaf,
  FileText,
  Heart,
  Building2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/1920/600?random=1"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <h1 className="text-5xl md:text-6xl font-bold ">
              Selamat Datang di
            </h1>
            <Image
              src="/logo_.png"
              alt="Logo"
              width={130}
              height={130}
              className="object-contain w-[150px] h-[150px] md:w-[130px] md:h-[130px]"
              priority
            />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Membangun Komunitas yang Lebih Baik, Aman, dan Sejahtera
            Bersama-sama
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/layanan/administrasi">
                Layanan Kami
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tentang-kami/visi-misi">Tentang Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Berbagai layanan untuk memenuhi kebutuhan warga
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="size-6 text-primary" />
                </div>
                <CardTitle>Administrasi Kependudukan</CardTitle>
                <CardDescription>
                  Pengurusan surat-surat kependudukan dan administrasi warga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link href="/layanan/administrasi">
                    Selengkapnya <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="size-6 text-primary" />
                </div>
                <CardTitle>Keamanan Wilayah</CardTitle>
                <CardDescription>
                  Sistem keamanan dan ketertiban lingkungan yang terjaga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link href="/layanan/keamanan">
                    Selengkapnya <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="size-6 text-primary" />
                </div>
                <CardTitle>Kebersihan Lingkungan</CardTitle>
                <CardDescription>
                  Program kebersihan dan pengelolaan sampah yang terorganisir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link href="/layanan/kebersihan">
                    Selengkapnya <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Berita Terkini</h2>
            <p className="text-muted-foreground text-lg">
              Informasi dan kegiatan terbaru di lingkungan kita
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={`https://picsum.photos/400/250?random=${i + 10}`}
                  alt={`Berita ${i}`}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    Kegiatan Gotong Royong Minggu Ini
                  </CardTitle>
                  <CardDescription>15 Desember 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    Warga RW berkumpul untuk melakukan gotong royong
                    membersihkan lingkungan dan memperindah taman...
                  </p>
                  <Button variant="link" asChild className="p-0">
                    <Link href="/informasi/berita">
                      Baca selengkapnya <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="size-8 text-primary" />
                </div>
                <CardTitle>PKK</CardTitle>
                <CardDescription>
                  Program Pemberdayaan Kesejahteraan Keluarga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="/informasi/pkk">Lihat Program</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="size-8 text-primary" />
                </div>
                <CardTitle>Puskesmas</CardTitle>
                <CardDescription>
                  Informasi layanan kesehatan terdekat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="/informasi/puskesmas">Info Kesehatan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="size-8 text-primary" />
                </div>
                <CardTitle>Posyandu</CardTitle>
                <CardDescription>
                  Layanan kesehatan ibu dan anak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="/informasi/puskesmas">Jadwal Posyandu</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Hubungi Kami</h2>
              <p className="text-muted-foreground text-lg">
                Kami siap membantu dan melayani kebutuhan warga
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Alamat</CardTitle>
                  <CardDescription>
                    Jl. Contoh No. 123, Jakarta Selatan
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Telepon</CardTitle>
                  <CardDescription>+62 812-3456-7890</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Email</CardTitle>
                  <CardDescription>info@rw-example.com</CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" asChild>
                <Link href="/kontak">Kirim Pesan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
