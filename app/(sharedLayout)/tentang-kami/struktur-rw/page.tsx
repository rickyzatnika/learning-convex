"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";

function ProfileCard({
  jabatan,
  nama,
  avatarKey,
}: {
  jabatan: string;
  nama: string;
  avatarKey?: string | number;
}) {
  return (
    <Card className="text-center hover:shadow-lg transition-all">
      <CardHeader>
        <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-muted ring-2 ring-primary/20">
          <img
            src={`https://i.pravatar.cc/150?u=${avatarKey ?? nama}`}
            alt={nama}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-sm leading-tight">{jabatan}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium text-xs">{nama}</p>
      </CardContent>
    </Card>
  );
}

export default function StrukturRWPage() {
  const ketua = { jabatan: "Ketua RW", nama: "Bapak Ahmad Suryanto", foto: 1 };
  const wakil = { jabatan: "Wakil Ketua RW", nama: "Bapak Budi Santoso", foto: 2 };
  const sekretaris = { jabatan: "Sekretaris", nama: "Ibu Siti Nurhaliza", foto: 3 };
  const bendahara = { jabatan: "Bendahara", nama: "Ibu Dewi Lestari", foto: 4 };
  const seksi = [
    { jabatan: "Seksi Keamanan", nama: "Bapak Eko Prasetyo", foto: 5 },
    { jabatan: "Seksi Kebersihan", nama: "Bapak Hadi Wijaya", foto: 6 },
    { jabatan: "Seksi Kesehatan", nama: "Ibu Rina Kartika", foto: 7 },
    { jabatan: "Seksi Sosial", nama: "Ibu Maya Sari", foto: 8 },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const isMobile = width > 0 && width < 640;

  // width measurement
  useEffect(() => {
    const handleResize = () => setWidth(containerRef.current?.clientWidth ?? 0);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile: flatten to single column sequence
  const flatNodes = useMemo(
    () => [ketua, wakil, sekretaris, bendahara, ...seksi],
    []
  );

  // Desktop levels (used when !isMobile)
  const levels = useMemo(() => {
    const base = [
      [{ ...ketua }],
      [{ ...wakil }],
      [{ ...sekretaris }, { ...bendahara }],
      [...seksi],
    ];
    return base;
  }, []);

  // Sizing
  const topPad = 24;
  const { nodeW, nodeH, vGap, strokeW, dashArray } = useMemo(() => {
    if (isMobile) {
      return { nodeW: 320, nodeH: 140, vGap: 48, strokeW: 3, dashArray: "10 6" };
    }
    if (width < 768) {
      return { nodeW: 180, nodeH: 150, vGap: 150, strokeW: 3, dashArray: "10 6" };
    }
    return { nodeW: 200, nodeH: 160, vGap: 140, strokeW: 3, dashArray: "10 6" };
  }, [width, isMobile]);

  type Point = { x: number; y: number };
  type NodePos = { id: string; center: Point; topLeft: Point };

  // Desktop positions
  const positions: NodePos[][] = useMemo(() => {
    if (!width || isMobile) return [];
    return levels.map((nodes, lvl) => {
      const count = nodes.length;
      return nodes.map((_, i) => {
        const basePad = width < 640 ? 20 : 12;
        const hPad = Math.max(basePad, Math.min(40, width / 16));
        const usableW = Math.max(0, width - hPad * 2);
        const cx = hPad + ((i + 1) / (count + 1)) * usableW;
        const cy = topPad + lvl * (nodeH + vGap) + nodeH / 2;
        return {
          id: `${lvl}-${i}`,
          center: { x: cx, y: cy },
          topLeft: { x: cx - nodeW / 2, y: cy - nodeH / 2 },
        };
      });
    });
  }, [width, levels, nodeW, nodeH, vGap, isMobile]);

  // Desktop edges
  const edges = useMemo(() => {
    if (positions.length === 0) return [] as { from: Point; to: Point }[];
    const list: { from: Point; to: Point }[] = [];
    const push = (a: Point, b: Point) => list.push({ from: a, to: b });

    if (positions[0]?.[0] && positions[1]?.[0])
      push(positions[0][0].center, positions[1][0].center);
    if (positions[1]?.[0] && positions[2])
      positions[2].forEach((p) => push(positions[1][0].center, p.center));
    if (positions[1]?.[0] && positions[3])
      positions[3].forEach((p) => push(positions[1][0].center, p.center));

    return list;
  }, [positions]);

  // Height for desktop SVG
  const svgH = isMobile
    ? flatNodes.length * (nodeH + vGap) + topPad
    : topPad + (levels.length - 1) * (nodeH + vGap) + nodeH + 32;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Network className="size-6 sm:size-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Struktur Organisasi RW
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Pengurus RW periode 2023-2026
          </p>
        </div>

        {/* Mobile: simple vertical column */}
        {isMobile ? (
          <div ref={containerRef} className="mx-auto w-full max-w-xl mb-12 px-2">
            {flatNodes.map((n, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full">
                  <ProfileCard jabatan={n.jabatan} nama={n.nama} avatarKey={n.foto} />
                </div>
                {i < flatNodes.length - 1 && (
                  <svg className="my-4" width="8" height="48" viewBox="0 0 8 48">
                    <path
                      d="M4 0 L4 48"
                      stroke="hsl(142.1 70.6% 45.3%)"
                      strokeWidth={strokeW}
                      strokeDasharray={dashArray}
                      style={{ animation: "dash 2.5s linear infinite", strokeDashoffset: 140 }}
                    />
                  </svg>
                )}
              </div>
            ))}
            <style>{`
              @keyframes dash { to { stroke-dashoffset: 0; } }
            `}</style>
          </div>
        ) : (
          // Desktop: custom SVG org chart
          <div
            ref={containerRef}
            className="relative w-full max-w-6xl mx-auto mb-12 rounded-lg bg-background/30 overflow-x-auto sm:overflow-x-visible"
            style={{ height: svgH, width: "100%" }}
          >
            {/* Animated green connector paths */}
            <svg className="absolute inset-0 w-full h-full">
              {edges.map((e, idx) => {
                const midY = (e.from.y + e.to.y) / 2;
                const d = `M ${e.from.x},${e.from.y} C ${e.from.x},${midY} ${e.to.x},${midY} ${e.to.x},${e.to.y}`;
                return (
                  <path
                    key={idx}
                    d={d}
                    stroke="hsl(142.1 70.6% 45.3%)" /* Tailwind green-600 */
                    strokeWidth={strokeW}
                    fill="none"
                    className="opacity-90"
                    style={{
                      strokeDasharray: dashArray,
                      animation: "dash 2.5s linear infinite",
                    }}
                  />
                );
              })}
              <style>{`
                @keyframes dash {
                  0% { stroke-dashoffset: 140; }
                  100% { stroke-dashoffset: 0; }
                }
              `}</style>
            </svg>

            {/* Node cards */}
            {positions.map((row, lvl) =>
              row.map((pos, i) => (
                <div
                  key={`${lvl}-${i}`}
                  className="absolute transition-transform duration-200 will-change-transform"
                  style={{
                    left: pos.topLeft.x,
                    top: pos.topLeft.y,
                    width: nodeW,
                    height: nodeH,
                  }}
                >
                  <ProfileCard
                    jabatan={levels[lvl][i].jabatan}
                    nama={levels[lvl][i].nama}
                    avatarKey={(levels[lvl][i] as any).foto}
                  />
                </div>
              ))
            )}
          </div>
        )}

        {/* Additional Info */}
        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tentang Struktur Organisasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Struktur organisasi RW dirancang untuk memastikan pelayanan yang
                optimal kepada seluruh warga. Setiap pengurus memiliki tugas dan
                tanggung jawab yang jelas dalam menjalankan program-program RW.
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
