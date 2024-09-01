import { PostsList, PostsListSkeleton } from "@/components/app/posts-list";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Suspense fallback={<PostsListSkeleton />}>
      <PostsList />
    </Suspense>
  );
};

export default HomePage;
