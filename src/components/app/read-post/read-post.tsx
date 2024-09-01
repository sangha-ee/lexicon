"use client";

import { type BlogPost } from "@/lib/definitions";
import { formatDateToLocal } from "@/lib/utils";

interface ReadPostProps {
  post: BlogPost;
}

export const ReadPost: React.FC<ReadPostProps> = ({
  post: { title, description, createdAt },
}) => {
  const formatedDate = formatDateToLocal(createdAt);
  return (
    <div className="space-y-4">
      <time className="text-xs text-muted-foreground">{formatedDate}</time>
      <h2 className="text-4xl capitalize leading-none">{title}</h2>

      <p className="text-justify text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
