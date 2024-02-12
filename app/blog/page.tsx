import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import Views from './views';
import { Header } from 'components/header';
import { formatDate } from 'app/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
};

export default async function BlogPage() {
  return (
    <>
      <Header />

      <section>
        <h1 className="text-3xl font-medium mb-5">Blog</h1>
        <div className="space-y-10">
          {allBlogs
            .sort((a, b) => {
              if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="
                  group
                  block
                  overflow-hidden
                  rounded-2xl
                  p-8
                  transition
                  duration-300
                  border
                  bg-zinc-50
                  border-gray-200/50
                  hover:border-black
                  dark:bg-zinc-950
                  dark:border-gray-700/50
                  dark:hover:border-white"
                >
                <div>
                <h3 className="text-xl transition font-medium line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex flex-wrap space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="text-slate-500/30 dark:text-slate-400/30">·</span>
                  <Views slug={post.slug} trackView={false} />
                </div>
                <div className="mt-4 text-lg line-clamp-3 text-slate-800 dark:text-slate-200">
                  {post.summary}
                </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    </>
  );
}
