"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { type BlogPost } from "@/lib/definitions";
import { formatDateToLocal } from "@/lib/utils";

interface PostProps extends BlogPost {}

export const Post: React.FC<PostProps> = ({
  title,
  description,
  createdAt,
  id,
}) => {
  const formatedDate = formatDateToLocal(createdAt);
  return (
    <article key={title}>
      <div>
        <div className="space-y-1">
          <time
            className="text-xs text-muted-foreground"
            dateTime={formatedDate}
          >
            {formatedDate}
          </time>

          <h2 className="text-4xl capitalize leading-none">
            <Link href={`/${id}`} className="hover:text-foreground/80">
              {title}
            </Link>
          </h2>

          <p className="text-justify text-sm text-muted-foreground">
            {description}
            <span className="ml-1">...</span>
          </p>
        </div>
        <Separator className="my-4" />
      </div>
    </article>
  );
};
