import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { User } from '@/types/core';

export interface UserStatsCardProps {
  user: User;
}

export function UserStatsCard({ user }: UserStatsCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Heading as="h3" size="sm" fontWeight="600">
        Статистика
      </Heading>
      <Stack mt="3" gap="1">
        <Text opacity={0.85}>Книг прочитано: {user.stats.booksRead}</Text>
        <Text opacity={0.85}>Отзывов: {user.stats.reviewsCount}</Text>
        <Text opacity={0.85}>Лайков получено: {user.stats.likesReceived}</Text>
      </Stack>

      <Heading as="h3" size="sm" fontWeight="600" mt="5">
        Приватность
      </Heading>
      <Stack mt="3" gap="1">
        <Text opacity={0.85}>Профиль: {user.privacy.profileVisibility}</Text>
        <Text opacity={0.85}>Активность: {user.privacy.activityVisibility}</Text>
      </Stack>
    </Box>
  );
}
