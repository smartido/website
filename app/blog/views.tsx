'use client';

import { useEffect } from 'react';
import useSWR from 'swr';

type PostView = {
  count: string;
};

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  
  return res.json();
}

export default function Views({
  slug,
  trackView
}: {
  slug: string;
  trackView: boolean;
}) {
  const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.count || 0);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });

    if (trackView) {
      registerView();
    }
  }, [slug]);

  return (
    <span className="font-mono">
      {`${views ? views.toLocaleString() + " views" : "-"}`}
    </span>
  );
}
