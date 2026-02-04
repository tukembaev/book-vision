import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { User } from '@/types/core';

import {
  getCommunityHelpStats,
  type ProfileSection,
  type UserProfileDashboard,
} from '../../mocks/userProfileDb.mock';

export interface ProfileRightSidebarProps {
  section: ProfileSection;
  profile: UserProfileDashboard;
  user?: User;
}

export function ProfileRightSidebar({ section, profile, user: _user }: ProfileRightSidebarProps) {
  void _user;
  if (section === 'help') {
    const stats = getCommunityHelpStats(profile);

    const top = [...profile.contributions].sort((a, b) => (a.likes < b.likes ? 1 : -1)).slice(0, 3);

    return (
      <Stack gap="4">
        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Репутация
          </Heading>
          <Stack mt="3" gap="1">
            <Text opacity={0.85}>Подтверждено ИИ: {stats.aiVerified}</Text>
            <Text opacity={0.85}>Подтверждено сообществом: {stats.communityVerified}</Text>
            <Text opacity={0.85}>Лайков на вклад: {stats.totalLikes}</Text>
            <Text opacity={0.75} fontSize="sm">
              Лидерборд: заглушка (mock).
            </Text>
          </Stack>
        </Box>

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Топ вкладов
          </Heading>
          {top.length === 0 ? (
            <Text mt="2" opacity={0.8}>
              Пока пусто.
            </Text>
          ) : (
            <Stack mt="3" gap="2">
              {top.map((t) => (
                <Box key={t.id} borderWidth="1px" borderRadius="md" p="2">
                  <Text fontWeight="700" fontSize="sm">
                    {t.title}
                  </Text>
                  <Text mt="1" fontSize="xs" opacity={0.75}>
                    Лайков: {t.likes} · Verified: {t.verification}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    );
  }

  if (section === 'challenges') {
    return (
      <Stack gap="4">
        <SocialCard profile={profile} />

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Прогресс
          </Heading>
          <Stack mt="3" gap="1">
            <Text fontSize="sm" opacity={0.75}>
              Детали прогресса — в центре (mock).
            </Text>
          </Stack>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack gap="4">
      <SocialCard profile={profile} />

      <Box borderWidth="1px" borderRadius="md" p="4">
        <Heading as="h3" size="sm" fontWeight="600">
          Контекст
        </Heading>
        <Stack mt="3" gap="1">
          <Text opacity={0.75} fontSize="sm">
            Последние лайки его вкладов: заглушка (mock).
          </Text>
          <Text opacity={0.75} fontSize="sm">
            Краткий рейтинг/место в лидерборде: заглушка (mock).
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}

function SocialCard({ profile }: { profile: UserProfileDashboard }) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Heading as="h3" size="sm" fontWeight="600">
        Социальное
      </Heading>
      <Stack mt="3" gap="1">
        <Text opacity={0.85}>Подписчики: {profile.social.followersUserIds.length}</Text>
        <Text opacity={0.85}>Подписки: {profile.social.followingUserIds.length}</Text>
      </Stack>
    </Box>
  );
}
