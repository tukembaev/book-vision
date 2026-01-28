import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Book, CharacterProfile } from '@/types/core';

export interface CharacterLeftSidebarProps {
  character: CharacterProfile;
  book?: Book;
}

export function CharacterLeftSidebar({ character, book }: CharacterLeftSidebarProps) {
  return (
    <Stack gap="4">
      <Box borderWidth="1px" borderRadius="md" p="4">
        <Heading as="h3" size="sm" fontWeight="600">
          {character.name}
        </Heading>
        <Text mt="2" opacity={0.8}>
          Изображение персонажа (mock)
        </Text>
      </Box>

      <Box borderWidth="1px" borderRadius="md" p="4">
        <Heading as="h4" size="xs" fontWeight="600">
          Карточка
        </Heading>
        <Stack mt="2" gap="1">
          <Text opacity={0.85}>Возраст: {character.stats.age ?? '—'}</Text>
          <Text opacity={0.85}>Рост: {character.stats.height ?? '—'}</Text>
          <Text opacity={0.85}>Вес: {character.stats.weight ?? '—'}</Text>
          <Text opacity={0.85}>Статус: {character.stats.socialStatus ?? '—'}</Text>
          <Text opacity={0.85}>Книга: {book?.title ?? '—'}</Text>
        </Stack>
      </Box>
    </Stack>
  );
}
