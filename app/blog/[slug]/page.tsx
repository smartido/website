import Post from "../../../components/post";
import { getPosts } from "app/get-posts";
import { allBlogs } from 'contentlayer/generated';

/*export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}*/

export default async function Blog() {
  const posts = await getPosts();

  return (
    <article className="mb-10">
      <Post posts={posts} />
    </article>
  );
}
