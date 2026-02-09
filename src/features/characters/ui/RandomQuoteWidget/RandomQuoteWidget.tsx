import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface QuoteItem {
  characterName: string;
  characterId: string;
  quote: string;
}

export interface RandomQuoteWidgetProps {
  quotes: QuoteItem[];
}

export function RandomQuoteWidget({ quotes }: RandomQuoteWidgetProps) {
  if (quotes.length === 0) return null;

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        💬 Цитаты персонажей
      </Heading>

      <Stack gap="3">
        {quotes.map((q, i) => (
          <Box key={i} borderLeftWidth="2px" borderColor="purple.200" pl="3" py="1">
            <Text fontSize="sm" fontStyle="italic" color="gray.600" lineHeight="tall">
              {q.quote}
            </Text>
            <AppLink
              to={`/characters/${q.characterId}`}
              fontSize="xs"
              fontWeight="500"
              color="gray.400"
              mt="1"
              display="inline-block"
            >
              — {q.characterName}
            </AppLink>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
