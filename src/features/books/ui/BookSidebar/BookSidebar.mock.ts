import type { BookSidebarProps } from './BookSidebar';
import { mockBooksDb } from '../../mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../../mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '@/features/characters/mocks/charactersDb.mock';

const book = mockBooksDb[0];

export const bookSidebarMock: BookSidebarProps = {
  book,
  parts: getMockBookPartsByBookId(book.id),
  characters: getMockBookCharactersByBookId(book.id),
};
