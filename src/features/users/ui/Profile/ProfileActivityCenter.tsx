import { Box, Flex, Heading, Stack, Tabs, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink.tsx';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { mockCommentsDb } from '@/features/comments/mocks/commentsDb.mock';
import { mockReviewsDb } from '@/features/reviews/mocks/reviewsDb.mock';

import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';

export interface ProfileActivityCenterProps {
  userId: string;
  profile: UserProfileDashboard;
}

type ActivityTabKey = 'reviews' | 'comments' | 'reading';

const activityTabs: Array<{ key: ActivityTabKey; title: string }> = [
  { key: 'reviews', title: 'Отзывы' },
  { key: 'comments', title: 'Комментарии' },
  { key: 'reading', title: 'Опыт чтения' },
];

export function ProfileActivityCenter({ userId, profile }: ProfileActivityCenterProps) {
  const reviews = mockReviewsDb
    .filter((r) => r.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const comments = mockCommentsDb
    .filter((c) => c.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const reading = [...profile.reading].sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1));

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Активность
        </Heading>
      </Box>

      <Tabs.Root defaultValue={activityTabs[0]?.key ?? 'reviews'} variant="line">
        <Tabs.List overflowX="auto" overflowY="hidden">
          {activityTabs.map((t) => (
            <Tabs.Trigger key={t.key} value={t.key}>
              {t.title}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="reviews" pt="4">
          {reviews.length === 0 ? (
            <Text opacity={0.8}>Пока нет отзывов (mock).</Text>
          ) : (
            <Stack gap="3">
              {reviews.map((r) => {
                const book = getMockBookById(r.bookId);
                const partId = r.bestParts?.[0];

                return (
                  <Box key={r.id} borderWidth="1px" borderRadius="md" p="3">
                    <Heading as="h4" size="xs" fontWeight="700">
                      {book?.title ?? `Книга ${r.bookId}`} · {r.rating}/10
                    </Heading>
                    <Text mt="1" opacity={0.85}>
                      {r.text}
                    </Text>

                    <Stack mt="2" gap="1">
                      <AppLink to={`/books/${r.bookId}/reviews`} fontSize="sm" opacity={0.85}>
                        Открыть отзывы книги
                      </AppLink>
                      {partId ? (
                        <AppLink to={`/books/${r.bookId}/parts/${partId}`} fontSize="sm" opacity={0.85}>
                          Перейти к главе
                        </AppLink>
                      ) : null}
                      <Text fontSize="sm" opacity={0.7}>
                        {r.createdAt}
                      </Text>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Tabs.Content>

        <Tabs.Content value="comments" pt="4">
          {comments.length === 0 ? (
            <Text opacity={0.8}>Пока нет комментариев (mock).</Text>
          ) : (
            <Stack gap="3">
              {comments.map((c) => {
                const book = getMockBookById(c.bookId);

                return (
                  <Box key={c.id} borderWidth="1px" borderRadius="md" p="3">
                    <Flex align="baseline" justify="space-between" gap="3">
                      <Heading as="h4" size="xs" fontWeight="700">
                        {book?.title ?? `Книга ${c.bookId}`}
                      </Heading>
                      <Text fontSize="xs" opacity={0.7}>
                        {c.createdAt}
                      </Text>
                    </Flex>

                    <Text mt="1" opacity={0.85}>
                      {c.text}
                    </Text>

                    <Stack mt="2" gap="1">
                      <AppLink to={`/books/${c.bookId}`} fontSize="sm" opacity={0.85}>
                        Открыть книгу
                      </AppLink>
                      <Text fontSize="sm" opacity={0.75}>
                        Лайков: {c.likes}
                      </Text>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Tabs.Content>

        <Tabs.Content value="reading" pt="4">
          {reading.length === 0 ? (
            <Text opacity={0.8}>Пока нет записей (mock).</Text>
          ) : (
            <Stack gap="3">
              {reading.map((x) => {
                const book = getMockBookById(x.bookId);

                return (
                  <Box key={`${x.status}-${x.bookId}-${x.startedAt}`} borderWidth="1px" borderRadius="md" p="3">
                    <Heading as="h4" size="xs" fontWeight="700">
                      {book?.title ?? `Книга ${x.bookId}`}
                    </Heading>
                    <Text mt="1" fontSize="sm" opacity={0.8}>
                      Статус: {x.status === 'reading' ? 'читаю' : 'прочитал'}
                    </Text>
                    <Text mt="1" fontSize="sm" opacity={0.75}>
                      {x.startedAt}
                      {x.finishedAt ? ` → ${x.finishedAt}` : ''}
                    </Text>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}
