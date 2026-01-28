import type { ComponentProps } from 'react';

import { getMockBookWordsByBookId } from '../../mocks/bookContextDb.mock';
import { BookWordsList } from './BookWordsList';

export const bookWordsListMock: ComponentProps<typeof BookWordsList> = {
  words: getMockBookWordsByBookId('1'),
};
