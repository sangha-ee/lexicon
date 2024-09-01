"use client";

import { type BlogPost } from "@/lib/definitions";
import { Post } from "./post";

interface PostsListProps {
  posts: BlogPost[];
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
};
