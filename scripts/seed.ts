import dotenv from "dotenv";
// this line should execute before other imports.
dotenv.config({
  path: [".env.development.local", ".env.local", ".env"],
});

import { generate } from "random-words";
import { db, sql } from "../src/lib/kysely";

const POST_COUNT = 1000;
const DESC_LENGTH = 200;
const TITLE_LENGTH = 4;

async function seedPosts() {
  try {
    await db.schema.dropTable("posts").execute();
    await db.schema
      .createTable("posts")
      .addColumn("id", "serial", (cb) => cb.primaryKey())
      .addColumn("title", "varchar(255)", (cb) => cb.notNull())
      .addColumn("description", "text", (cb) => cb.notNull())
      .addColumn("createdAt", sql`timestamp with time zone`, (cb) =>
        cb.defaultTo(sql`current_timestamp`)
      )
      .execute();
    console.log(`Created "posts" table`);

    const posts = [];

    for (let i = 0; i < POST_COUNT; i++) {
      const title = generate({
        exactly: 1,
        wordsPerString: TITLE_LENGTH,
      })[0];
      const description = generate({
        exactly: 1,
        wordsPerString: DESC_LENGTH,
      })[0];
      posts.push({
        title: title,
        description: description,
      });
    }

    await db.insertInto("posts").values(posts).execute();
  } catch (error) {
    console.log(error);
  }

  console.log(`Seeded "posts" table`);
}

async function main() {
  console.log("Seeding the database..");
  await seedPosts();
  console.log("Done. Seeding the database");
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
