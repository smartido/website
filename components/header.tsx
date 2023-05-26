"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { themeEffect } from "../app/theme-effect";
import { MoonIcon, SunIcon } from "./icons";

function Logo() {
  const pathname = usePathname();

  return (
    <span className="font-bold text-md md:text-lg whitespace-nowrap">
      {pathname === "/" ? (
        <span className="cursor-default pr-2">✺ Sara Martínez</span>
      ) : (
        <Link
          href="/"
          className="hover:text-black dark:hover:text-white p-2 -ml-2 transition-all"
        >
          ✺ Sara Martínez
        </Link>
      )}
    </span>
  );
}

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
        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mr-[5px] hidden md:inline">
          {preference === null ? "System" : preference === "dark" ? "Dark" : "Light"}
        </span>
      )}

      {/*
        the `theme-auto:` plugin is registered in `tailwind.config.js` and
        works similarly to the `dark:` prefix, which depends on the `theme-effect.ts` behavior
      */}
      <button
        aria-label="Toggle theme"
        className="inline-flex rounded-lg p-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition-all [&_.sun-icon]:hidden dark:[&_.moon-icon]:hidden dark:[&_.sun-icon]:inline }"
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

export function Header() {
  return (
    <header className="flex items-center mb-5 md:mb-10">
      <Logo />
      
      <nav className="flex items-center grow font-mono text-xs gap-1 md:gap-3 md:px-10">
        {/* <Link
          href="/about"
          className="inline-flex text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white p-2 transition-all"
        >
          Qui sóc
        </Link> */}
        <Link
          href="/blog"
          className="inline-flex text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white p-2 transition-all"
        >
          Blog
        </Link>
      </nav>

      <ThemeToggle />
    </header>
  );
}
