import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Character } from '@/types/core';
import { CharacterListItem } from './CharacterListItem.tsx';

export interface CharactersListProps {
  characters: Character[];
}

export function CharactersList({ characters }: CharactersListProps) {
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Список персонажей
      </Heading>
      <Text mt="2" opacity={0.8}>
        Shikimori-like: базовая карточка + статус источника.
      </Text>

      <Stack mt="4" gap="3">
        {characters.map((character) => (
          <CharacterListItem key={character.id} character={character} />
        ))}
      </Stack>
    </Box>
  );
}
