// import 'server-only' not working with API routes yet
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface ViewsTable {
  slug: string;
  count: number;
}

//create table views (slug varchar(255) NOT NULL, count int NOT NULL, PRIMARY KEY (slug));
interface Database {
  views: ViewsTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
