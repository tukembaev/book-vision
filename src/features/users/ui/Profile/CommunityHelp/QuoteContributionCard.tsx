import { Box, Flex, Text } from '@chakra-ui/react';
import { Quote, ThumbsUp, ShieldCheck } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import type { UserActivityItem } from '../../../mocks/userProfileDb.mock';

export interface QuoteContributionCardProps {
  item: UserActivityItem;
}

export function QuoteContributionCard({ item }: QuoteContributionCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex align="center" gap="2" px="4" py="2.5" borderBottomWidth="1px" bg="gray.50">
        <Quote size={14} style={{ opacity: 0.5, flexShrink: 0 }} />
        <Text fontSize="xs" fontWeight="600" opacity={0.7}>
          Цитата
        </Text>
      </Flex>

      <Box px="4" py="3">
        <Text fontSize="sm" fontStyle="italic" lineHeight="tall" opacity={0.85}>
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
