import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Review } from '@/types/core';
import { getMockUserById } from '@/features/users/mocks/usersDb.mock';

export interface ReviewListItemProps {
  review: Review;
}

export function ReviewListItem({ review }: ReviewListItemProps) {
  const user = getMockUserById(review.userId);

  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Box>
          <Heading as="h4" size="xs" fontWeight="600">
            {user?.username ?? 'unknown'}
          </Heading>
          <Text mt="1" fontSize="sm" opacity={0.7}>
            Оценка: {review.rating}/10
          </Text>
        </Box>

        <Text opacity={0.9}>{review.text}</Text>
      </Stack>
    </Box>
  );
}
