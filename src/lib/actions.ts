"use server";

import { db } from "@/lib/kysely";
import { revalidatePath } from "next/cache";
import { validateBlogPostFormData } from "./utils";


export async function createOrUpdatePost(formData: FormData, id?: number) {
  return id ? updatePost(id, formData) : createPost(formData);
}

export async function createPost(formData: FormData) {
  const { validatedFields, post } = validateBlogPostFormData(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await db.insertInto("posts").values(post).executeTakeFirst();
  revalidatePath("/");
}

export async function updatePost(id: number, formData: FormData) {
  const { validatedFields, post } = validateBlogPostFormData(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await db
    .updateTable("posts")
    .set(post)
    .where("posts.id", "=", id)
    .executeTakeFirst();
  revalidatePath("/");
}

export async function deletePost(id: number) {
  //  Note: In a production environment may be we should not delete this.
  //  We could flag it as deleted instead.
  revalidatePath("/");
  await db.deleteFrom("posts").where("posts.id", "=", id).executeTakeFirst();
}
