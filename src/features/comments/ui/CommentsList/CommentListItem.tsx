import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Comment } from '@/types/core';
import { getMockUserById } from '@/features/users/mocks/usersDb.mock';

export interface CommentListItemProps {
  comment: Comment;
}

export function CommentListItem({ comment }: CommentListItemProps) {
  const user = getMockUserById(comment.userId);

  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Box>
          <Heading as="h4" size="xs" fontWeight="600">
            {user?.username ?? 'unknown'}
          </Heading>
          <Text mt="1" fontSize="sm" opacity={0.7}>
            Лайки: {comment.likes}
          </Text>
        </Box>

        <Text opacity={0.9}>{comment.text}</Text>
      </Stack>
    </Box>
  );
}
