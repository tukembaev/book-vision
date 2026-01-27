import type { BookTocNavProps } from './BookTocNav';
import { mockBooksDb } from '../../mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../../mocks/bookPartsDb.mock';

export const bookTocNavMock: BookTocNavProps = {
  book: mockBooksDb[0],
  parts: getMockBookPartsByBookId(mockBooksDb[0].id),
  activePartId: getMockBookPartsByBookId(mockBooksDb[0].id)[0]?.id,
};
