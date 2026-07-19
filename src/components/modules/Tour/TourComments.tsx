import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2, Trash2 } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/redux/features/comment/comment.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";

type CommentUser = {
  _id: string;
  name?: string;
  email?: string;
  picture?: string;
};

type CommentItem = {
  _id: string;
  content: string;
  rating: number;
  createdAt?: string;
  user?: CommentUser | string;
};

type TourCommentsProps = {
  tourId: string;
};

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
  interactive?: boolean;
};

const StarRating = ({
  value,
  onChange,
  size = "md",
  interactive = false,
}: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div
      className="inline-flex items-center gap-1"
      onMouseLeave={() => interactive && setHovered(0)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = interactive
          ? star <= (hovered || value)
          : star <= value;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            className={cn(
              "p-0.5 transition-colors",
              interactive
                ? "cursor-pointer hover:scale-110"
                : "cursor-default pointer-events-none"
            )}
            onMouseEnter={() => interactive && setHovered(star)}
            onClick={() => interactive && onChange?.(star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            aria-checked={interactive ? value === star : undefined}
            role={interactive ? "radio" : undefined}
          >
            <FaStar
              className={cn(
                iconClass,
                active ? "text-amber-400" : "text-muted-foreground/30"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

const TourComments = ({ tourId }: TourCommentsProps) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const { data: userData } = useUserInfoQuery(undefined);
  const currentUser = userData?.data;
  const isLoggedIn = Boolean(currentUser?._id);

  const { data: commentsData, isLoading } = useGetCommentsQuery(tourId, {
    skip: !tourId,
  });
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const comments: CommentItem[] = Array.isArray(commentsData?.data)
    ? commentsData.data
    : [];

  const averageRating =
    comments.length > 0
      ? comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length
      : 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) {
      toast.error("Please write a comment");
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error("Please select a star rating");
      return;
    }
    if (!isLoggedIn) {
      toast.error("Please login to comment");
      return;
    }

    try {
      await createComment({
        tour: tourId,
        content: trimmed,
        rating,
      }).unwrap();
      setContent("");
      setRating(5);
      toast.success("Comment posted");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
      toast.success("Comment deleted");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const canDelete = (comment: CommentItem) => {
    if (!currentUser?._id) return false;
    const commentUserId =
      typeof comment.user === "string" ? comment.user : comment.user?._id;
    const isOwner = commentUserId === currentUser._id;
    const isAdmin =
      currentUser.role === "ADMIN" || currentUser.role === "SUPER_ADMIN";
    return isOwner || isAdmin;
  };

  const getUserName = (comment: CommentItem) => {
    if (typeof comment.user === "object" && comment.user?.name) {
      return comment.user.name;
    }
    return "Traveler";
  };

  const getInitial = (comment: CommentItem) => {
    return getUserName(comment).charAt(0).toUpperCase();
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2 pb-3 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">
          Comments
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({comments.length})
          </span>
        </h2>
        {comments.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StarRating value={Math.round(averageRating)} size="sm" />
            <span className="font-medium text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <span>/ 5</span>
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Your rating:</span>
            <StarRating value={rating} onChange={setRating} interactive />
            <span className="text-sm font-medium text-foreground">
              {rating} star{rating > 1 ? "s" : ""}
            </span>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts about this tour..."
            maxLength={1000}
            rows={3}
            disabled={isCreating}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {content.length}/1000
            </p>
            <Button type="submit" disabled={isCreating || !content.trim()}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post comment"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-5 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Login to leave a rating and comment on this tour package.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Login to comment</Link>
          </Button>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No comments yet. Be the first to rate this tour.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                {getInitial(comment)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {getUserName(comment)}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <StarRating value={comment.rating || 0} size="sm" />
                      {comment.createdAt && (
                        <p className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                  {canDelete(comment) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      disabled={isDeleting}
                      onClick={() => handleDelete(comment._id)}
                      aria-label="Delete comment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TourComments;
