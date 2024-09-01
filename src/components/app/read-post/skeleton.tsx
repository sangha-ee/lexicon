import { Skeleton } from "@/components/ui/skeleton";

export const ReadPostSkeleton: React.FC = () => {
  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="space-y-4">
        <Skeleton className="h-3 w-1/2 rounded-xl" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );
};
