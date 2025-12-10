"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import moment from "moment";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateBlog from "@/components/web/createBlog";
import { X } from "lucide-react";

export default function BlogPages() {
  const data = useQuery(api.blogs.getBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/30 z-40 backdrop-blur">
          <CreateBlog setIsModalOpen={setIsModalOpen} />
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
      <div className="w-full py-12  px-4 md:px-12">
        <div className="flex justify-between w-full pb-3 border-b-2">
          <div>
            <h1 className="text-2xl font-bold">Blog List</h1>
            <p className="text-muted-foreground">
              Daftar blog yang ada di database Convex
            </p>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>Buat Blog</Button>
        </div>
        {!data && (
          <div className="w-full h-full flex pt-6 gap-2 items-center justify-start text-md ">
            <Spinner className="size-6" /> loading data...
          </div>
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 py-6 items-center justify-center antialiased">
          {data?.map((blog) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog._id}`}
              className="flex flex-col gap-2 bg-muted p-4 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-muted-foreground/20 transition-all duration-300"
            >
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <p className=" capitalize">Author : {blog.author}</p>
                <p className="px-2 py-0.5 rounded-full bg-green-100">
                  Created : {moment(blog._creationTime).fromNow()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
