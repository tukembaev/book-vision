import { Box, Heading, Text } from '@chakra-ui/react';

export interface BookDiscussionPlaceholderProps {
  text: string;
}

export function BookDiscussionPlaceholder({ text }: BookDiscussionPlaceholderProps) {
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Обсуждение
      </Heading>
      <Text mt="2" opacity={0.8}>
        {text}
      </Text>
    </Box>
  );
}
