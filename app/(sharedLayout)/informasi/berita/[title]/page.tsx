"use cache";

import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import moment from "moment";
import { createSlug, slugToTitle } from "@/lib/utils";

// Generate static params untuk pre-rendering
export async function generateStaticParams() {
  const news = await fetchQuery(api.news.getNews);

  return news.map((news) => ({
    title: createSlug(news.title),
  }));
}

// Server component dengan data fetching
export default async function DetailNewsPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  // Convert slug back to title format for database query
  const titleFromSlug = slugToTitle(title);

  const news = await fetchQuery(api.news.getNewsByTitleCaseInsensitive, {
    title: titleFromSlug,
  });

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <div className="w-full pt-14  md:pt-32 px-4">
      <article className="py-8">
        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>

        <div className="flex gap-4 text-sm text-muted-foreground mb-8">
          <p className="capitalize">Author: {news.author}</p>
          <p className="px-4 py-0.5 rounded-full bg-green-100">
            Created: {moment(news._creationTime).fromNow()}
          </p>
        </div>

        <div className="prose prose-lg">
          <p>{news.content}</p>
        </div>
      </article>
    </div>
  );
}
