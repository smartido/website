"use client";

import { A } from "./mdx";

export function Footer() {
  return (
    <footer className="flex font-mono text-xs text-center text-neutral-500 dark:text-neutral-400 p-6 pt-3 pb-6 mt-3">
      <div className="grow text-left">
        Sara Martínez (
          <A target="_blank" href="https://twitter.com/mrtnez_sara">
            @mrtnez_sara
          </A>
        )
      </div>
      <div>
        <A target="_blank" href="https://github.com/smartido">
          Codi
        </A>
      </div>
    </footer>
  );
}
