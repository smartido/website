import Image from 'next/image';
import { fetchPages } from 'lib/notion';

function Book({ priority, properties }) {
  const { title, author, link, cover, rating } = properties;

  return (
    <a
      href={link.url}
      target="_blank"
      className="flex flex-col rounded-2xl p-4 border bg-zinc-50 border-gray-200/50 hover:border-black dark:bg-zinc-950 dark:border-gray-700/50 dark:hover:border-white"
    >
      <span className="w-40 h-64 mb-2 relative">
        <Image
          alt=""
          fill
          priority={priority}
          src={cover.url}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      </span>
      <div className="flex flex-col w-full text-sm">
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {author.rich_text[0].text.content}
        </p>
        <h3 className="mt-1 text-lg font-medium">
          {title.title[0].text.content}
        </h3>
        <p className="mt-4 w-fit rounded-[8px] py-1 px-2 bg-gray-200/50 dark:bg-zinc-700/50">
          {rating.select.name}
        </p>
      </div>
    </a>
  )
}

export default async function Books() {
  const books = await fetchPages();

  return (
    <div className="w-screen max-w-screen-2xl mx-auto absolute top-0 left-0 right-0 bg-white dark:bg-black">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 px-8 my-16">
        {books?.map((book, i) => (
          <Book key={book.id} priority={i < 10} {...book} />
        ))}
      </div>
    </div>
  );
}
