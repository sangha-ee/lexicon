"use server";

import { POST_LIST_PAGE_SIZE } from "./constants";
import { db, sql } from "./kysely";

export async function fetchAllPosts(offset = 0) {
  const blogPosts = await db
    .selectFrom("posts")
    .select([
      "id",
      "title",
      sql`substring(description from 1 for 300)`.as("description"),
      "createdAt",
    ])
    .orderBy(["createdAt desc", "title"])
    .offset(offset)
    .limit(POST_LIST_PAGE_SIZE)
    .execute();

  return blogPosts.map((post) => ({
    ...post,
    description: post.description as string,
  }));
}

export async function fetchPost(id: number) {
  const blogPost = await db
    .selectFrom("posts")
    .select(["id", "title", "description", "createdAt"])
    .where("posts.id", "=", id)
    .executeTakeFirst();
  return blogPost || null;
}
