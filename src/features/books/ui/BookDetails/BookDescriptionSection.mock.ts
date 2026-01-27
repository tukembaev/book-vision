import type { BookDescriptionSectionProps } from './BookDescriptionSection';
import { mockBooksDb } from '../../mocks/booksDb.mock';

export const bookDescriptionSectionMock: BookDescriptionSectionProps = {
  description: mockBooksDb[0].description,
};
