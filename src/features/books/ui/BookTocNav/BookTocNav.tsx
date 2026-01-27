import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import type { Book, BookPart } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink';

export interface BookTocNavProps {
  book: Book;
  parts: BookPart[];
  activePartId?: string;
}

export function BookTocNav({ book, parts, activePartId }: BookTocNavProps) {
  return (
    <Stack gap="4">
      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Структура
        </Heading>
        <Text mt="1" opacity={0.8}>
          {book.title}
        </Text>
      </Box>

      <Stack gap="2">
        {parts.map((part) => {
          const isActive = activePartId === part.id;

          return (
            <Box key={part.id}>
              <AppLink
                to={`/books/${book.id}/parts/${part.id}`}
                fontWeight={isActive ? '600' : '400'}
                opacity={isActive ? 1 : 0.85}
              >
                {part.order}. {part.title}
              </AppLink>
              <Text mt="1" fontSize="sm" opacity={0.7}>
                {part.pageStart && part.pageEnd
                  ? `${part.pageStart}–${part.pageEnd}`
                  : '—'}
              </Text>
            </Box>
          );
        })}
      </Stack>

      <Box>
        <Heading as="h4" size="xs" fontWeight="600">
          Разделы
        </Heading>
        <Stack mt="2" gap="2">
          <AppLink to={`/books/${book.id}`} opacity={0.85}>
            Описание и обсуждение
          </AppLink>
          <AppLink to={`/books/${book.id}/characters`} opacity={0.85}>
            Персонажи
          </AppLink>
          <AppLink to={`/books/${book.id}/reviews`} opacity={0.85}>
            Отзывы
          </AppLink>
        </Stack>
      </Box>
    </Stack>
  );
}
