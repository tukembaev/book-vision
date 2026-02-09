import { Badge, Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { HeartIcon, SparklesIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { CharacterCatalogEntry } from '../../mocks/characterProfilesDb.mock';

export interface FeaturedCharacterHeroProps {
  character: CharacterCatalogEntry & { quote: string; socialStatus: string };
}

export function FeaturedCharacterHero({ character }: FeaturedCharacterHeroProps) {
  const book = getMockBookById(character.bookId);

  return (
    <AppLink to={`/characters/${character.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          minH={{ base: 'auto', md: '240px' }}
        >
          {/* Avatar / image area */}
          <Box
            flex={{ md: '1' }}
            bg="gray.100"
            minH={{ base: '160px', md: 'auto' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {character.imageUrl ? (
              <img
                src={character.imageUrl}
                alt={character.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Text fontSize="6xl" fontWeight="800" color="gray.300">
                {character.name.charAt(0)}
              </Text>
            )}
          </Box>

          {/* Text content */}
          <Flex
            flex={{ md: '2' }}
            direction="column"
            justify="center"
            p={{ base: '5', md: '8' }}
            gap="3"
          >
            <Flex align="center" gap="2" flexWrap="wrap">
              <Badge colorPalette="purple" fontSize="xs">
                Персонаж недели
              </Badge>
              {book && (
                <Badge variant="outline" fontSize="xs">
                  {book.title}
                </Badge>
              )}
              <Badge variant="outline" fontSize="xs">
                {character.socialStatus}
              </Badge>
            </Flex>

            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="800"
              lineHeight="short"
            >
              {character.name}
            </Heading>

            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="gray.600"
              lineHeight="tall"
            >
              {character.descriptionNoSpoilers}
            </Text>

            {character.quote && (
              <Box borderLeftWidth="3px" borderColor="purple.300" pl="3" py="1">
                <Text fontSize="sm" fontStyle="italic" color="gray.500">
                  {character.quote}
                </Text>
              </Box>
            )}

            <HStack gap="4" fontSize="xs" color="gray.500" mt="1">
              <HStack gap="1">
                <SparklesIcon size={14} />
                <Text>Популярность: {character.popularityScore}</Text>
              </HStack>
              <HStack gap="1">
                <HeartIcon size={14} />
                <Text>В избранном: {character.favoritesCount}</Text>
              </HStack>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </AppLink>
  );
}
