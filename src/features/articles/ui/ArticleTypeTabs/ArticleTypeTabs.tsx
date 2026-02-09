import { Button, Flex } from '@chakra-ui/react';

import type { ArticleType } from '@/types/core';

export type ArticleFilter = 'all' | ArticleType;

interface FilterOption {
  value: ArticleFilter;
  label: string;
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'Все' },
  { value: 'shouldRead', label: 'Стоит ли читать?' },
  { value: 'analysis', label: 'Разборы' },
  { value: 'review', label: 'Рецензии' },
  { value: 'collection', label: 'Подборки' },
  { value: 'guide', label: 'Гайды' },
  { value: 'comparison', label: 'Сравнения' },
  { value: 'discussion', label: 'Дискуссии' },
];

export interface ArticleTypeTabsProps {
  value: ArticleFilter;
  onChange: (value: ArticleFilter) => void;
}

export function ArticleTypeTabs({ value, onChange }: ArticleTypeTabsProps) {
  return (
    <Flex gap="2" wrap="wrap">
      {filterOptions.map((opt) => (
        <Button
          key={opt.value}
          size="sm"
          variant={value === opt.value ? 'solid' : 'outline'}
          onClick={() => onChange(opt.value)}
          fontWeight={value === opt.value ? '600' : '400'}
        >
          {opt.label}
        </Button>
      ))}
    </Flex>
  );
}
