"use client";

import { type BlogPost } from "@/lib/definitions";
import { formatDateToLocal } from "@/lib/utils";

export const DateCell: React.FC<{ blogPost: BlogPost }> = ({
  blogPost: { createdAt },
}) => {
  const formatedDate = formatDateToLocal(createdAt);
  return <time dateTime={formatedDate}>{formatedDate}</time>;
};
