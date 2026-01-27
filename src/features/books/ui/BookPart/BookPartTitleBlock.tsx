import { Box, Heading, Text } from '@chakra-ui/react';

import type { BookPart } from '@/types/core';

export interface BookPartTitleBlockProps {
  part: BookPart;
}

export function BookPartTitleBlock({ part }: BookPartTitleBlockProps) {
  return (
    <Box>
      <Heading as="h2" size="md" fontWeight="700">
        {part.title}
      </Heading>
      <Text mt="1" opacity={0.8}>
        {part.pageStart && part.pageEnd
          ? `Страницы: ${part.pageStart}–${part.pageEnd}`
          : 'Страницы: неизвестно'}
      </Text>
    </Box>
  );
}
