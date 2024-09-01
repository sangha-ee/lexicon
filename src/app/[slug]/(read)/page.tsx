import { fetchPost } from "@/lib/data";
import { ReadPost, ReadPostSkeleton } from "@/components/app/read-post";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface BlogPostPageProps {
  params?: {
    slug?: string;
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const postId = Number(params?.slug);

  if (isNaN(postId)) {
    return notFound();
  }

  const post = await fetchPost(postId);

  if (!post) {
    return notFound();
  }

  return (
    <Suspense fallback={<ReadPostSkeleton />}>
      <ReadPost id={postId} />
    </Suspense>
  );
};

export default BlogPostPage;
