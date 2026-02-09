import { Box, Button, Flex, Grid, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import {
  getMockCharactersCatalogEntries,
  getFeaturedCharacter,
  getPopularCharacters,
  getCharactersByBook,
  getRandomQuotes,
  type CharacterSort,
} from '../features/characters/mocks/characterProfilesDb.mock';

import { FeaturedCharacterHero } from '../features/characters/ui/FeaturedCharacterHero/FeaturedCharacterHero';

import { CharacterCatalogCard } from '../features/characters/ui/CharacterCatalogCard/CharacterCatalogCard';
import { CharactersByBookWidget } from '../features/characters/ui/CharactersByBookWidget/CharactersByBookWidget';
import { RandomQuoteWidget } from '../features/characters/ui/RandomQuoteWidget/RandomQuoteWidget';
import { PopularCharactersRow } from '@/features/characters/ui/PopularCharactersRow/PopularCharactersRow';

export default function CharactersPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<CharacterSort>('popularity');

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();

    return getMockCharactersCatalogEntries()
      .filter((c) => {
        const matchesQuery =
          q.length === 0 ||
          c.name.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q));
        return matchesQuery;
      })
      .sort((a, b) => {
        if (sort === 'favorites') {
          return b.favoritesCount - a.favoritesCount || b.popularityScore - a.popularityScore;
        }
        return b.popularityScore - a.popularityScore || b.favoritesCount - a.favoritesCount;
      });
  }, [query, sort]);

  const featured = useMemo(() => getFeaturedCharacter(), []);
  const popular = useMemo(() => getPopularCharacters(), []);
  const byBook = useMemo(() => getCharactersByBook(), []);
  const quotes = useMemo(() => getRandomQuotes(), []);

  return (
    <Box maxW="1200px" mx="auto" px="4" py="6">
      <Stack gap="8">
        {/* Page header */}
        <Box>
          <Heading as="h2" fontSize="2xl" fontWeight="800">
            Персонажи
          </Heading>
          <Text mt="1" fontSize="sm" color="gray.500">
            Каталог героев из книг — ищи по имени, сортируй и открывай профили
          </Text>
        </Box>

        {/* Featured character — full-width hero */}
        <FeaturedCharacterHero character={featured} />

        {/* Popular characters row */}
        <PopularCharactersRow characters={popular} />

        {/* Divider */}
        <Box borderTopWidth="1px" borderColor="gray.200" />

        {/* Catalog section: search + sort + grid (left) + widgets (right) */}
        <Flex gap="6" direction={{ base: 'column', lg: 'row' }} align="flex-start">
          {/* Left — Catalog */}
          <Box flex="3" minW="0">
            <Stack gap="4">
              {/* Search & sort bar */}
              <Flex gap="3" direction={{ base: 'column', sm: 'row' }} align={{ sm: 'center' }}>
                <Input
                  flex="1"
                  size="sm"
                  value={query}
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  placeholder="Поиск по имени или прозвищу…"
                />
                <Flex gap="2" flexShrink={0}>
                  <Button
                    size="sm"
                    variant={sort === 'popularity' ? 'solid' : 'outline'}
                    onClick={() => setSort('popularity')}
                  >
                    Популярность
                  </Button>
                  <Button
                    size="sm"
                    variant={sort === 'favorites' ? 'solid' : 'outline'}
                    onClick={() => setSort('favorites')}
                  >
                    Избранное
                  </Button>
                </Flex>
              </Flex>

              {/* Cards grid */}
              {entries.length === 0 ? (
                <Box borderWidth="1px" borderRadius="lg" p="6" textAlign="center">
                  <Text color="gray.500">Персонажи не найдены.</Text>
                </Box>
              ) : (
                <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                  gap="4"
                >
                  {entries.map((entry) => (
                    <CharacterCatalogCard key={entry.id} entry={entry} />
                  ))}
                </Grid>
              )}
            </Stack>
          </Box>

          {/* Right — Sidebar widgets */}
          <Box
            flex="1.2"
            minW="280px"
            position={{ lg: 'sticky' }}
            top={{ lg: '80px' }}
          >
            <Stack gap="4">
              <RandomQuoteWidget quotes={quotes} />
              <CharactersByBookWidget groups={byBook} />
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
