import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { getMockUserById } from '@/features/users/mocks/usersDb.mock';
import { MiniAvatarCircle } from './MiniAvatarCircle.tsx';

export interface CharacterFavoritesUsersProps {
  userIds: string[];
}

export function CharacterFavoritesUsers({ userIds }: CharacterFavoritesUsersProps) {
  const users = userIds.map((id) => getMockUserById(id)).filter(Boolean);

  return (
    <Box>
      <Heading as="h4" size="xs" fontWeight="600">
        В избранном у
      </Heading>

      {users.length === 0 ? (
        <Text mt="2" fontSize="sm" opacity={0.8}>
          Пока никто не добавил (mock).
        </Text>
      ) : (
        <Flex mt="2" gap="2" wrap="wrap">
          {users.map((u) => (
            <MiniAvatarCircle key={u!.id} name={u!.username} />
          ))}
        </Flex>
      )}
    </Box>
  );
}
