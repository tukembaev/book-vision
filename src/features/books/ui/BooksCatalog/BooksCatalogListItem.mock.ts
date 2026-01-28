import type { ComponentProps } from 'react';

import { mockBooksDb } from '../../mocks/booksDb.mock';
import { BooksCatalogListItem } from './BooksCatalogListItem.tsx';

export const booksCatalogListItemMock: ComponentProps<typeof BooksCatalogListItem> = {
  book: mockBooksDb[0],
};
