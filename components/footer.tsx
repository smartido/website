'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { themeEffect } from '../app/theme-effect';
import { MoonIcon, SunIcon } from './icons';

export function ThemeToggle() {
  // a `null` preference implies auto
  const [preference, setPreference] = useState<undefined | null | string>(undefined);
  const [currentTheme, setCurrentTheme] = useState<null | string>(null);
  const [isHovering, setIsHovering] = useState(false);

  const onMediaChange = useCallback(() => {
    const current = themeEffect();

    setCurrentTheme(current);
  }, []);

  useEffect(() => {
    setPreference(localStorage.getItem("theme"));

    const current = themeEffect();
    setCurrentTheme(current);

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", onMediaChange);

    return () => matchMedia.removeEventListener("change", onMediaChange);
  }, [onMediaChange]);

  const onStorageChange = useCallback((ev: StorageEvent) => {
    if (ev.key === "theme") {
      setPreference(ev.newValue);
    }
  }, [setPreference]);

  useEffect(() => {
    setCurrentTheme(themeEffect());
  }, [preference]);

  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  });

  return (
    <>
      {isHovering && (
        <span className="font-mono text-xs mr-[5px] hidden md:inline">
          {preference === null ? "System" : preference === "dark" ? "Dark" : "Light"}
        </span>
      )}

      {/*
        the `theme-auto:` plugin is registered in `tailwind.config.js` and
        works similarly to the `dark:` prefix, which depends on the `theme-effect.ts` behavior
      */}
      <button
        aria-label="Toggle theme"
        className="inline-flex rounded-lg p-2 text-slate-500 hover:text-black dark:hover:text-white hover:scale-[1.2] transition-all [&_.sun-icon]:hidden dark:[&_.moon-icon]:hidden dark:[&_.sun-icon]:inline }"
        onClick={ev => {
          ev.preventDefault();
          // prevent the hover state from rendering

          let newPreference: string | null = currentTheme === "dark" ? "light" : "dark";
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

          // if the user has their current OS theme as a preference (instead of auto)
          // and they click the toggle, we want to switch to reset the preference
          if (preference !== null && systemTheme === currentTheme) {
            newPreference = null;
            localStorage.removeItem("theme");
          } else {
            localStorage.setItem("theme", newPreference);
          }

          setPreference(newPreference);
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="sun-icon">
          <SunIcon />
        </span>
        <span className="moon-icon">
          <MoonIcon />
        </span>
      </button>
    </>
  );
}

export function Footer() {
  const customClass = "underline decoration-1 transition duration-300 ease-out decoration-slate-200 dark:decoration-slate-600 hover:decoration-black dark:hover:decoration-white underline-offset-4"

  return (
    <footer className="max-w-2xl m-auto px-4 mt-36 pb-36 text-slate-700 dark:text-slate-400">
      <div className="flex flex-col justify-between font-medium lg:flex-row text-slate-500 dark:text-slate-300">
        <div className="font-medium flex space-x-5">
          <Link href="/blog" className={customClass}>
            Blog
          </Link>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/smartido_"
            className={customClass}
          >
            X
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/smartido"
            className={customClass}
          >
            GitHub
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/smartido/"
            className={customClass}
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="max-w-[75%]">
          Desenvolupat amb Next.js, MDX, Tailwind i Vercel
        </div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
