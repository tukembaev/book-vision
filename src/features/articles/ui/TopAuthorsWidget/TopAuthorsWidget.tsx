import { Avatar, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface TopAuthorData {
  id: string;
  username: string;
  avatarUrl?: string;
  articlesCount: number;
  totalLikes: number;
}

export interface TopAuthorsWidgetProps {
  authors: TopAuthorData[];
}

export function TopAuthorsWidget({ authors }: TopAuthorsWidgetProps) {
  if (authors.length === 0) return null;

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        ✍️ Лучшие авторы
      </Heading>

      <Stack gap="3">
        {authors.map((author, i) => (
          <Flex key={author.id} align="center" gap="3">
            <Text fontSize="sm" fontWeight="700" color="gray.400" w="16px" flexShrink={0}>
              {i + 1}
            </Text>

            <Avatar.Root size="xs">
              <Avatar.Fallback>{author.username.charAt(0).toUpperCase()}</Avatar.Fallback>
              {author.avatarUrl && <Avatar.Image src={author.avatarUrl} />}
            </Avatar.Root>

            <Box flex="1" minW="0">
              <AppLink to={`/users/${author.id}`} fontSize="sm" fontWeight="500">
                {author.username}
              </AppLink>
              <Text fontSize="xs" color="gray.500">
                {author.articlesCount} статей · {author.totalLikes} 👍
              </Text>
            </Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
