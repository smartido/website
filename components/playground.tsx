'use client';

import React, { useState, useEffect } from 'react';
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
  )
}

export function Playground(props) {
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