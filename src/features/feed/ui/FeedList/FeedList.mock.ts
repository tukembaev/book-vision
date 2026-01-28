import type { ComponentProps } from 'react';

import { getMockFeedItems } from '../../mocks/feedDb.mock';
import { FeedList } from './FeedList.tsx';

export const feedListMock: ComponentProps<typeof FeedList> = {
  items: getMockFeedItems(),
};
