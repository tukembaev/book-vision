import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink.tsx';
import type { UserProfileDashboard, UserActivityItem, UserActivityType } from '../../mocks/userProfileDb.mock';

export interface ProfileHelpCenterProps {
  profile: UserProfileDashboard;
}

const blocks: { type: UserActivityType; title: string }[] = [
  { type: 'word', title: '📖 Пояснения слов' },
  { type: 'comment', title: '💬 Комментарии (полезно)' },
  { type: 'quote', title: '✍️ Цитаты' },
  { type: 'context', title: '🧠 Контекст / факты' },
];

export function ProfileHelpCenter({ profile }: ProfileHelpCenterProps) {
  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Помощь сообществу
        </Heading>
        <Text mt="2" opacity={0.8}>
          Портфолио вкладов: verified статусы, лайки и быстрые ссылки.
        </Text>
      </Box>

      {blocks.map((b) => {
        const items = profile.contributions.filter((c) => c.type === b.type);

        return (
          <Box key={b.type}>
            <Heading as="h3" size="sm" fontWeight="600">
              {b.title}
            </Heading>

            {items.length === 0 ? (
              <Text mt="2" opacity={0.8}>
                Пока пусто (mock).
              </Text>
            ) : (
              <Stack mt="3" gap="3">
                {items.map((item) => (
                  <ContributionCard key={item.id} item={item} />
                ))}
              </Stack>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}

function ContributionCard({ item }: { item: UserActivityItem }) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="3">
      <Heading as="h4" size="xs" fontWeight="700">
        {item.title}
      </Heading>
      <Text mt="1" opacity={0.85}>
        {item.text}
      </Text>

      <Stack mt="2" gap="1">
        <Text fontSize="sm" opacity={0.75}>
          Verified: {item.verification} · Лайков: {item.likes}
        </Text>

        {item.bookId ? (
          <AppLink to={`/books/${item.bookId}`} fontSize="sm" opacity={0.85}>
            Книга
          </AppLink>
        ) : null}

        {item.bookId && item.partId ? (
          <AppLink to={`/books/${item.bookId}/parts/${item.partId}`} fontSize="sm" opacity={0.85}>
            Глава
          </AppLink>
        ) : null}
      </Stack>
    </Box>
  );
}
