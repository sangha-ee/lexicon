"use client";
import { useCallback, useEffect, useReducer, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from "@/lib/definitions";
import { LoaderCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { fetchPost } from "@/lib/data";
import { createOrUpdatePost } from "@/lib/actions";
import { useEditPostOverlay } from "./use-edit-post-overlay";

interface State {
  post: BlogPost | null;
  errorMessages: { title?: string; description?: string };
}

type Action =
  | { type: "SET_POST"; payload: BlogPost | null }
  | {
      type: "SET_ERROR_MESSAGES";
      payload: { title?: string; description?: string };
    }
  | { type: "RESET_ERROR_MESSAGES" };

const initialState: State = {
  post: null,
  errorMessages: { title: "", description: "" },
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_POST":
      return { ...state, post: action.payload };
    case "SET_ERROR_MESSAGES":
      return { ...state, errorMessages: action.payload };
    case "RESET_ERROR_MESSAGES":
      return { ...state, errorMessages: { title: "", description: "" } };
    default:
      return state;
  }
};

export const EditPost: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen, openOverlay, closeOverlay } = useEditPostOverlay();

  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const postId = Number(idParam) ? Number(idParam) : undefined;

  // Fetch post data before start editing.
  useEffect(() => {
    if (!postId) {
      dispatch({ type: "SET_POST", payload: null });
      return;
    }
    startTransition(async () => {
      const post = await fetchPost(postId);
      dispatch({ type: "SET_POST", payload: post });
    });
  }, [postId]);

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "RESET_ERROR_MESSAGES" });
    }
  }, [isOpen]);

  const onSubmit = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        const result = await createOrUpdatePost(formData, postId);
        if (result?.errors) {
          dispatch({
            type: "SET_ERROR_MESSAGES",
            payload: {
              title: result.errors.title?.toString(),
              description: result.errors.description?.toString(),
            },
          });
        } else {
          closeOverlay();
        }
      });
    },
    [closeOverlay, postId]
  );

  const handleInputChange = useCallback(() => {
    // Reset error messages when the user starts typing
    dispatch({ type: "RESET_ERROR_MESSAGES" });
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openOverlay() : closeOverlay())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {postId ? "Edit Blog Post" : "Add New Blog Post"}
          </DialogTitle>
          <DialogDescription asChild>
            <form
              className="mx-auto w-full"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onSubmit(formData);
              }}
            >
              <div className="mb-5">
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  id="title"
                  defaultValue={state.post?.title}
                  disabled={isPending}
                  autoFocus
                  required
                  className="mt-2"
                  onChange={handleInputChange}
                />
                {state.errorMessages.title && (
                  <p className="mt-2 text-sm font-medium text-destructive">
                    {state.errorMessages.title}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  id="description"
                  className="mt-2"
                  disabled={isPending}
                  defaultValue={state.post?.description}
                  required
                  onChange={handleInputChange}
                />
                {state.errorMessages.description && (
                  <p className="mt-2 text-sm font-medium text-destructive">
                    {state.errorMessages.description}
                  </p>
                )}
              </div>
              {Boolean(postId) && (
                <input type="hidden" name="postId" value={postId} />
              )}
              <Button type="submit">
                {isPending && (
                  <LoaderCircleIcon className="mr-2 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
