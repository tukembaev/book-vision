import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { BookWordExplanation } from '../../mocks/bookContextDb.mock';

export interface BookWordsListProps {
  words: BookWordExplanation[];
}

export function BookWordsList({ words }: BookWordsListProps) {
  if (words.length === 0) {
    return (
      <Box borderWidth="1px" borderRadius="md" p="4">
        <Text opacity={0.85}>Нет слов для пояснения (mock).</Text>
      </Box>
    );
  }

  return (
    <Stack gap="3">
      {words.map((w) => (
        <Box key={w.id} borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            {w.word}
          </Heading>
          <Text mt="2" opacity={0.85}>
            {w.explanation}
          </Text>
          <Text mt="3" fontSize="sm" opacity={0.7}>
            Источник: {w.source}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}
