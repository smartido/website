import Link from 'next/link';
import Image from 'next/image';
import { BlogIcon, TwitterIcon, GitHubIcon, LinkedInIcon } from 'components/icons';
import { allBlogs } from 'contentlayer/generated';
import Views from './blog/views';
import { Header } from 'components/header';
import { formatDate } from './utils';

export const revalidate = 60;

export default async function HomePage() {
  return (
    <>
      <Header />

      <section>
        <div className="-mt-12 md:mt-0">
          <div className="flex items-center space-x-6">
            <div className="rounded-full bg-gradient-to-tl from-pink-500 to-rose-300 p-[3px] border-dotted ring-[5px] ring-slate-500/20">
              <div className="rounded-full p-px h-[64px] w-[64px]">
                <Image
                  alt="Sara Martínez"
                  className="rounded-full"
                  src="/avatar.jpg"
                  height={64}
                  width={64}
                  priority
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-tl from-black to-gray-500 dark:from-gray-500 dark:to-white">
                Sara Martínez
              </h1>
              <h2 className="align-middle text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-tl from-black to-gray-500 dark:from-gray-500 dark:to-white">
                Desenvolupadora Web
              </h2>
            </div>
          </div>
          <p className="mt-7 md:mt-9 text-xl text-slate-800 dark:text-slate-200">
            Benvinguts/udes al meu jardí digital on comparteixo allò que vaig aprenent sobre crear productes, convertint-me en millor desenvolupadora i fent créixer una carrera en el món de la tecnologia.
          </p>
          <div className="mt-8 md:mt-12 text-slate-800 dark:text-slate-200">
            <div className="flex items-center space-x-7 font-semibold">
              <Link className="group" href="/blog">
                <div className="sm:flex sm:items-center sm:space-x-2">
                  <div className="mb-1.5 flex justify-center sm:mb-0 sm:block text-pink-500">
                    <div className="rounded-full p-1.5 transition-all duration-300 ease-out group-hover:scale-[1.2] border border-slate-200 dark:border-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                      <BlogIcon />
                    </div>
                  </div>
                  <div>Blog</div>
                </div>
              </Link>
              <a
                className="group"
                href="https://twitter.com/smartido_"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="sm:flex sm:items-center sm:space-x-2">
                  <div className="mb-1.5 flex justify-center sm:mb-0 sm:block text-pink-500">
                    <div className="rounded-full p-1.5 transition-all duration-300 ease-out group-hover:scale-[1.2] border border-slate-200 dark:border-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                      <TwitterIcon />
                    </div>
                  </div>
                  <div>X</div>
                </div>
              </a>
              <a
                className="group"
                href="https://github.com/smartido"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="sm:flex sm:items-center sm:space-x-2">
                  <div className="mb-1.5 flex justify-center sm:mb-0 sm:block text-pink-500">
                    <div className="rounded-full p-1.5 transition-all duration-300 ease-out group-hover:scale-[1.2] border border-slate-200 dark:border-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                      <GitHubIcon />
                    </div>
                  </div>
                  <div>GitHub</div>
                </div>
              </a>
              <a
                className="group"
                href="https://www.linkedin.com/in/smartido/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="sm:flex sm:items-center sm:space-x-2">
                  <div className="mb-1.5 flex justify-center sm:mb-0 sm:block text-pink-500">
                    <div className="rounded-full p-1.5 transition-all duration-300 ease-out group-hover:scale-[1.2] border border-slate-200 dark:border-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                      <LinkedInIcon />
                    </div>
                  </div>
                  <div>LinkedIn</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-10 mt-20 sm:mt-32">
          <h2 className="text-2xl my-5 font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-tl from-black to-slate-500 dark:from-slate-500 dark:to-white">
            Últimes publicacions
          </h2>
          {allBlogs
            .sort((a, b) => {
              if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="
                  group
                  block
                  overflow-hidden
                  rounded-2xl
                  p-7
                  transition
                  duration-300
                  border
                  bg-zinc-50
                  border-gray-200/50
                  hover:border-black
                  dark:bg-zinc-950
                  dark:border-gray-700/50
                  dark:hover:border-white"
              >
                <div>
                <h3 className="text-xl transition font-medium line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex flex-wrap space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="text-slate-00/30 dark:text-slate-400/30">·</span>
                  <Views slug={post.slug} trackView={false} />
                </div>
                <div className="mt-4 text-lg line-clamp-3 text-slate-800 dark:text-slate-200">
                  {post.summary}
                </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    </>
  );
}
