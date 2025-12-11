"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/web/navbar";
import { Footer } from "@/components/web/footer";
import { SignUpForm } from "@/components/web/signUpForm";
import { X } from "lucide-react";
import { useState } from "react";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/30  z-50 backdrop-blur">
          <SignUpForm setIsModalOpen={setIsModalOpen} />
          <div className="absolute top-8 left-8">
            <Button
              className=""
              variant="destructive"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" /> Close
            </Button>
          </div>
        </div>
      )}
      <Navbar setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
