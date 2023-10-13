import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'components/mdx';
import { allBlogs } from 'contentlayer/generated';
import { Header } from 'components/header';
import Views from '../views';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  
  const ogImage = `https://smartido.dev/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://smartido.dev/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string) {
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('ca-es', {
    month: 'short',
    year: 'numeric',
  });

  return `${fullDate}`;
}

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
          <span>{formatDate(post.publishedAt)}</span>
          <span className="text-slate-500/30 dark:text-slate-400/30">·</span>
          <Views slug={post.slug} trackView />
        </div>
        <Mdx post={post} />
      </section>
    </>
  );
}
