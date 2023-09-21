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

function GradientText(props) {
  return (
    <span className={`font-bold bg-gradient-to-r ${props.from} ${props.via} ${props.to} text-transparent bg-clip-text bg-300% animate-gradient`}>
      {props.children}
    </span>
  );
}

function TitleBar({ title = 'Code Playground' }) {
  const { sandpack } = useSandpack()
  const { resetAllFiles } = sandpack

  return (
    <div className="flex items-center justify-between bg-zinc-700 px-3 py-2 sm:rounded-t-lg">
      <span className="text-sm font-bold text-white">{title}</span>
      <span className="align-center flex">
        <button onClick={() => resetAllFiles()}>
          <ResetIcon className="mr-4 text-zinc-300" />
        </button>
        <UnstyledOpenInCodeSandboxButton className="relative -top-[1px]">
          <ArrowTopRightIcon className="text-zinc-300" />
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
    <div className="flex items-center justify-between border border-zinc-700 bg-zinc-900 px-3">
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
              'text-zinc-300',
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
  const [mode, setMode] = useState('result')
  const isPreview = mode === 'result'

  const previewProps = {
    mode,
    setMode,
    isPreview,
  }

  return (
    <SandpackProvider
      template="react"
      theme={{
        ...nightOwl,
        colors: {
          ...nightOwl.colors,
          surface1: colors.zinc[900],
          accent: colors.amber[300],
        },
        syntax: {
          ...nightOwl.syntax
        },
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
