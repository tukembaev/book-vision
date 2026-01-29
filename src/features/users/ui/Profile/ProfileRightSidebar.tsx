import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { User } from '@/types/core';

import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { getMockCharacterProfileById } from '@/features/characters/mocks/characterProfilesDb.mock';
import { mockReviewsDb } from '@/features/reviews/mocks/reviewsDb.mock';

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

export function ProfileRightSidebar({ section, profile, user }: ProfileRightSidebarProps) {
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

  if (section === 'read') {
    const favoriteBook = profile.favorites.bookIds[0] ? getMockBookById(profile.favorites.bookIds[0]) : undefined;
    const favoriteCharacter = profile.favorites.characterIds[0]
      ? getMockCharacterProfileById(profile.favorites.characterIds[0])
      : undefined;

    const bestRatedBook = [...profile.favorites.bookIds]
      .map((id) => getMockBookById(id))
      .filter(Boolean)
      .sort((a, b) => ((a?.ratings.average ?? 0) < (b?.ratings.average ?? 0) ? 1 : -1))[0];

    return (
      <Stack gap="4">
        <SocialCard profile={profile} />

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Читательский контекст
          </Heading>
          <Stack mt="3" gap="1">
            <Text opacity={0.85}>Любимая книга: {favoriteBook?.title ?? '—'}</Text>
            <Text opacity={0.85}>Любимый персонаж: {favoriteCharacter?.name ?? '—'}</Text>
            <Text opacity={0.85}>Топ по оценке: {bestRatedBook?.title ?? '—'}</Text>
          </Stack>
        </Box>
      </Stack>
    );
  }

  if (section === 'reviews') {
    const reviewsCount = mockReviewsDb.filter((r) => r.userId === profile.userId).length;

    return (
      <Stack gap="4">
        <SocialCard profile={profile} />

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Отзывы
          </Heading>
          <Stack mt="3" gap="1">
            <Text opacity={0.85}>Всего отзывов: {reviewsCount}</Text>
            <Text fontSize="sm" opacity={0.75}>
              Группировка по книгам — в центре.
            </Text>
          </Stack>
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

  if (section === 'settings') {
    return (
      <Stack gap="4">
        <SocialCard profile={profile} />

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Настройки
          </Heading>
          <Stack mt="3" gap="1">
            <Text opacity={0.85}>Профиль: {user?.privacy.profileVisibility ?? '—'}</Text>
            <Text opacity={0.85}>Активность: {user?.privacy.activityVisibility ?? '—'}</Text>
            <Text fontSize="sm" opacity={0.75}>
              Это mock — без сохранения.
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
