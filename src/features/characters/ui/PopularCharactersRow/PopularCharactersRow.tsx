import { Badge, Box, Flex, Grid, Heading, HStack, Text } from '@chakra-ui/react';
import { HeartIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { CharacterCatalogEntry } from '../../mocks/characterProfilesDb.mock';

export interface PopularCharactersRowProps {
  characters: (CharacterCatalogEntry & { quote: string })[];
}

export function PopularCharactersRow({ characters }: PopularCharactersRowProps) {
  if (characters.length === 0) return null;

  return (
    <Box>
      <Heading as="h3" fontSize="lg" fontWeight="700" mb="1">
        ⭐ Популярные персонажи
      </Heading>
      <Text fontSize="sm" color="gray.500" mb="4">
        Герои, которых чаще всего добавляют в избранное
      </Text>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap="3"
      >
        {characters.map((char, i) => {
          const book = getMockBookById(char.bookId);

          return (
            <AppLink
              key={char.id}
              to={`/characters/${char.id}`}
              display="block"
              _hover={{ textDecoration: 'none' }}
            >
              <Flex
                gap="3"
                p="4"
                borderWidth="1px"
                borderRadius="xl"
                bg="white"
                _hover={{ shadow: 'sm' }}
                transition="all 0.2s"
                align="flex-start"
              >
                {/* Rank */}
                <Text
                  fontSize="2xl"
                  fontWeight="800"
                  color="gray.200"
                  lineHeight="1"
                  mt="1"
                  flexShrink={0}
                  w="28px"
                  textAlign="center"
                >
                  {i + 1}
                </Text>

                {/* Content */}
                <Box flex="1" minW="0">
                  <Flex align="center" gap="2" mb="1">
                    <Heading as="h4" fontSize="sm" fontWeight="700" truncate>
                      {char.name}
                    </Heading>
                    {book && (
                      <Badge variant="outline" fontSize="2xs" flexShrink={0}>
                        {book.title}
                      </Badge>
                    )}
                  </Flex>

                  <Text
                    fontSize="xs"
                    color="gray.500"
                    lineHeight="tall"
                    mb="2"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {char.descriptionNoSpoilers}
                  </Text>

                  <HStack gap="2.5" fontSize="xs" color="gray.400">
                    <HStack gap="0.5">
                      <HeartIcon size={12} />
                      <Text>{char.favoritesCount}</Text>
                    </HStack>
                    {char.quote && (
                      <Text fontStyle="italic" truncate>
                        «{char.quote.replace(/[«»]/g, '')}»
                      </Text>
                    )}
                  </HStack>
                </Box>
              </Flex>
            </AppLink>
          );
        })}
      </Grid>
    </Box>
  );
}
