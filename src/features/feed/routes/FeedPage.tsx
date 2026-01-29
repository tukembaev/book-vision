import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { getMockFeedItems } from '../mocks/feedDb.mock';
import type { FeedItemType } from '@/types/core';

import { FeedFilters } from '../ui/FeedFilters/FeedFilters.tsx';
import { FeedList } from '../ui/FeedList/FeedList.tsx';
import CommentFeed from '@/components/CommentFeed.tsx';

export default function FeedPage() {
  const [filter, setFilter] = useState<FeedItemType | 'all'>('all');

  const items = useMemo(() => {
    const all = getMockFeedItems();
    if (filter === 'all') {
      return all;
    }
    return all.filter((i) => i.type === filter);
  }, [filter]);

  return (
    <Stack gap="4">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Лента
        </Heading>
        <Text mt="2" opacity={0.8}>
          Действия людей, на которых ты подписан (mock).
        </Text>
      </Box>
      <CommentFeed />
      <FeedFilters value={filter} onChange={setFilter} />

      <FeedList items={items} />

      <Flex justify="flex-end">
        <Button variant="outline" size="sm" disabled>
          Настройки ленты (позже)
        </Button>
      </Flex>
    </Stack>
  );
}
