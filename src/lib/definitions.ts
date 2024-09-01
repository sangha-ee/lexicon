import { type ColumnType, type Generated } from "kysely";

export interface PostsTable {
  id: Generated<number>;
  title: string;
  description: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export type BlogPost = Omit<PostsTable, "id" | "createdAt"> & {
  id: number;
  createdAt: Date;
};

export interface Database {
  posts: PostsTable;
}
