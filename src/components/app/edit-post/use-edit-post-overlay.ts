import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useEditPostOverlay = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  useEffect(() => {
    const overlay = searchParams.get("overlay")?.toString();
    setIsOpen(overlay === "new-post" || overlay === "edit-post");
  }, [searchParams]);

  const openOverlay = () => {
    const params = new URLSearchParams(searchParams);
    params.set("overlay", "new-post");
    replace(`${pathname}?${params.toString()}`);
  };

  const closeOverlay = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("overlay");
    replace(`${pathname}?${params.toString()}`);
  };

  return { isOpen, openOverlay, closeOverlay };
};
