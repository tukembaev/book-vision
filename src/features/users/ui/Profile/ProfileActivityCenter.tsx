import { Box, Heading, Stack, Tabs, Text } from '@chakra-ui/react';

import { ReviewCard } from '@/components/ReviewCard/ReviewCard';
import { mockReviewCards } from '@/components/ReviewCard/mocks/ReviewCard.mock';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { CommentThread } from '@/features/comments/ui/CommentThread/CommentThread';
import { mockCommentThreads } from '@/features/comments/mocks/commentsThread.mock';

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
          <Stack gap="3">
            {mockReviewCards.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Stack>
        </Tabs.Content>

        <Tabs.Content value="comments" pt="4">
          <Box>
            <CommentThread comments={mockCommentThreads} />
          </Box>
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
