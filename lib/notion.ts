import { Client } from "@notionhq/client";
import React from "react";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  }).then((res) => (
    res.results as DatabaseObjectResponse[] | undefined
  )).catch((error) => {
    console.log(`Notion API error: ${error.status}`)
  });
});
