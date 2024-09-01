import { fetchAllPosts } from "@/lib/data";
import { PostsTable as PostsTableClient } from "./posts-table";
import { POST_LIST_PAGE_SIZE } from "@/lib/constants";

export const PostsTable: React.FC<{
  currentPage: number;
}> = async ({ currentPage }) => {
  const offset = (currentPage - 1) * POST_LIST_PAGE_SIZE;

  const posts = await fetchAllPosts(offset);
  return <PostsTableClient posts={posts} currentPage={currentPage} />;
};
