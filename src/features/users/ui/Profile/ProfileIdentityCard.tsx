import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';

import type { User } from '@/types/core';
import type { UserProfileDashboard } from '../../mocks/userProfileDb.mock';

import { UserAvatarCircle } from './UserAvatarCircle.tsx';

export interface ProfileIdentityCardProps {
  user: User;
  profile: UserProfileDashboard;
  isSelf: boolean;
}

export function ProfileIdentityCard({ user, profile, isSelf }: ProfileIdentityCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="3">
        <UserAvatarCircle name={user.username} />

        <Box>
          <Heading as="h2" size="md" fontWeight="700">
            {user.username}
          </Heading>

          {profile.status ? (
            <Text mt="1" opacity={0.85}>
              {profile.status}
            </Text>
          ) : null}

          <Text mt="2" fontSize="sm" opacity={0.75}>
            {profile.rank ? profile.rank : 'Ранг: —'}
            {profile.level ? ` · Уровень ${profile.level}` : ''}
          </Text>
        </Box>

        <Button size="sm" variant={isSelf ? 'outline' : 'solid'}>
          {isSelf ? 'Редактировать профиль' : 'Подписаться'}
        </Button>
      </Stack>
    </Box>
  );
}
