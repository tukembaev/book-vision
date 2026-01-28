import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

export interface CharacterDescriptionProps {
  noSpoilers: string;
  spoilers: string;
}

export function CharacterDescription({ noSpoilers, spoilers }: CharacterDescriptionProps) {
  const [showSpoilers, setShowSpoilers] = useState(false);

  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Описание
      </Heading>

      <Stack mt="2" gap="2">
        <Text opacity={0.9}>{showSpoilers ? spoilers : noSpoilers}</Text>
        <Button size="sm" variant="outline" onClick={() => setShowSpoilers((v) => !v)}>
          {showSpoilers ? 'скрыть спойлеры' : 'показать со спойлерами'}
        </Button>
      </Stack>
    </Box>
  );
}
