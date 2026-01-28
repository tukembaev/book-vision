import { Stack } from '@chakra-ui/react';

import type { FeedItem } from '@/types/core';
import { FeedListItem } from './FeedListItem.tsx';

export interface FeedListProps {
  items: FeedItem[];
}

export function FeedList({ items }: FeedListProps) {
  return (
    <Stack gap="3">
      {items.map((item) => (
        <FeedListItem key={item.id} item={item} />
      ))}
    </Stack>
  );
}
