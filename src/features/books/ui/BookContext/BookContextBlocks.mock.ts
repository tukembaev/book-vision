import type { ComponentProps } from 'react';

import { getMockBookContextByBookId } from '../../mocks/bookContextDb.mock';
import { BookContextBlocks } from './BookContextBlocks';

export const bookContextBlocksMock: ComponentProps<typeof BookContextBlocks> = {
  blocks: getMockBookContextByBookId('1'),
};
