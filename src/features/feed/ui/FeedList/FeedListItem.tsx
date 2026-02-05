import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { FeedItem } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface FeedListItemProps {
  item: FeedItem;
}

export function FeedListItem({ item }: FeedListItemProps) {
  const metaParts: string[] = [];
  metaParts.push(item.type);
  metaParts.push(new Date(item.createdAt).toLocaleString());

  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Box>
          <Heading as="h3" size="sm" fontWeight="600">
            {item.title}
          </Heading>
          <Text mt="1" fontSize="sm" opacity={0.7}>
            {metaParts.join(' · ')}
          </Text>
        </Box>

        <Text opacity={0.85}>{item.text}</Text>

        <Stack gap="1">
          {item.bookId ? (
            <AppLink to={`/books/${item.bookId}`} fontSize="sm" opacity={0.85}>
              Перейти к книге
            </AppLink>
          ) : null}
          {item.characterId ? (
            <AppLink
              to={`/characters/${item.characterId}`}
              fontSize="sm"
              opacity={0.85}
            >
              Перейти к персонажу
            </AppLink>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
}
