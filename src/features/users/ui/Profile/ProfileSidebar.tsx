import { Box, Flex, Heading, Image, Popover, Separator, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import type { User } from '@/types/core';
import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';

import { ProfileIdentityCard } from './ProfileIdentityCard.tsx';
import { getCommunityHelpStats } from '../../mocks/userProfileDb.mock';

export interface ProfileSidebarProps {
  user: User;
  profile: UserProfileDashboard;
  isSelf: boolean;
}

export function ProfileSidebar({
  user,
  profile,
  isSelf,
}: ProfileSidebarProps) {
  const [openedAchievementId, setOpenedAchievementId] = useState<string | null>(null);

  const achievementItems = useMemo(() => {
    return [...profile.achievements].sort((a, b) => (a.earnedAt < b.earnedAt ? 1 : -1));
  }, [profile.achievements]);

  const communityStats = useMemo(() => getCommunityHelpStats(profile), [profile]);

  const reputation = communityStats.totalLikes;
  const postsCount = profile.activity.length;

  return (
    <Box
      height={{ base: 'auto', lg: 'calc(100vh - 96px)' }}
      overflowY={{ base: 'visible', lg: 'hidden' }}
    >
      <Stack gap="4">
        <ProfileIdentityCard user={user} profile={profile} isSelf={isSelf} />

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Социальное
          </Heading>

          <Stack mt="3" gap="2">
            <SocialRow label="Подписчики" value={profile.social.followersUserIds.length} />
            <Separator />
            <SocialRow label="Подписки" value={profile.social.followingUserIds.length} />
            <Separator />
            <SocialRow label="Кол-во постов" value={postsCount} />
            <Separator />
            <SocialRow label="Репутация" value={reputation} />
          </Stack>
        </Box>

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Достижения
          </Heading>

          {achievementItems.length === 0 ? (
            <Text mt="2" opacity={0.8}>
              Пока нет достижений (mock).
            </Text>
          ) : (
            <Flex mt="3" gap="2" wrap="wrap">
              {achievementItems.map((a) => {
                const isOpen = openedAchievementId === a.id;

                return (
                  <Popover.Root
                    key={a.id}
                    open={isOpen}
                    onOpenChange={(details) => setOpenedAchievementId(details.open ? a.id : null)}
                    positioning={{ placement: 'right-start', offset: { mainAxis: 8, crossAxis: 0 } }}
                  >
                    <Popover.Trigger asChild>
                      <Box
                        onMouseEnter={() => setOpenedAchievementId(a.id)}
                        onMouseLeave={() => setOpenedAchievementId((prev) => (prev === a.id ? null : prev))}
                        borderWidth="1px"
                        borderRadius="md"
                        p="1"
                        cursor="default"
                      >
                        <Image
                          src={achievementIconSrc(a.title, a.rarity)}
                          alt={a.title}
                          boxSize="24px"
                        />
                      </Box>
                    </Popover.Trigger>

                    <Popover.Positioner>
                      <Popover.Content>
                        <Popover.Arrow>
                          <Popover.ArrowTip />
                        </Popover.Arrow>
                        <Popover.Body>
                          <Popover.Title fontWeight="700">{a.title}</Popover.Title>
                          <Text mt="1" fontSize="sm" opacity={0.85}>
                            {a.description}
                          </Text>
                          <Text mt="2" fontSize="xs" opacity={0.7}>
                            Редкость: {a.rarity} · {a.earnedAt}
                          </Text>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Popover.Root>
                );
              })}
            </Flex>
          )}
        </Box>

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Избранное
          </Heading>
          <Stack mt="3" gap="1">
            <Text opacity={0.85}>Книг: {profile.favorites.bookIds.length}</Text>
            <Text opacity={0.85}>Персонажей: {profile.favorites.characterIds.length}</Text>
            <Text opacity={0.85}>Цитат: {profile.favorites.quoteIds.length}</Text>
          </Stack>
        </Box>

        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            Краткая статистика
          </Heading>
          <Stack mt="3" gap="1">
            <Text opacity={0.85}>Книг прочитано: {user.stats.booksRead}</Text>
            <Text opacity={0.85}>Отзывов: {user.stats.reviewsCount}</Text>
            <Text opacity={0.85}>Лайков получено: {user.stats.likesReceived}</Text>
            <Text opacity={0.85}>Вкладов в сообщество: {profile.contributions.length}</Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

function SocialRow({ label, value }: { label: string; value: number }) {
  return (
    <Flex justify="space-between" align="center">
      <Text opacity={0.85}>{label}</Text>
      <Text fontWeight="700">{value}</Text>
    </Flex>
  );
}

function achievementIconSrc(title: string, rarity: 'common' | 'rare' | 'epic') {
  const letter = title.trim().slice(0, 1).toUpperCase() || '★';
  const bg = rarity === 'epic' ? '#805AD5' : rarity === 'rare' ? '#3182CE' : '#718096';
  const fg = '#FFFFFF';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" rx="6" fill="${bg}" /><text x="12" y="16" text-anchor="middle" font-size="12" font-family="system-ui, -apple-system, Segoe UI, Roboto" fill="${fg}">${letter}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
