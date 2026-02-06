import { Grid } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import { BooksCatalogListItem } from './BooksCatalogListItem.tsx';

export interface BooksCatalogListProps {
  books: Book[];
}

export function BooksCatalogList({ books }: BooksCatalogListProps) {
  return (
    <Grid
      gap="5"
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
      alignItems="start"
    >
      {books.map((book) => (
        <BooksCatalogListItem key={book.id} book={book} />
      ))}
    </Grid>
  );
}
