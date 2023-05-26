import { NextResponse } from "next/server";
import { getPosts } from "app/get-posts";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPosts());
};
