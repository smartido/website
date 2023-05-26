export const runtime = "edge";

import { queryBuilder } from "lib/planetscale";
import { allBlogs } from "contentlayer/generated";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? null;
  
  if (slug === null) {
    return NextResponse.json(
      {
        error: {
          message: 'Missing "slug" query',
          code: "MISSING_SLUG",
        },
      },
      { status: 400 }
    );
  }

  const post = allBlogs.find((post) => post.slug === slug);

  if (post == null) {
    return NextResponse.json(
      {
        error: {
          message: "Unknown post",
          code: "UNKNOWN_POST",
        },
      },
      { status: 400 }
    );
  }
  
  if (url.searchParams.get("incr") != null) {
    const data = await queryBuilder
      .selectFrom("views")
      .where("slug", "=", slug)
      .select(["count"])
      .execute();

    const views = !data.length ? 0 : Number(data[0].count);
    
    await queryBuilder
      .insertInto("views")
      .values({ slug, count: 1 })
      .onDuplicateKeyUpdate({ count: views + 1 })
      .execute();

    return NextResponse.json({
      ...post,
      views: views + 1,
    });

  } else {
    const data = await queryBuilder
      .selectFrom("views")
      .where("slug", "=", slug)
      .select(["count"])
      .execute();

    const views = !data.length ? 0 : Number(data[0].count);

    return NextResponse.json({
      ...post,
      views: views,
    });
  }
}
