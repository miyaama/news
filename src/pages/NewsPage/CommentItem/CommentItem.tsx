import React from "react";
import { useState } from "react";
import { Comment, Avatar } from "antd";

import type { CommentType } from "../../../shared/types";

interface Props {
  comment: CommentType;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const { author, content, avatar, subs, datetime, deleted } = comment;

  const [isSubsOpen, setIsSubsOpen] = useState(false);

  const toggleSubComments = () => setIsSubsOpen((state) => !state);

  const hasSubComments = subs.length;

  const actions = hasSubComments
    ? [
        <span onClick={toggleSubComments}>{`${
          isSubsOpen ? "Close" : "Open"
        } replies`}</span>,
      ]
    : [];

  return (
    <Comment
      actions={actions}
      author={author}
      avatar={<Avatar src={avatar} alt="Han Solo" />}
      datetime={datetime}
      content={
        deleted ? (
          "Comment has been deleted"
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )
      }
    >
      {hasSubComments &&
        isSubsOpen &&
        subs.map((subComment) => (
          <CommentItem comment={subComment} key={subComment.id} />
        ))}
    </Comment>
  );
};
export default CommentItem;
