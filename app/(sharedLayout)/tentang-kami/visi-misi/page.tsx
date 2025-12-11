import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye } from "lucide-react";

export default function VisiMisiPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Visi & Misi</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Komitmen kami untuk membangun lingkungan yang lebih baik
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 rounded-xl overflow-hidden">
          <img
            src="https://picsum.photos/1200/400?random=20"
            alt="Visi Misi"
            className="w-full h-[300px] object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Visi */}
          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="size-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Visi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg font-medium">
                "Mewujudkan Lingkungan RW yang Aman, Bersih, Sejahtera, dan Harmonis"
              </p>
              <p className="text-muted-foreground">
                Kami berkomitmen untuk menciptakan lingkungan yang nyaman dan kondusif bagi seluruh warga, 
                dengan mengutamakan keamanan, kebersihan, dan kesejahteraan bersama.
              </p>
            </CardContent>
          </Card>

          {/* Misi */}
          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="size-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span>Meningkatkan keamanan dan ketertiban lingkungan melalui sistem keamanan yang terorganisir</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span>Menjaga kebersihan dan kelestarian lingkungan dengan program pengelolaan sampah yang baik</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span>Meningkatkan kesejahteraan warga melalui program-program pemberdayaan masyarakat</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span>Membangun komunikasi dan kerjasama yang baik antar warga</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">5.</span>
                  <span>Memberikan pelayanan administrasi yang cepat dan efisien kepada warga</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Gotong Royong", desc: "Bekerja sama untuk kemajuan bersama" },
              { title: "Transparansi", desc: "Keterbukaan dalam setiap kegiatan" },
              { title: "Integritas", desc: "Konsisten dalam kata dan perbuatan" },
              { title: "Kepedulian", desc: "Peduli terhadap sesama warga" },
            ].map((value, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}