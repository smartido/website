import { getPosts } from "app/get-posts";
import { Posts } from "../../components/posts";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return <Posts posts={posts} />;
}
