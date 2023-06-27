import { notFound } from 'next/navigation';
import { Mdx } from 'components/mdx';
import { allBlogs } from 'contentlayer/generated';
import { Header } from 'components/header';
import Views from '../views';

export default async function Blog({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) notFound();

  return (
    <>
      <Header />

      <section>
        <h1 className="text-3xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-tl from-black to-slate-500 dark:from-slate-500 dark:to-white">
          {post.title}
        </h1>
        <div className="mt-2 mb-7 flex space-x-2 text-slate-500 dark:text-slate-400">
          <span>{post.publishedAt}</span>
          <span className="text-slate-500/30 dark:text-slate-400/30">·</span>
          <Views slug={post.slug} trackView />
        </div>
        <Mdx post={post} />
      </section>
    </>
  );
}
