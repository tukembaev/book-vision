import { Text } from '@chakra-ui/react';

import type { BookLength } from '../../types/challenge.types';

const lengthConfig: Record<BookLength, { label: string; color: string }> = {
  short: { label: 'Short', color: 'green.500' },
  medium: { label: 'Medium', color: 'blue.500' },
  long: { label: 'Long', color: 'orange.500' },
  'very-long': { label: 'Very Long', color: 'red.500' },
};

export interface BookLengthBadgeProps {
  length: BookLength;
}

export function BookLengthBadge({ length }: BookLengthBadgeProps) {
  const config = lengthConfig[length];

  return (
    <Text fontSize="xs" fontWeight="600" color={config.color} flexShrink={0}>
      {config.label}
    </Text>
  );
}
