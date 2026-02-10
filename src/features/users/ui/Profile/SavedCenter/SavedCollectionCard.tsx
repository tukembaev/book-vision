import { Box, Flex, Text } from '@chakra-ui/react';
import { FolderOpen, BookOpen } from 'lucide-react';

import type { SavedCollection } from './savedCenter.mock';

export interface SavedCollectionCardProps {
  collection: SavedCollection;
}

export function SavedCollectionCard({ collection }: SavedCollectionCardProps) {
  const date = new Date(collection.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Flex align="center" gap="2" mb="2">
        <FolderOpen size={15} style={{ opacity: 0.5 }} />
        <Text fontSize="sm" fontWeight="600">{collection.title}</Text>
      </Flex>
      <Text fontSize="sm" opacity={0.7} lineClamp={2}>
        {collection.description}
      </Text>
      <Flex align="center" gap="3" mt="3" pt="2" borderTopWidth="1px">
        <Flex align="center" gap="1" opacity={0.5}>
          <BookOpen size={12} />
          <Text fontSize="xs">{collection.booksCount} книг</Text>
        </Flex>
        <Text fontSize="xs" opacity={0.4}>{date}</Text>
      </Flex>
    </Box>
  );
}
