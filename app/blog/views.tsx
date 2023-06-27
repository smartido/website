'use client';

import { useEffect, useRef, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
//import useSWR from 'swr';

/*type PostView = {
  count: string;
};

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  
  return res.json();
}*/

export default function Views({
  slug,
  trackView
}: {
  slug: string;
  trackView: boolean;
}) {
  const didLogViewRef = useRef(false);

  const [views, setViews] = useState(0);

  /*const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.count || 0);
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });

    if (trackView) {
      registerView();
    }
  }, [slug]);*/


  useEffect(() => {
    const fetchdata = async() => {
      const docRef = doc(db, "posts", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setViews(docSnap.data().count);
      } else {
        console.log("Unknown document");
      }
    }

    fetchdata();

    const registerView = async () => {
      const docRef = doc(db, "posts", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, { count: increment(1) });
        setViews(docSnap.data().count);
      } else {
        console.log("Unknown document");
      }
    }

    if (!didLogViewRef.current && trackView) {
      registerView();
      didLogViewRef.current = true;
    }
  }, [slug]);

  return (
    <span className="font-mono">
      {`${views ? views.toLocaleString() + " views" : "-"}`}
    </span>
  );
}
