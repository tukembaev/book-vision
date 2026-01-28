import { Grid } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import { BooksCatalogListItem } from './BooksCatalogListItem.tsx';

export interface BooksCatalogListProps {
  books: Book[];
}

export function BooksCatalogList({ books }: BooksCatalogListProps) {
  return (
    <Grid
      gap="4"
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
      alignItems="stretch"
    >
      {books.map((book) => (
        <BooksCatalogListItem key={book.id} book={book} />
      ))}
    </Grid>
  );
}
