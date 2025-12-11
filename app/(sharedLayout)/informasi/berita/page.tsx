"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Calendar, User } from "lucide-react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import moment from "moment";
import { createSlug } from "@/lib/utils";

export default function BeritaPage() {
  const berita = useQuery(api.news.getNews);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Berita & Kegiatan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan dan program di lingkungan RW
          </p>
        </div>

        {/* News Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Berita Lainnya</h2>
          <div className="grid md:grid-cols-3 gap-6 ">
            {berita?.map((item) => (
              <Link
                href={`/informasi/berita/${createSlug(item.title)}`}
                key={item._id}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all hover:scale-105 duration-300 cursor-pointer">
                  <img
                    src={`https://picsum.photos/400/250?random=${item.image + 10}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="group flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {moment(item._creationTime).format("DD MMM YYYY")}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="size-3" />
                        {item.author}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="p-0 ">
                      Baca selengkapnya{" "}
                      <span className="transition-transform duration-300 group-hover:translate-x-3">
                        →
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Muat Lebih Banyak Berita
          </Button>
        </div>
      </div>
    </div>
  );
}
