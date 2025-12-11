"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./darkmodeToggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { NavDropdown } from "./nav-dropdown";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import {
  Menu,
  X,
  Target,
  Network,
  Users,
  FileText,
  Shield,
  Leaf,
  Newspaper,
  Heart,
  Building2,
} from "lucide-react";
import { useState } from "react";

// Navigation menu data
const tentangKamiItems = [
  { label: "Visi & Misi", href: "/tentang-kami/visi-misi", icon: Target },
  { label: "Struktur RW", href: "/tentang-kami/struktur-rw", icon: Network },
  { label: "Pengurus RT", href: "/tentang-kami/pengurus-rt", icon: Users },
];

const layananItems = [
  {
    label: "Administrasi Kependudukan",
    href: "/layanan/administrasi",
    icon: FileText,
  },
  { label: "Keamanan Wilayah", href: "/layanan/keamanan", icon: Shield },
  { label: "Kebersihan Lingkungan", href: "/layanan/kebersihan", icon: Leaf },
];

const informasiItems = [
  { label: "Berita", href: "/informasi/berita", icon: Newspaper },
  { label: "PKK", href: "/informasi/pkk", icon: Heart },
  { label: "Puskesmas", href: "/informasi/puskesmas", icon: Building2 },
];

export function Navbar({
  setIsModalOpen,
  isModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
  isModalOpen: boolean;
}) {
  const router = useRouter();
  const { isScrolled, isVisible } = useScrollDirection();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-2 md:px-8 transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      } ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo_.png"
          alt="logo-rw-6"
          width={75}
          height={50}
          priority={true}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-8">
        <li>
          <Link
            href="/"
            className="text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Beranda
          </Link>
        </li>

        <li>
          <NavDropdown
            label="Tentang Kami"
            items={tentangKamiItems}
            isScrolled={isScrolled}
          />
        </li>

        <li>
          <NavDropdown
            label="Layanan"
            items={layananItems}
            isScrolled={isScrolled}
          />
        </li>

        <li>
          <NavDropdown
            label="Informasi"
            items={informasiItems}
            isScrolled={isScrolled}
          />
        </li>

        <li>
          <Link
            href="/kontak"
            className="text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Kontak
          </Link>
        </li>
      </ul>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <Button disabled size="sm">
              <Spinner /> Loading...
            </Button>
          ) : isAuthenticated ? (
            <Button
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success("Berhasil keluar.");
                      router.push("/");
                    },
                    onError: (error) => {
                      toast.error(error.error.message);
                    },
                  },
                })
              }
              variant="secondary"
              size="sm"
            >
              Logout
            </Button>
          ) : (
            <Button onClick={() => setIsModalOpen(true)} size="sm">
              Login
            </Button>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-t md:hidden shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </Link>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Tentang Kami
              </p>
              <div className="pl-4 space-y-2">
                {tentangKamiItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Layanan</p>
              <div className="pl-4 space-y-2">
                {layananItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Informasi</p>
              <div className="pl-4 space-y-2">
                {informasiItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/kontak"
              className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontak
            </Link>

            <div className="flex items-center gap-3 pt-4 border-t">
              {isLoading ? (
                <Button disabled className="w-full">
                  <Spinner /> Loading...
                </Button>
              ) : isAuthenticated ? (
                <Button
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success("Berhasil keluar.");
                          router.push("/");
                          setMobileMenuOpen(false);
                        },
                        onError: (error) => {
                          toast.error(error.error.message);
                        },
                      },
                    });
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1"
                >
                  Login
                </Button>
              )}
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
