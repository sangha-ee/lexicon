import { LoadMorePosts } from "./load-more-posts";
export { PostsListSkeleton } from "./skeleton";

import { fetchAllPosts } from "@/lib/data";

interface PostsListProps {}

async function loadMorePosts(offset: number) {
  "use server";

  return fetchAllPosts(offset);
}

export const PostsList: React.FC<PostsListProps> = async () => {
  const posts = await fetchAllPosts();
  return <LoadMorePosts loadMoreAction={loadMorePosts} posts={posts} />;
};
