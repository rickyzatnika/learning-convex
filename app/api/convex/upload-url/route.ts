import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchAction } from "convex/nextjs";

export async function GET() {
  const { uploadUrl } = await fetchAction(api.files.generateUploadUrl, {} as any);
  return NextResponse.json({ uploadUrl });
}
