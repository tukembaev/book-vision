import { Avatar, Badge, Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { HeartIcon, SparklesIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { CharacterCatalogEntry } from '../../mocks/characterProfilesDb.mock';

export interface CharacterCatalogCardProps {
  entry: CharacterCatalogEntry;
}

export function CharacterCatalogCard({ entry }: CharacterCatalogCardProps) {
  const book = getMockBookById(entry.bookId);
  const aliasText = entry.aliases.filter((a) => a && a !== '—').join(', ');

  return (
    <AppLink to={`/characters/${entry.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        p="4"
        bg="white"
        _hover={{ shadow: 'sm' }}
        transition="all 0.2s"
        h="100%"
      >
        <Flex direction="column" gap="2" h="100%">
          {/* Avatar initial + name */}
          <Flex align="center" gap="3">
            <Avatar.Root size="md" flexShrink={0}>
              {entry.imageUrl ? (
                <Avatar.Image src={entry.imageUrl} alt={entry.name} />
              ) : (
                <Avatar.Fallback>{entry.name.charAt(0)}</Avatar.Fallback>
              )}
            </Avatar.Root>

            <Box flex="1" minW="0">
              <Heading as="h4" fontSize="sm" fontWeight="700" truncate>
                {entry.name}
              </Heading>
              {aliasText && (
                <Text fontSize="xs" color="gray.400" truncate>
                  {aliasText}
                </Text>
              )}
            </Box>
          </Flex>

          {/* Book badge */}
          {book && (
            <Badge variant="outline" fontSize="2xs" alignSelf="flex-start">
              {book.title}
            </Badge>
          )}

          {/* Description */}
          <Text
            fontSize="sm"
            color="gray.600"
            lineHeight="tall"
            flex="1"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {entry.descriptionNoSpoilers}
          </Text>

          {/* Stats */}
          <HStack gap="3" fontSize="xs" color="gray.400" mt="auto">
            <HStack gap="0.5">
              <SparklesIcon size={12} />
              <Text>{entry.popularityScore}</Text>
            </HStack>
            <HStack gap="0.5">
              <HeartIcon size={12} />
              <Text>{entry.favoritesCount}</Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </AppLink>
  );
}
