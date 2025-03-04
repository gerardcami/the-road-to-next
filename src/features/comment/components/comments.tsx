"use client";

import { useState } from "react";

import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { PaginatedData } from "@/types/pagination";

import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(
      ticketId,
      paginatedComments.metadata.cursor
    );
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    if (!comment) return;

    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
      <div>
        <Button variant="ghost" onClick={handleMore}>
          More
        </Button>
      </div>
    </>
  );
};

export { Comments };
