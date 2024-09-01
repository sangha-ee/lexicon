"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import { PostsListSkeleton } from "./skeleton";
import { POST_LIST_PAGE_SIZE } from "@/lib/constants";
import { type BlogPost } from "@/lib/definitions";
import { PostsList } from "./posts-list";

interface LoadMorePostsProps {
  posts: BlogPost[];
  loadMoreAction: (offset: number) => Promise<BlogPost[]>;
}

export const LoadMorePosts: React.FC<LoadMorePostsProps> = ({
  posts: initialPosts,
  loadMoreAction,
}) => {
  const { ref, inView } = useInView({
    trackVisibility: true,
    delay: 100,
    threshold: 0,
  });
  // First page is already fetched, So we start with POST_LIST_PAGE_SIZE offset
  const currentOffsetRef = React.useRef<number | null>(POST_LIST_PAGE_SIZE);
  const [isPending, startTransition] = useTransition();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  useEffect(() => {
    if (!inView || currentOffsetRef.current === null) return;

    startTransition(async () => {
      currentOffsetRef.current! += POST_LIST_PAGE_SIZE;
      const newPosts = await loadMoreAction(currentOffsetRef.current!);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      // End of pages we can stop loading more
      if (newPosts.length < POST_LIST_PAGE_SIZE) {
        currentOffsetRef.current = null;
      }
    });
  }, [inView, loadMoreAction]);

  return (
    <section>
      <PostsList posts={posts} />
      {isPending ? <PostsListSkeleton /> : null}
      <div ref={ref} />
    </section>
  );
};
