"use client";

import moment from "moment";
import { api } from "@/convex/_generated/api";
import { createSlug } from "@/lib/utils";
import { Calendar, User } from "lucide-react";
import { useQuery } from "convex/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const NewsGrid = () => {
  const berita = useQuery(api.news.getNews);

  const latest = berita?.slice(0, 3) || [];

  return (
    <div className="grid md:grid-cols-3 gap-6 ">
      {latest.map((item) => (
        <Link
          href={`/informasi/berita/${createSlug(item.title)}`}
          key={item._id}
        >
          <Card className="group overflow-hidden hover:shadow-lg transition-all hover:scale-105 duration-300 cursor-pointer">
            <Image
              src={item.imageUrl || ""}
              alt={item.title}
              className="w-full h-48 object-cover"
              width={400}
              height={250}
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
  );
};

export default NewsGrid;
