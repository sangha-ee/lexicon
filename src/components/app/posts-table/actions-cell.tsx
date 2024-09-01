"use client";

import { Edit as EditIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions";
import { type BlogPost } from "@/lib/definitions";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import { useCallback } from "react";

export const ActionsCell: React.FC<{ blogPost: BlogPost }> = ({ blogPost }) => {
  const router = useRouter();
  const pathname = usePathname();

  const onEditPost = useCallback(() => {
    const params = new URLSearchParams();
    params.set("overlay", "edit-post");
    params.set("id", blogPost.id.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [blogPost.id, router, pathname]);

  const onDelete = useCallback(async () => {
    await deletePost(blogPost.id);
    router.refresh();
  }, [blogPost.id, router]);

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={onEditPost}>
        <EditIcon className="h-4 w-4" />
      </Button>
      <ConfirmDeleteDialog onDelete={onDelete} />
    </div>
  );
};
