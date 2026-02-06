import { Box, Flex, Text } from '@chakra-ui/react';
import { UserAvatar } from './UserAvatar';

export interface QuotedComment {
  authorUsername: string;
  authorAvatar?: string;
  createdAt: string;
  text: string;
}

export interface QuotedBlockProps {
  quote: QuotedComment;
}

export function QuotedBlock({
  quote,
}: QuotedBlockProps) {
  return (
    <Box
      mt="3"
      mb="1"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      p="3"
      _dark={{ borderColor: 'gray.700' }}
    >
      <Flex align="center" gap="2" mb="2">
        <UserAvatar name={quote.authorUsername} avatar={quote.authorAvatar} size="md" />
        <Text fontSize="xs" fontWeight="600">
          {quote.authorUsername}
        </Text>
        <Text fontSize="xs" opacity={0.5}>
          {quote.createdAt}
        </Text>
      </Flex>
      <Text fontSize="sm" lineHeight="1.5" opacity={0.85}>
        {quote.text}
      </Text>
    </Box>
  );
}
