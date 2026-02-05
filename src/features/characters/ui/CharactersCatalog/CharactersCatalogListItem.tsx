import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { CharacterCatalogEntry } from '../../mocks/characterProfilesDb.mock';

export interface CharactersCatalogListItemProps {
  entry: CharacterCatalogEntry;
}

export function CharactersCatalogListItem({ entry }: CharactersCatalogListItemProps) {
  const book = getMockBookById(entry.bookId);

  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Box>
          <AppLink to={`/characters/${entry.id}`}>
            <Heading as="h3" size="sm" fontWeight="600">
              {entry.name}
            </Heading>
          </AppLink>
          <Text mt="1" opacity={0.8}>
            {entry.aliases.filter((a) => a && a !== '—').join(', ') || '—'}
          </Text>
          <Text mt="1" fontSize="sm" opacity={0.7}>
            Книга: {book?.title ?? '—'}
          </Text>
        </Box>

        <Text opacity={0.85}>{entry.descriptionNoSpoilers}</Text>

        <Text fontSize="sm" opacity={0.7}>
          Популярность: {entry.popularityScore} · В избранном: {entry.favoritesCount}
        </Text>
      </Stack>
    </Box>
  );
}
