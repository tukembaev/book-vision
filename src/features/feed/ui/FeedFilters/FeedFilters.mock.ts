import type { ComponentProps } from 'react';

import { FeedFilters } from './FeedFilters.tsx';

export const feedFiltersMock: ComponentProps<typeof FeedFilters> = {
  value: 'all',
  onChange: () => undefined,
};
