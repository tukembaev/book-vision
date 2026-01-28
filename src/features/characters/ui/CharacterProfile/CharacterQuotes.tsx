import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

export interface CharacterQuotesProps {
  noSpoilers: string[];
  spoilers: string[];
}

export function CharacterQuotes({ noSpoilers, spoilers }: CharacterQuotesProps) {
  const [showSpoilers, setShowSpoilers] = useState(false);

  const list = showSpoilers ? [...noSpoilers, ...spoilers] : noSpoilers;

  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Цитаты / выражения
      </Heading>

      <Stack mt="2" gap="2">
        {list.length === 0 ? (
          <Text opacity={0.85}>Нет цитат (mock).</Text>
        ) : (
          list.map((q, idx) => (
            <Box key={`${idx}`} borderWidth="1px" borderRadius="md" p="3">
              <Text opacity={0.9}>{q}</Text>
            </Box>
          ))
        )}

        <Button size="sm" variant="outline" onClick={() => setShowSpoilers((v) => !v)}>
          {showSpoilers ? 'скрыть спойлеры' : 'показать со спойлерами'}
        </Button>
      </Stack>
    </Box>
  );
}
