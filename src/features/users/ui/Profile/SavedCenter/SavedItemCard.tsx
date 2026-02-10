import { Box, Flex, Text } from '@chakra-ui/react';
import { Quote, FileText, Star } from 'lucide-react';

import type { SavedItem } from './savedCenter.mock';

export interface SavedItemCardProps {
  item: SavedItem;
}

const typeConfig: Record<SavedItem['type'], { label: string; icon: typeof Quote }> = {
  quote: { label: 'Цитата', icon: Quote },
  article: { label: 'Статья', icon: FileText },
  review: { label: 'Отзыв', icon: Star },
};

export function SavedItemCard({ item }: SavedItemCardProps) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  const date = new Date(item.savedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Flex align="center" gap="2" mb="2">
        <Icon size={14} style={{ opacity: 0.5 }} />
        <Text fontSize="xs" opacity={0.6} fontWeight="500">{config.label}</Text>
      </Flex>
      <Text fontSize="sm" lineHeight="tall" opacity={0.85}>
        {item.preview}
      </Text>
      <Flex align="center" gap="3" mt="3" pt="2" borderTopWidth="1px">
        {item.bookTitle && (
          <Text fontSize="xs" opacity={0.5}>{item.bookTitle}</Text>
        )}
        <Text fontSize="xs" opacity={0.4}>{date}</Text>
      </Flex>
    </Box>
  );
}
