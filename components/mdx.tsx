'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  UnstyledOpenInCodeSandboxButton,
  useSandpack,
  useSandpackNavigation
} from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';
import colors from 'tailwindcss/lib/public/colors';
import clsx from 'clsx';
import {
  ArrowTopRightIcon,
  RefreshIcon,
  ResetIcon
} from 'components/icons';

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

function TitleBar({ title = 'Code Playground' }) {
  const { sandpack } = useSandpack();
  const { resetAllFiles } = sandpack;

  return (
    <div className="flex items-center justify-between bg-black px-3 py-2 rounded-t-[6px] border-b border-zinc-800">
      <span className="font-mono text-xs text-neutral-400">
        {title}
      </span>
      <span className="align-center flex">
        <button onClick={() => resetAllFiles()}>
          <ResetIcon className="mr-4 text-neutral-400" />
        </button>
        <UnstyledOpenInCodeSandboxButton className="relative -top-[1px]">
          <ArrowTopRightIcon className="text-neutral-400" />
        </UnstyledOpenInCodeSandboxButton>
      </span>
    </div>
  )
}

function Console({ isPreview, setMode }) {
  const [reloading, setReloading] = useState(false)
  const { sandpack, listen } = useSandpack()
  const { refresh } = useSandpackNavigation()
  const activeClass = 'text-white border-b border-yellow-400'
  const inactiveClass = 'text-zinc-400'

  useEffect(() => {
    // listens for any message dispatched between sandpack and the bundler
    const stopListening = listen((msg) => {
      console.log("MSG", msg)
      if (msg?.type === 'status' && msg.status === 'idle') {
        setReloading(false)
      }
    })

    return () => {
      // unsubscribe
      stopListening()
    }
  }, [listen])

  return (
    <div className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3">
      <div>
        <button
          className={clsx('mr-6 py-3', isPreview ? activeClass : inactiveClass)}
          onClick={() => setMode('result')}
        >
          Preview
        </button>
        <button
          className={clsx('py-3', !isPreview ? activeClass : inactiveClass)}
          onClick={() => setMode('console')}
        >
          Console
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setReloading(true)
            refresh()
          }}
          disabled={sandpack?.status === 'idle'}
        >
          <RefreshIcon
            className={clsx(
              'text-neutral-400',
              reloading && 'animate-spin',
              sandpack?.status === 'idle' && 'text-zinc-600'
            )}
          />
        </button>
      </div>
    </div>
  )
}

function Preview({ isPreview }) {
  return (
    <>
      <div className="rounded-b-lg bg-zinc-900 p-4">
        <div
          className={clsx(
            !isPreview ? 'hidden' : 'block',
            'overflow-hidden rounded bg-white p-1'
          )}
        >
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
          />
        </div>

        <div
          className={clsx(
            isPreview ? 'hidden' : 'block',
            'min-h-[160px] overflow-hidden rounded'
          )}
        >
          <SandpackConsole
            standalone
            resetOnPreviewRestart
            showHeader={false}
          />
        </div>
      </div>
    </>
  )
}

function Playground(props) {
  const [mode, setMode] = useState('result');
  const isPreview = mode === 'result';

  const previewProps = { mode, setMode, isPreview };

  return (
    <SandpackProvider
      template="react"
      theme={{
        ...nightOwl,
        colors: {
          ...nightOwl.colors,
          surface1: colors.zinc[900],
          surface2: colors.zinc[800],
          surface3: colors.zinc[900],
          accent: colors.amber[300],
        },
        syntax: {
          ...nightOwl.syntax,
          plain: "rgb(173, 186, 199)",
          comment: {
            color: "rgb(118, 131, 144)",
            fontStyle: "normal"
          },
          keyword: {
            color: "rgb(244, 112, 103)",
            fontStyle: "normal"
          },
          tag: "rgb(141, 219, 140)",
          punctuation: "rgb(173, 186, 199)",
          definition: "rgb(220, 189, 251)",
          property: {
            color: "rgb(108, 182, 255)",
            fontStyle: "normal"
          },
          static: "rgb(108, 182, 255)",
          string: "rgb(150, 208, 255)"
        }
      }}
      files={props.files}
    >
      <SandpackLayout className="!block !rounded-none sm:!rounded-lg !-mx-4 sm:!mx-0">
        <TitleBar title={props.title} />
        <SandpackCodeEditor showTabs={props.showTabs} />
        <Console {...previewProps} />
        <Preview {...previewProps} />
      </SandpackLayout>
    </SandpackProvider>
  )
}

const mdxComponents = {
  Image: RoundedImage,
  a: A,
  Callout,
  FauxTweet,
  GradientText,
  Playground
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
