'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Playground } from './playground';

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
  return <Image alt={props.alt} className="border border-gray-200 dark:border-zinc-800 mx-auto rounded-lg" {...props} />;
}

function Callout(props) {
  return (
    <div className="flex border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 rounded-[4px] p-4 my-8">
      {props.emoji && <div className="flex w-4 mr-4">{props.emoji}</div>}
      <div className="w-full callout break-words">{props.children}</div>
    </div>
  );
}

function GradientText(props) {
  return (
    <span className={`font-bold bg-gradient-to-r ${props.from} ${props.via} ${props.to} text-transparent bg-clip-text bg-300% ${props.isAnimated ? "animate-gradient" : ""}`}>
      {props.children}
    </span>
  );
}

function FauxTweet(props) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900/80 px-4 py-5 sm:px-6 sm:py-8">
      <div className="flex">
        <div className="mr-4 h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-zinc-800 sm:h-14 sm:w-14" />
        <div>
          <div className="flex items-center space-x-3">
            <div className="h-3 w-32 rounded-lg bg-gray-200 dark:bg-zinc-800" />
            <div className="h-3 w-20 rounded-lg bg-gray-200 dark:bg-zinc-800" />
          </div>
          <div className="mt-6 space-y-2.5">
            <div className="h-3 w-4/5 rounded-lg bg-gray-200 dark:bg-zinc-800" />
            <div className="h-3 w-11/12 rounded-lg bg-gray-200 dark:bg-zinc-800" />
            <div className="h-3 w-1/2 rounded-lg bg-gray-200 dark:bg-zinc-800" />
          </div>
          <div className="mb-4">{props.children}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-zinc-800" />
              <div className="h-3 w-10 rounded-lg bg-gray-200 dark:bg-zinc-800" />
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-zinc-800" />
              <div className="h-3 w-9 rounded-lg bg-gray-200 dark:bg-zinc-800" />
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-zinc-800" />
              <div className="h-3 w-12 rounded-lg bg-gray-200 dark:bg-zinc-800" />
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Palette(props) {
  return (
    <div className="rounded-2xl overflow-hidden w-full mt-8">
      <div className="grid [grid-template-columns:1fr_1fr_1fr] h-full max-h-[314px] overflow-hidden">
        <Link className="relative h-[280px]" href={props.image1.href} rel="noopener noreferrer" target="_blank">
          <Image alt="Image 1" className="relative w-full h-full object-cover m-0" src={props.image1.src} height={500} width={500} />
        </Link>
        <Link className="relative h-[280px]" href={props.image2.href} rel="noopener noreferrer" target="_blank">
          <Image alt="Image 1" className="relative w-full h-full object-cover m-0" src={props.image2.src} height={500} width={500} />
        </Link>
        <Link className="relative h-[280px]" href={props.image3.href} rel="noopener noreferrer" target="_blank">
          <Image alt="Image 1" className="relative w-full h-full object-cover m-0" src={props.image3.src} height={500} width={500} />
        </Link>
      </div>
      <div
        className={`flex items-center justify-between px-8 py-6 text-white ${Array.isArray(props.color.bg) ? "bg-gradient-to-r" : ""}`}
        style={
          Array.isArray(props.color.bg)
            ? { backgroundImage: `linear-gradient(to right, ${props.color.bg[0]}, ${props.color.bg[1]})`}
            : { backgroundColor: props.color.bg }
        }
      >
        <div>
          <div>{props.color.pantoneId}</div>
          <div className="text-2xl font-semibold">{props.color.pantoneName}</div>
        </div>
        <div className="text-3xl font-semibold">
          {props.year}
        </div>
      </div>
    </div>
  );
}

const mdxComponents = {
  Image: RoundedImage,
  a: A,
  Callout,
  FauxTweet,
  GradientText,
  Playground,
  Palette,
};

interface MdxProps {
  post: any;
}

export function Mdx({ post }: MdxProps) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose prose-slate dark:prose-invert max-w-full leading-6">
      <MDXContent components={{ ...mdxComponents as any }} />
    </article>
  );
}
