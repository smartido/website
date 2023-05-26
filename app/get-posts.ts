import { allBlogs } from "contentlayer/generated";
import { queryBuilder } from "lib/planetscale";

export type Post = {
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  views: number;
};

export const getPosts = async () => {
  const allViews = await queryBuilder
    .selectFrom("views")
    .select(["slug", "count"])
    .execute();  

  const posts = allBlogs.map((post) => {
    let data = allViews.find(o => o.slug === post.slug);
    let views = data?.count ?? 0;

    return {
      ...post,
      views: views,
    }
  })

  return posts;
};
