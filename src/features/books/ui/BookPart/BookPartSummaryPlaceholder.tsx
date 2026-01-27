import { Box, Heading, Text } from '@chakra-ui/react';

export interface BookPartSummaryPlaceholderProps {
  text: string;
}

export function BookPartSummaryPlaceholder({ text }: BookPartSummaryPlaceholderProps) {
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Что происходит
      </Heading>
      <Text mt="2" opacity={0.8}>
        {text}
      </Text>
    </Box>
  );
}
