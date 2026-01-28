import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import type { CharacterIllustration } from '@/types/core';

export interface CharacterIllustrationsProps {
  illustrations: CharacterIllustration[];
}

export function CharacterIllustrations({ illustrations }: CharacterIllustrationsProps) {
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(() => {
    if (showAll) {
      return illustrations;
    }
    return illustrations.slice(0, 2);
  }, [illustrations, showAll]);

  return (
    <Box>
      <Flex align="center" justify="space-between">
        <Heading as="h3" size="sm" fontWeight="600">
          Иллюстрации
        </Heading>
        {illustrations.length > 2 ? (
          <Button size="sm" variant="outline" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'свернуть' : 'показать ещё'}
          </Button>
        ) : null}
      </Flex>

      <Stack mt="3" gap="3">
        {visible.map((img) => (
          <Box key={img.id} borderWidth="1px" borderRadius="md" p="4">
            <Text opacity={0.8}>Иллюстрация (mock)</Text>
            <Text mt="2" fontSize="sm" opacity={0.7}>
              {img.authorName}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
