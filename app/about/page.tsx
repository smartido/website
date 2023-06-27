'use client';

import { Header } from 'components/header';
import { A } from 'components/mdx';

export default function AboutPage() {
  return (
    <>
      <Header />

      <section >
        <h1 className="text-3xl font-medium mb-5">Qui sóc</h1>
        <div className="prose prose-slate dark:prose-invert max-w-full leading-6">
          <p>
            Gràcies Internet i hola a qualsevol que hagi fet clic aquí per saber-ne més! 👋
          </p>
          <p>
            Sóc la Sara, una <b>desenvolupadora web</b> de Manresa (Barcelona).
          </p>
          <p>
            M’apassiona el front-end i m’encanta crear interfícies d’usuari que siguin <b>amigables</b>, <b>senzilles</b> i <b>boniques</b>. ✨
          </p>
          <hr />
          <p>
            Vaig estudiar enginyeria informàtica i vaig apassionar-me pel JavaScript i el desenvolupament web. Actualment treballo a <A target="_blank" href="https://iskra.cat/"><b>Iskra Desenvolupament</b></A>, creant, testejant i donant suport a aplicacions web per clients B2C i B2B a través de diferents industries.
          </p>
          <p>
            A través d’aquestes experiències, he tingut l’oportunitat de treballar amb equips tant petits com grans, especialitzats i transversals i he desenvolupat un estil de treball basat en la <b>flexibilitat</b>, la <b>claredat</b> i la <b>col•laboració</b>.
          </p>
        </div>
      </section>
    </>
  );
}
