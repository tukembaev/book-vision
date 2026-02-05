import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Book, BookPart, Character } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getAveragePartRating } from '../../utils/getAveragePartRating';

export interface BookSidebarProps {
  book: Book;
  parts: BookPart[];
  characters: Character[];
}

export function BookSidebar({ book, parts, characters }: BookSidebarProps) {
  const topCharacters = characters.slice(0, 3);
  const avgPartRating = getAveragePartRating(parts);

  return (
    <Stack gap="4">
      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Информация
        </Heading>
        <Stack mt="2" gap="1">
          <Text opacity={0.85}>Страниц: {book.pagesCount}</Text>
          <Text opacity={0.85}>Теги: {book.tags.join(', ') || '—'}</Text>
          <Text opacity={0.85}>
            Верификация: {book.status.verified ? 'да' : 'нет'}
            {book.status.verificationType ? ` (${book.status.verificationType})` : ''}
          </Text>
        </Stack>
      </Box>

      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Персонажи
        </Heading>
        <Stack mt="2" gap="1">
          {topCharacters.map((c) => (
            <Text key={c.id} opacity={0.85}>
              {c.name}
            </Text>
          ))}
          <AppLink to={`/books/${book.id}/characters`} opacity={0.85}>
            Все персонажи
          </AppLink>
        </Stack>
      </Box>

      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Статистика
        </Heading>
        <Stack mt="2" gap="1">
          <Text opacity={0.85}>
            Рейтинг книги: {book.ratings.average} ({book.ratings.count})
          </Text>
          <Text opacity={0.85}>
            Средняя оценка частей: {avgPartRating ?? '—'}
          </Text>
        </Stack>
      </Box>

      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Плейлисты
        </Heading>
        <Stack mt="2" gap="1">
          <Text opacity={0.8}>
            Позже: пользовательские и auto-suggested по mood.
          </Text>
          <AppLink to={`/books/${book.id}/playlists`} opacity={0.85}>
            Открыть плейлисты
          </AppLink>
        </Stack>
      </Box>
    </Stack>
  );
}
