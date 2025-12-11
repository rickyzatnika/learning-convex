import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function PengurusRTPage() {
  const rtData = [
    {
      rt: "RT 001",
      ketua: "Bapak Joko Widodo",
      sekretaris: "Ibu Ani Yudhoyono",
      bendahara: "Bapak Susilo Bambang",
      jumlahKK: 50,
    },
    {
      rt: "RT 002",
      ketua: "Bapak Prabowo Subianto",
      sekretaris: "Ibu Megawati Soekarno",
      bendahara: "Bapak Jusuf Kalla",
      jumlahKK: 48,
    },
    {
      rt: "RT 003",
      ketua: "Bapak Anies Baswedan",
      sekretaris: "Ibu Tri Rismaharini",
      bendahara: "Bapak Ganjar Pranowo",
      jumlahKK: 52,
    },
    {
      rt: "RT 004",
      ketua: "Bapak Ridwan Kamil",
      sekretaris: "Ibu Khofifah Indar",
      bendahara: "Bapak Erick Thohir",
      jumlahKK: 45,
    },
    {
      rt: "RT 005",
      ketua: "Bapak Sandiaga Uno",
      sekretaris: "Ibu Retno Marsudi",
      bendahara: "Bapak Airlangga Hartarto",
      jumlahKK: 55,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pengurus RT</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Daftar pengurus RT di lingkungan RW kami
          </p>
        </div>

        {/* RT Cards */}
        <div className="max-w-6xl mx-auto space-y-6">
          {rtData.map((rt, i) => (
            <Card
              key={i}
              className="hover:shadow-lg transition-shadow text-center"
            >
              <CardHeader className="bg-primary/5 py-4 relative -top-6">
                <CardTitle className="text-2xl">{rt.rt}</CardTitle>
                <p className="text-muted-foreground">
                  Jumlah KK: {rt.jumlahKK} Kepala Keluarga
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-muted">
                      <img
                        src={`https://i.pravatar.cc/150?u=${rt.ketua}`}
                        alt={rt.ketua}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-sm text-muted-foreground mb-1">
                      Ketua RT
                    </p>
                    <p className="font-medium">{rt.ketua}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-muted">
                      <img
                        src={`https://i.pravatar.cc/150?u=${rt.sekretaris}`}
                        alt={rt.sekretaris}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-sm text-muted-foreground mb-1">
                      Sekretaris
                    </p>
                    <p className="font-medium">{rt.sekretaris}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-muted">
                      <img
                        src={`https://i.pravatar.cc/150?u=${rt.bendahara}`}
                        alt={rt.bendahara}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-sm text-muted-foreground mb-1">
                      Bendahara
                    </p>
                    <p className="font-medium">{rt.bendahara}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary mb-2">5</p>
                  <p className="text-muted-foreground">Total RT</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary mb-2">15</p>
                  <p className="text-muted-foreground">Total Pengurus</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary mb-2">250</p>
                  <p className="text-muted-foreground">Total KK</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
