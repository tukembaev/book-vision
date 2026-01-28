import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { BookReadingTip } from '../../mocks/bookContextDb.mock';

export interface BookReadingTipsProps {
  tips: BookReadingTip[];
}

export function BookReadingTips({ tips }: BookReadingTipsProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Heading as="h3" size="sm" fontWeight="600">
        Советы перед чтением
      </Heading>

      {tips.length === 0 ? (
        <Text mt="2" opacity={0.85}>
          Пока нет советов (mock).
        </Text>
      ) : (
        <Stack mt="3" gap="2">
          {tips.map((t) => (
            <Text key={t.id} opacity={0.85}>
              {t.text}
            </Text>
          ))}
        </Stack>
      )}
    </Box>
  );
}
