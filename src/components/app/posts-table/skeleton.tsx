import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export const PostsTableSkeleton: React.FC = () => {
  const skeletonItems = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => (
      //   Using index as key is usually anti-pattern
      //   but this array does not change so it should be okay.
      <div className="space-y-2" key={i}>
        <Skeleton className="h-3 w-1/2 rounded-xl" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Separator />
      </div>
    ));
  }, []);

  return <div className="flex w-full flex-col space-y-3">{skeletonItems}</div>;
};

export default PostsTableSkeleton;
