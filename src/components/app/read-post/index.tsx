import { fetchPost } from "@/lib/data";
import { ReadPost as ReadPostClient } from "./read-post";
import { notFound } from "next/navigation";

interface ReadPostProps {
  id: number;
}

export const ReadPost: React.FC<ReadPostProps> = async ({ id }) => {
  const post = await fetchPost(id);

  if (!post) {
    return notFound();
  }

  return <ReadPostClient post={post} />;
};

export { ReadPostSkeleton } from "./skeleton";
