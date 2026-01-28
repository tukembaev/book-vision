import type { ComponentProps } from 'react';

import { mockBooksDb } from '../../mocks/booksDb.mock';
import { BooksCatalogList } from './BooksCatalogList.tsx';

export const booksCatalogListMock: ComponentProps<typeof BooksCatalogList> = {
  books: mockBooksDb,
};
