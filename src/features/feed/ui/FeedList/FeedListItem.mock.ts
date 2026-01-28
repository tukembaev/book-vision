import type { ComponentProps } from 'react';

import { getMockFeedItems } from '../../mocks/feedDb.mock';
import { FeedListItem } from './FeedListItem.tsx';

export const feedListItemMock: ComponentProps<typeof FeedListItem> = {
  item: getMockFeedItems()[0],
};
