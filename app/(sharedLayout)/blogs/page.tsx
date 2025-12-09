"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function BlogPages() {
  const data = useQuery(api.blogs.getBlogs);

  return (
    <div>
      {data?.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>{blog.author}</p>
        </div>
      ))}
    </div>
  );
}
