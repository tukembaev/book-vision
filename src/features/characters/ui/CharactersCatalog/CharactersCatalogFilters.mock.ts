import type { ComponentProps } from 'react';

import { mockBooksDb } from '@/features/books/mocks/booksDb.mock';
import { CharactersCatalogFilters } from './CharactersCatalogFilters.tsx';

export const charactersCatalogFiltersMock: ComponentProps<typeof CharactersCatalogFilters> = {
  query: 'Базаров',
  onQueryChange: () => undefined,
  books: mockBooksDb,
  activeBookId: null,
  onBookChange: () => undefined,
  sort: 'popularity',
  onSortChange: () => undefined,
};
