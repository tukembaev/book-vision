import type { ComponentProps } from 'react';

import { BooksCatalogHeader } from './BooksCatalogHeader.tsx';

export const booksCatalogHeaderMock: ComponentProps<typeof BooksCatalogHeader> = {
  query: 'Отцы',
  onQueryChange: () => undefined,
};
