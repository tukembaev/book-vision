import { Box, Heading } from '@chakra-ui/react';
import { CommentThread } from '@/features/comments/ui/CommentThread/CommentThread';
import type { CommentThreadItem } from '@/features/comments/mocks/commentsThread.mock';

export interface BookDiscussionProps {
  comments: CommentThreadItem[];
  currentUserAvatar?: string;
}

export function BookDiscussion({ comments, currentUserAvatar }: BookDiscussionProps) {
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600" mb="2">
        Обсуждение
      </Heading>
      <CommentThread comments={comments} currentUserAvatar={currentUserAvatar} />
    </Box>
  );
}
