import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink.tsx';
import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';

export interface ProfileOverviewCenterProps {
  profile: UserProfileDashboard;
}

export function ProfileOverviewCenter({ profile }: ProfileOverviewCenterProps) {
  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Обзор
        </Heading>
        <Text mt="2" opacity={0.8}>
          Личная хроника: последние действия и срез статистики.
        </Text>
      </Box>

      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Последние действия
        </Heading>
        {profile.activity.length === 0 ? (
          <Text mt="2" opacity={0.8}>
            Пока нет активности (mock).
          </Text>
        ) : (
          <Stack mt="3" gap="3">
            {profile.activity.map((a) => (
              <Box key={a.id} borderWidth="1px" borderRadius="md" p="3">
                <Heading as="h4" size="xs" fontWeight="700">
                  {a.title}
                </Heading>
                <Text mt="1" opacity={0.85}>
                  {a.text}
                </Text>

                <Stack mt="2" gap="1">
                  {a.bookId ? (
                    <AppLink to={`/books/${a.bookId}`} fontSize="sm" opacity={0.85}>
                      Открыть книгу
                    </AppLink>
                  ) : null}
                  {a.bookId && a.partId ? (
                    <AppLink
                      to={`/books/${a.bookId}/parts/${a.partId}`}
                      fontSize="sm"
                      opacity={0.85}
                    >
                      Открыть главу
                    </AppLink>
                  ) : null}
                  <Text fontSize="sm" opacity={0.7}>
                    Лайков: {a.likes} · Verified: {a.verification}
                  </Text>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
