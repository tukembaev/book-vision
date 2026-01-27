import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink';

export interface BooksFeedListItemProps {
  book: Book;
}

export function BooksFeedListItem({ book }: BooksFeedListItemProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Box>
          <AppLink to={`/books/${book.id}`}>
            <Heading as="h3" size="sm" fontWeight="600">
              {book.title}
            </Heading>
          </AppLink>
          <Text mt="1" opacity={0.8}>
            {book.author}
            {book.year ? ` · ${book.year}` : ''}
          </Text>
        </Box>

        <Text opacity={0.85}>{book.description}</Text>

        <Text fontSize="sm" opacity={0.7}>
          Страниц: {book.pagesCount} · Рейтинг: {book.ratings.average} ({book.ratings.count})
        </Text>
      </Stack>
    </Box>
  );
}
