import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { mockBooksDb } from '@/features/books/mocks/booksDb.mock';
import {
  getMockCharactersCatalogEntries,
  type CharacterSort,
} from '../mocks/characterProfilesDb.mock';

import { CharactersCatalogFilters } from '../ui/CharactersCatalog/CharactersCatalogFilters.tsx';
import { CharactersCatalogList } from '../ui/CharactersCatalog/CharactersCatalogList.tsx';

export default function CharactersPage() {
  const [query, setQuery] = useState('');
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [sort, setSort] = useState<CharacterSort>('popularity');

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();

    return getMockCharactersCatalogEntries()
      .filter((c) => {
        const matchesBook = !activeBookId || c.bookId === activeBookId;
        const matchesQuery =
          q.length === 0 ||
          c.name.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q));

        return matchesBook && matchesQuery;
      })
      .slice()
      .sort((a, b) => {
        if (sort === 'favorites') {
          return b.favoritesCount - a.favoritesCount || b.popularityScore - a.popularityScore;
        }
        return b.popularityScore - a.popularityScore || b.favoritesCount - a.favoritesCount;
      });
  }, [activeBookId, query, sort]);

  return (
    <Stack gap="4">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Персонажи
        </Heading>
        <Text mt="2" opacity={0.8}>
          Поиск по имени/прозвищу, фильтр по книге, сортировка (mock).
        </Text>
      </Box>

      <CharactersCatalogFilters
        query={query}
        onQueryChange={setQuery}
        books={mockBooksDb}
        activeBookId={activeBookId}
        onBookChange={setActiveBookId}
        sort={sort}
        onSortChange={setSort}
      />

      <CharactersCatalogList entries={entries} />
    </Stack>
  );
}
