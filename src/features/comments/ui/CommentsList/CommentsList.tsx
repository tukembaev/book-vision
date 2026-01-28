import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { getMockComments } from '../../mocks/commentsDb.mock';
import { CommentListItem } from './CommentListItem.tsx';

export interface CommentsListProps {
  bookId: string;
  partId?: string;
}

export function CommentsList({ bookId, partId }: CommentsListProps) {
  const comments = getMockComments({ bookId, partId });

  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Комментарии
      </Heading>
      <Text mt="2" opacity={0.8}>
        Сортировка: лайки + свежесть. Вложенность: 1 уровень (позже).
      </Text>

      <Stack mt="4" gap="3">
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </Stack>
    </Box>
  );
}
