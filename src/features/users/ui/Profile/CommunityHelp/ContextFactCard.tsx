import { Box, Flex, Text } from '@chakra-ui/react';
import { Lightbulb, ThumbsUp, ShieldCheck } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import type { UserActivityItem } from '../../../mocks/userProfileDb.mock';

export interface ContextFactCardProps {
  item: UserActivityItem;
}

export function ContextFactCard({ item }: ContextFactCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex align="center" gap="2" px="4" py="2.5" borderBottomWidth="1px" bg="gray.50">
        <Lightbulb size={14} style={{ opacity: 0.5, flexShrink: 0 }} />
        <Text fontSize="xs" fontWeight="600" opacity={0.7}>
          Контекст / факт
        </Text>
      </Flex>

      <Box px="4" py="3">
        <Text fontSize="sm" fontWeight="600" mb="1">
          {item.title}
        </Text>
        <Text fontSize="sm" lineHeight="tall" opacity={0.85}>
          {item.text}
        </Text>

        <Flex align="center" gap="4" mt="3" pt="2" borderTopWidth="1px">
          <Flex align="center" gap="1" opacity={0.5}>
            <ThumbsUp size={12} />
            <Text fontSize="xs">{item.likes}</Text>
          </Flex>
          <Flex align="center" gap="1" opacity={0.5}>
            <ShieldCheck size={12} />
            <Text fontSize="xs">{item.verification}</Text>
          </Flex>
          {item.bookId && (
            <AppLink to={`/books/${item.bookId}`} fontSize="xs" opacity={0.6}>
              Книга
            </AppLink>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
