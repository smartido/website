"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";

type SortSetting = ["publishedAt" | "views", "desc" | "asc"];

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Posts({ posts: initialPosts }) {
  const [sort, setSort] = useState<SortSetting>(["publishedAt", "desc"]);

  const { data: posts } = useSWR(
    "/api/posts",
    fetcher,
    {
      fallbackData: initialPosts,
      refreshInterval: 5000,
    }
  );

  function sortViews() {
    setSort(sort => [
      sort[0] === "views" && sort[1] === "asc" ? "publishedAt" : "views",
      sort[0] !== "views" ? "desc" : sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <Suspense fallback={null}>
      <main className="max-w-2xl m-auto mb-10 text-sm">
        <header className="flex items-center font-mono text-xs text-neutral-500">
          <span className="grow">Títol</span>

          <button
            onClick={sortViews}
            className={`h-9 pl-4 ${sort[0] === "views" ? "text-black dark:text-white" : ""}`}
          >
            Vistes
            {sort[0] === "views" ? (sort[1] === "asc" ? "↑" : "↓") : ""}
          </button>
        </header>

        <List posts={posts} sort={sort} />
      </main>
    </Suspense>
  );
}

function List({ posts, sort }) {
  // sort can be ["publishedAt", "desc"] or ["views", "desc"] for example
  const sortedPosts = useMemo(() => {
    const [sortKey, sortDirection] = sort;

    return [...posts].sort((a, b) => {
      if (sortKey === "publishedAt") {
        return sortDirection === "desc"
          ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      } else {
        return sortDirection === "desc" ? b.views - a.views : a.views - b.views;
      }
    });
  }, [posts, sort]);

  return (
    <ul>
      {sortedPosts.map((post) => {
        return (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <span className="flex hover:bg-neutral-100 dark:hover:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 border-b-0 transition-all">
                <span className="flex grow items-center py-3">
                  <span className="flex flex-col grow">
                    <p>{post.title}</p>

                    <span className="font-mono text-xs text-neutral-500">
                      {post.publishedAt}
                    </span>
                  </span>
                  
                  <span className="font-mono text-xs text-neutral-500">
                    {post.views}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
