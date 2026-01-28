import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import type { CharacterProfile } from '@/types/core';

import { CharacterFavoritesUsers } from './CharacterFavoritesUsers.tsx';

export interface CharacterRightSidebarProps {
  character: CharacterProfile;
}

export function CharacterRightSidebar({ character }: CharacterRightSidebarProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Stack gap="4">
      <Box borderWidth="1px" borderRadius="md" p="4">
        <Heading as="h3" size="sm" fontWeight="600">
          Действия
        </Heading>

        <Button
          mt="3"
          w="full"
          variant={isFavorite ? 'solid' : 'outline'}
          onClick={() => setIsFavorite((v) => !v)}
        >
          {isFavorite ? 'В избранном' : 'В избранное'}
        </Button>

        <Text mt="2" fontSize="sm" opacity={0.7}>
          Это локальное состояние (mock).
        </Text>
      </Box>

      <Box borderWidth="1px" borderRadius="md" p="4">
        <CharacterFavoritesUsers userIds={character.favoritedByUserIds} />
      </Box>
    </Stack>
  );
}
