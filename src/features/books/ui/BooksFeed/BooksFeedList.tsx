import { Stack } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import { BooksFeedListItem } from './BooksFeedListItem';

export interface BooksFeedListProps {
  books: Book[];
}

export function BooksFeedList({ books }: BooksFeedListProps) {
  return (
    <Stack mt="6" gap="4">
      {books.map((book) => (
        <BooksFeedListItem key={book.id} book={book} />
      ))}
    </Stack>
  );
}
