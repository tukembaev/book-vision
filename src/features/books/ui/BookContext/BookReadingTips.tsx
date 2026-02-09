import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import type { BookReadingTip } from '../../mocks/bookContextDb.mock';

export interface BookReadingTipsProps {
  tips: BookReadingTip[];
}

export function BookReadingTips({ tips }: BookReadingTipsProps) {
  if (tips.length === 0) {
    return null;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      p="5"
      bg="purple.50"
    >
      <Heading as="h3" fontSize="sm" fontWeight="700" mb="3" color="purple.700">
        💡 Советы перед чтением
      </Heading>

      <Stack gap="2.5">
        {tips.map((t) => (
          <Flex
            key={t.id}
            gap="3"
            align="flex-start"
            bg="white"
            borderRadius="lg"
            p="3"
          >
            <Text fontSize="lg" flexShrink={0} lineHeight="1">
              {t.icon ?? '📌'}
            </Text>
            <Text fontSize="sm" color="gray.700" lineHeight="tall">
              {t.text}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
