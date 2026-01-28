import type { ComponentProps } from 'react';

import { getMockBookReadingTipsByBookId } from '../../mocks/bookContextDb.mock';
import { BookReadingTips } from './BookReadingTips';

export const bookReadingTipsMock: ComponentProps<typeof BookReadingTips> = {
  tips: getMockBookReadingTipsByBookId('1'),
};
