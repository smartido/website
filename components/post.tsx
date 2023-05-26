"use client";

import { useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import useSWR from "swr";
import { Mdx } from "components/mdx";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Post({ posts }) {
  const params = useParams();

  const initialPost = posts.find(post => post.slug === params.slug);

  const { data: post, mutate } = useSWR(
    `/api/views?slug=${encodeURIComponent(initialPost?.slug ?? "")}`,
    fetcher,
    {
      fallbackData: initialPost,
      refreshInterval: 5000,
    }
  );

  if (!post) notFound();

  return (
    <>
      <h1 className="text-2xl font-bold mb-1 dark:text-neutral-100">
        {post.title}
      </h1>

      <p className="font-mono flex text-xs text-neutral-500">
        <span className="flex-grow">
          {/* <span className="hidden md:inline">
            <span>
              <a
                href="https://twitter.com/mrtnez_sara"
                className="hover:text-neutral-800 dark:hover:text-neutral-400"
                target="_blank"
              >
                @mrtnez_sara
              </a>
            </span>

            <span className="mx-2">|</span>
          </span> */}

          {/* since we will pre-render the relative time, over time it
           * will diverge with what the user relative time is, so we suppress the warning.
           * In practice this is not an issue because we revalidate the entire page over time
           * and because we will move this to a server component with template.tsx at some point */}
          <span suppressHydrationWarning={true}>
            {post.publishedAt}
          </span>
        </span>
        <span className="pr-1.5">
          <Views
            slug={post.slug}
            mutate={mutate}
            defaultValue={post.views}
          />
        </span>
      </p>

      <Mdx post={post} />
    </>
  );
}

function Views({ slug, mutate, defaultValue }) {
  const didLogViewRef = useRef(false);
  const views = defaultValue;

  useEffect(() => {
    //if ("development" === process.env.NODE_ENV) return;
    if (!didLogViewRef.current) {
      fetch(`/api/views?incr=1&slug=${encodeURIComponent(slug)}`)
        .then(res => res.json())
        .then(obj => {
          mutate(obj);
        })
        .catch(console.error);

      didLogViewRef.current = true;
    }
  });

  return <>{views !== null ? <span>{views} views</span> : null}</>;
}
