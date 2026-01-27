import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Review } from '@/types/core';
import { ReviewListItem } from './ReviewListItem';

export interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Список отзывов
      </Heading>
      <Text mt="2" opacity={0.8}>
        Пока это просто текстовые отзывы. Позже сюда подключим форму «Я прочёл».
      </Text>

      <Stack mt="4" gap="3">
        {reviews.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </Stack>
    </Box>
  );
}
