import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import type { CommentThreadItem } from '../../mocks/commentsThread.mock';
import { CommentInput } from './CommentInput';
import { CommentRow } from './CommentRow';
import { ExpandedThread } from './ExpandedThread';

export interface CommentThreadListProps {
  comments: CommentThreadItem[];
  currentUserAvatar?: string;
}

/* ── Main exported component ── */
export function CommentThread({ comments, currentUserAvatar }: CommentThreadListProps) {
  const [expandedComment, setExpandedComment] = useState<CommentThreadItem | null>(null);

  if (expandedComment) {
    return (
      <ExpandedThread
        comment={expandedComment}
        onBack={() => setExpandedComment(null)}
      />
    );
  }

  return (
    <Box border="1px solid #ccc" borderRadius="md">
      {/* Input */}
      <CommentInput currentUserAvatar={currentUserAvatar} />

      {/* Comments list */}
      {comments.map((comment) => (
        <Box key={comment.id} borderBottomWidth="1px" pt='2'>
          {/* Parent comment */}
          <Box
            cursor="pointer"
            transition="background 0.15s"
            px="2"
            onClick={() => setExpandedComment(comment)}
          >
            <CommentRow
              comment={comment}
              hasReply={!!comment.popularReply}
            />
          </Box>

          {/* Popular reply preview */}
          {comment.popularReply && (
            <Box
              cursor="pointer"
         
              transition="background 0.15s"
              px='3'
              pb='2'
              onClick={(e) => {
                e.stopPropagation();
                if (comment.popularReply) setExpandedComment(comment.popularReply);
              }}
            >
              <CommentRow comment={comment.popularReply} isReply />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
