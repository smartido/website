'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import useIntersection from 'lib/useIntersection';
import { TwitterIcon, GitHubIcon, LinkedInIcon } from './icons';

export function Header() {
  const pathname = usePathname();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '-100px',
  });

  let showNav = false
  if (pathname !== "/" || (intersection && !intersection.isIntersecting)) {
    showNav = true
  }

  return (
    <header>
      <div ref={intersectionRef}>
        {showNav && (
          <div className="pointer-events-none fixed top-6 z-30 flex max-w-2xl m-auto px-4 left-0 right-0">
            <div className="pointer-events-auto w-full rounded-full px-2 md:px-4 py-2 md:py-2.5 backdrop-blur-md border border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between">
                <nav className="w-full flex items-center spaxe-x-1 md:space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <Link className="group" href="/blog">
                    <div className={`
                      rounded-md px-2 py-1 transition-all duration-300 ease-out group-hover:text-black dark:group-hover:text-white
                      ${pathname === '/blog' ? "ring-2 ring-slate-200 dark:ring-slate-800 text-black dark:text-white" : ""}
                    `}>
                      Blog
                    </div>
                  </Link>
                  <Link className="group" href="/about">
                    <div className={`
                      rounded-md px-2 py-1 transition-all duration-300 ease-out group-hover:text-black dark:group-hover:text-white
                      ${pathname === '/about' ? "ring-2 ring-slate-200 dark:ring-slate-800 text-black dark:text-white" : ""}
                    `}>
                      Qui sóc
                    </div>
                  </Link>
                </nav>

                <Link className="group" href="/" >
                  <div className="rounded-full p-px h-[36px] w-[36px] transition duration-300 group-hover:scale-[1.2]">
                    <Image
                      alt="Sara Martínez"
                      className="rounded-full"
                      src="/avatar.jpg"
                      height={36}
                      width={36}
                      priority
                    />
                  </div>
                </Link>

                <nav className="w-full flex items-center justify-end space-x-1 md:space-x-2 text-pink-500">
                  <a
                    className="group"
                    href="https://twitter.com/smartido_"
                    rel="noopener noreferrer"
                    target="_blank"                
                  >
                    <div className="rounded-full p-1.5 transition-all duration-300 ease-out group-hover:scale-[1.2] border border-slate-200 dark:border-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                      <TwitterIcon />
                    </div>
                  </a>
                  <a
                    className="group"
                    href="https://github.com/smartido"
                    rel="noopener noreferrer"
                    target="_blank"                
                  >
                    <div className="rounded-full p-1.5 transition-all duration-300 ease-out group-hover:scale-[1.2] border border-slate-200 dark:border-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                      <GitHubIcon />
                    </div>
                  </a>
                  <a
                    className="group"
                    href="https://www.linkedin.com/in/smartido/"
                    rel="noopener noreferrer"
                    target="_blank"                
                  >
                    <div className="rounded-full p-1.5 transition-all duration-300 ease-out group-hover:scale-[1.2] border border-slate-200 dark:border-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                      <LinkedInIcon />
                    </div>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
