import { Box, Heading, Text } from '@chakra-ui/react';

import type { Book } from '@/types/core';

export interface BookTitleBlockProps {
  book: Book;
}

export function BookTitleBlock({ book }: BookTitleBlockProps) {
  return (
    <Box>
      <Heading as="h2" size="lg" fontWeight="700">
        {book.title}
      </Heading>
      <Text mt="1" opacity={0.8}>
        {book.author}
        {book.year ? ` · ${book.year}` : ''}
      </Text>
    </Box>
  );
}
