import { A } from "components/mdx";
import { ArrowIcon, GitHubIcon, LinkedInIcon, TwitterIcon } from "components/icons";

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl">
        Sara Martínez Domínguez
      </h1>
      <div className="prose prose-neutral dark:prose-invert max-w-full">
        <p>
          Hola, sóc la Sara (a.k.a. <b>smartido</b>).
        </p>
        <p>
          Sóc <b>desenvolupadora de frontend</b> i una <b>entusiasta del disseny d’UI/UX</b> amb una mica d’experiència en el backend, principalment treballant amb Node i Django.
        </p>
        <hr />
        <p>
          Abans d’això, vaig passar per la facultat de psicologia, on vaig descobrir l’àmbit de la neurociència. Després de llicenciar-me vaig començar un doctorat treballant amb l’esquizofrènia.
        </p>
        <p>
          Vaig estar en un laboratori que treballava amb neuroimatges i allí em va començar a interessar més el software. Vaig estudiar enginyeria informàtica i, durant les meves pràctiques, vaig apassionar-me pel JavaScript i el desenvolupament web.
        </p>
        <p>
          Actualment treballo com a desenvolupadora de software a <A target="_blank" href="https://iskra.cat/">Iskra Desenvolupament</A>, on creo, testejo i dono suport a aplicacions web per clients B2C i B2B a través de diferents industries.
        </p>
        <p>
          Aquesta web s’ha desenvolupat amb <A target="_blank" href="https://nextjs.org/">Next.js</A> (framework), <A target="_blank" href="https://planetscale.com">PlanetScale</A> (base de dades), <A target="_blank" href="https://vercel.com">Vercel</A> (desplegament), <A target="_blank" href="https://tailwindcss.com">Tailwind CSS</A> (estils) i <A target="_blank" href="https://vercel.com/analytics">Vercel Analytics</A> (analítica).
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/smartido"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/mrtnezsara/"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <LinkedInIcon />
              <div className="ml-3">LinkedIn</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/mrtnez_sara"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">Twitter</div>
            </div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
