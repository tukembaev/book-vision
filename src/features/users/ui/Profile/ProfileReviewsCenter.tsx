import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink.tsx';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { mockReviewsDb } from '@/features/reviews/mocks/reviewsDb.mock';
import type { Review } from '@/types/core';

export interface ProfileReviewsCenterProps {
  userId: string;
}

export function ProfileReviewsCenter({ userId }: ProfileReviewsCenterProps) {
  const reviews = mockReviewsDb
    .filter((r) => r.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const byBook: Record<string, Review[]> = reviews.reduce<Record<string, Review[]>>((acc, r) => {
    acc[r.bookId] = acc[r.bookId] ?? [];
    acc[r.bookId].push(r);
    return acc;
  }, {});

  const bookIds = Object.keys(byBook);

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Отзывы
        </Heading>
        <Text mt="2" opacity={0.8}>
          Сгруппировано по книгам.
        </Text>
      </Box>

      {bookIds.length === 0 ? (
        <Text opacity={0.8}>Пока нет отзывов (mock).</Text>
      ) : (
        <Stack gap="5">
          {bookIds.map((bookId) => {
            const book = getMockBookById(bookId);
            const items = byBook[bookId];

            return (
              <Box key={bookId}>
                <Heading as="h3" size="sm" fontWeight="600">
                  {book?.title ?? `Книга ${bookId}`}
                </Heading>

                <Stack mt="3" gap="3">
                  {items.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const partId = review.bestParts?.[0];

  return (
    <Box borderWidth="1px" borderRadius="md" p="3">
      <Heading as="h4" size="xs" fontWeight="700">
        Оценка: {review.rating}/10
      </Heading>
      <Text mt="1" opacity={0.85}>
        {review.text}
      </Text>

      <Stack mt="2" gap="1">
        <AppLink to={`/books/${review.bookId}/reviews`} fontSize="sm" opacity={0.85}>
          Открыть отзывы книги
        </AppLink>
        {partId ? (
          <AppLink to={`/books/${review.bookId}/parts/${partId}`} fontSize="sm" opacity={0.85}>
            Перейти к главе
          </AppLink>
        ) : null}
        <Text fontSize="sm" opacity={0.7}>
          {review.createdAt}
        </Text>
      </Stack>
    </Box>
  );
}
