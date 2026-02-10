import { Box, Flex, Text } from '@chakra-ui/react';
import { MessageSquare, Users } from 'lucide-react';

import type { SavedDebate } from './savedCenter.mock';

export interface SavedDebateCardProps {
  debate: SavedDebate;
}

export function SavedDebateCard({ debate }: SavedDebateCardProps) {
  const date = new Date(debate.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Text fontSize="sm" fontWeight="600" mb="1">{debate.title}</Text>
      <Text fontSize="xs" opacity={0.6}>{debate.bookTitle}</Text>
      <Flex align="center" gap="4" mt="3" pt="2" borderTopWidth="1px">
        <Flex align="center" gap="1" opacity={0.5}>
          <Users size={12} />
          <Text fontSize="xs">{debate.participantsCount}</Text>
        </Flex>
        <Flex align="center" gap="1" opacity={0.5}>
          <MessageSquare size={12} />
          <Text fontSize="xs">{debate.commentsCount}</Text>
        </Flex>
        <Text fontSize="xs" opacity={0.4}>{date}</Text>
      </Flex>
    </Box>
  );
}
