import { Box, Heading, Stack, Tabs, Text } from '@chakra-ui/react';

import { ReviewCard } from '@/components/ReviewCard/ReviewCard';
import { mockReviewCards } from '@/components/ReviewCard/mocks/ReviewCard.mock';
import { CommentThread } from '@/features/comments/ui/CommentThread/CommentThread';
import { mockCommentThreads } from '@/features/comments/mocks/commentsThread.mock';

import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';
import { ReadingExperienceCard } from './ReadingExperience/ReadingExperienceCard';
import { mockReadingNotes } from './ReadingExperience/readingExperience.mock';

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
  void userId;
  void profile;

  const sortedNotes = [...mockReadingNotes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

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
          {sortedNotes.length === 0 ? (
            <Text opacity={0.6} fontSize="sm">Пока нет заметок.</Text>
          ) : (
            <Stack gap="3">
              {sortedNotes.map((note) => (
                <ReadingExperienceCard key={note.id} note={note} />
              ))}
            </Stack>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}
