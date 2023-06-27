'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';

export function A(props) {
  if (props.href.startsWith('/')) {
    return (
      <Link href={props.href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (props.href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Callout(props) {
  return (
    <div className="flex bg-zinc-50 dark:bg-zinc-900 rounded-[4px] border-l-pink-500 border-l-[3px] p-4 my-8">
      <div className="flex w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

const mdxComponents = {
  Image: RoundedImage,
  a: A,
  Callout
};

interface MdxProps {
  post: any;
}

export function Mdx({ post }: MdxProps) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose prose-slate dark:prose-invert max-w-full leading-6">
      <MDXContent components={{ ...mdxComponents }} />
    </article>
  );
}
