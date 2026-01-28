import { Box, Button, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import type { CharacterSort } from '../../mocks/characterProfilesDb.mock';

export interface CharactersCatalogFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;

  books: Book[];
  activeBookId: string | null;
  onBookChange: (bookId: string | null) => void;

  sort: CharacterSort;
  onSortChange: (value: CharacterSort) => void;
}

export function CharactersCatalogFilters({
  query,
  onQueryChange,
  books,
  activeBookId,
  onBookChange,
  sort,
  onSortChange,
}: CharactersCatalogFiltersProps) {
  return (
    <Stack gap="4">
      <Box>
        <Text fontSize="sm" opacity={0.8}>
          Поиск по имени или прозвищу
        </Text>
        <Input
          mt="2"
          value={query}
          onChange={(e) => onQueryChange(e.currentTarget.value)}
          placeholder="Например: Воланд"
        />
      </Box>

      <Box>
        <Heading as="h3" size="xs" fontWeight="600">
          Книга
        </Heading>
        <Flex mt="2" gap="2" wrap="wrap">
          <Button
            size="sm"
            variant={!activeBookId ? 'solid' : 'outline'}
            onClick={() => onBookChange(null)}
          >
            все
          </Button>
          {books.map((b) => (
            <Button
              key={b.id}
              size="sm"
              variant={activeBookId === b.id ? 'solid' : 'outline'}
              onClick={() => onBookChange(b.id)}
            >
              {b.title}
            </Button>
          ))}
        </Flex>
      </Box>

      <Box>
        <Heading as="h3" size="xs" fontWeight="600">
          Сортировка
        </Heading>
        <Flex mt="2" gap="2" wrap="wrap">
          <Button
            size="sm"
            variant={sort === 'popularity' ? 'solid' : 'outline'}
            onClick={() => onSortChange('popularity')}
          >
            популярность
          </Button>
          <Button
            size="sm"
            variant={sort === 'favorites' ? 'solid' : 'outline'}
            onClick={() => onSortChange('favorites')}
          >
            избранное
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
