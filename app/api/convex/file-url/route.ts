import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery, fetchAction } from "convex/nextjs";

export async function GET(req: NextRequest) {
  const storageId = req.nextUrl.searchParams.get("storageId");
  if (!storageId) return NextResponse.json({ error: "missing storageId" }, { status: 400 });
  const { url } = await fetchAction(api.files.getFileUrl, { storageId });
  const redirect = req.nextUrl.searchParams.get("redirect");
  if (redirect === "1" && url) {
    return NextResponse.redirect(url);
  }
  return NextResponse.json({ url });
}
