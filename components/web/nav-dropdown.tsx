"use client";

import Link from "next/link";
import { ChevronDown, LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface NavDropdownItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  isScrolled?: boolean;
}

export function NavDropdown({ label, items, isScrolled }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-1  text-base text-muted-foreground hover:text-foreground transition-colors outline-hidden group"
      >
        {label}
        <ChevronDown
          className={`size-4 transition-transform  duration-300 ${isOpen ? "rotate-180 " : "rotate-0"}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[240px] origin-center p-3"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild className="text-md">
              <Link
                href={item.href}
                className="cursor-pointer flex items-center gap-4"
              >
                <span className="p-2 bg-zinc-50 rounded-full shadow-sm">
                  <Icon className="size-4 text-green-500" />
                </span>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
