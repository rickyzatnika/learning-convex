"use cache";

import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import moment from "moment";

// Generate static params untuk pre-rendering
export async function generateStaticParams() {
  const blogs = await fetchQuery(api.blogs.getBlogs);

  return blogs.map((blog) => ({
    _id: blog._id,
  }));
}

// Server component dengan data fetching
export default async function DetailBlogsPage({
  params,
}: {
  params: Promise<{ _id: Id<"blogs"> }>;
}) {
  const { _id } = await params;

  const blog = await fetchQuery(api.blogs.getBlogById, {
    id: _id,
  });

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="w-full py-12 px-4">
      <article className="">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex gap-4 text-sm text-muted-foreground mb-8">
          <p className="capitalize">Author: {blog.author}</p>
          <p className="px-2 py-0.5 rounded-full bg-green-100">
            Created: {moment(blog._creationTime).fromNow()}
          </p>
        </div>

        <div className="prose prose-lg">
          <p>{blog.content}</p>
        </div>
      </article>
    </div>
  );
}
