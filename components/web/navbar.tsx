"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ModeToggle } from "./darkmodeToggle";
import { useEffect, useState } from "react";
import { useConvexAuth } from "convex/react";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

export function Navbar({
  setIsModalOpen,
  isModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
  isModalOpen: boolean;
}) {
  const router = useRouter();

  // onScroll
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full flex items-center justify-between h-24 py-6 px-4 md:px-14 lg:px-28 transition-all duration-300 ease-in-out  ${
        isScrolled
          ? "bg-accent/50 backdrop-blur-sm fixed top-0 z-40 shadow-md "
          : " bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-14">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ubernoize-logo"
            width={50}
            height={25}
            priority={true}
            className="object-contain"
          />
        </Link>
        <ul className={`flex gap-8 ${isScrolled ? "text-accent" : ""}`}>
          <li className="text-lg text-muted-foreground ">
            <Link href="/">Home</Link>
          </li>

          <li className="text-lg text-muted-foreground ">
            <Link href="/about">About</Link>
          </li>

          <li className="text-lg text-muted-foreground  ">
            <Link href="/create">Create</Link>
          </li>

          <li className="text-lg text-muted-foreground ">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 ">
        {isLoading ? (
          <Button disabled>
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
          >
            Logout
          </Button>
        ) : (
          <Button onClick={() => setIsModalOpen(true)} variant="default">
            Login
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
