"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Portal RW</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Membangun komunitas yang lebih baik, aman, dan sejahtera
              bersama-sama untuk masa depan yang lebih cerah.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-9 h-9 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="size-4 text-primary" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="size-4 text-primary" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="size-4 text-primary" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-kami/visi-misi"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-kami/struktur-rw"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Struktur RW
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi/berita"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-bold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/layanan/administrasi"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Administrasi Kependudukan
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan/keamanan"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Keamanan Wilayah
                </Link>
              </li>
              <li>
                <Link
                  href="/layanan/kebersihan"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kebersihan Lingkungan
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi/pkk"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  PKK
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi/puskesmas"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Puskesmas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Jl. Contoh No. 123
                  <br />
                  Jakarta Selatan, 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +62 812-3456-7890
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  info@rw-example.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sub Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Portal RW. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Syarat & Ketentuan
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
