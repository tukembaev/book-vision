import { Button, Flex } from '@chakra-ui/react';

import type { FeedItemType } from '@/types/core';

export interface FeedFiltersProps {
  value: FeedItemType | 'all';
  onChange: (value: FeedItemType | 'all') => void;
}

export function FeedFilters({ value, onChange }: FeedFiltersProps) {
  return (
    <Flex gap="2" wrap="wrap">
      <Button
        size="sm"
        variant={value === 'all' ? 'solid' : 'outline'}
        onClick={() => onChange('all')}
      >
        всё
      </Button>
      <Button
        size="sm"
        variant={value === 'review' ? 'solid' : 'outline'}
        onClick={() => onChange('review')}
      >
        отзывы
      </Button>
      <Button
        size="sm"
        variant={value === 'word' ? 'solid' : 'outline'}
        onClick={() => onChange('word')}
      >
        пояснения
      </Button>
      <Button
        size="sm"
        variant={value === 'quote' ? 'solid' : 'outline'}
        onClick={() => onChange('quote')}
      >
        цитаты
      </Button>
    </Flex>
  );
}
