import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { BookContextBlock } from '../../mocks/bookContextDb.mock';

export interface BookContextBlocksProps {
  blocks: BookContextBlock[];
}

export function BookContextBlocks({ blocks }: BookContextBlocksProps) {
  if (blocks.length === 0) {
    return (
      <Box borderWidth="1px" borderRadius="md" p="4">
        <Text opacity={0.85}>Пока нет контекста для этой книги (mock).</Text>
      </Box>
    );
  }

  return (
    <Stack gap="3">
      {blocks.map((b) => (
        <Box key={b.id} borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="600">
            {b.title}
          </Heading>
          <Text mt="2" opacity={0.85}>
            {b.text}
          </Text>
          <Text mt="3" fontSize="sm" opacity={0.7}>
            Источники: {b.sources.join(', ')}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}
