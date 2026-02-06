import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface BooksCatalogListItemProps {
  book: Book;
}

export function BooksCatalogListItem({ book }: BooksCatalogListItemProps) {
  const genre = book.genres?.[0] ?? '';

  return (
    <AppLink to={`/books/${book.id}`} display="block" _hover={{ textDecoration: 'none' }} _focus={{ outline: 'none' }}>
      <Box>
        <Box
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          aspectRatio="3 / 4"
        >
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          ) : (
            <Box bg="gray.100" height="100%" display="flex" alignItems="center" justifyContent="center">
              <Text color="gray.500" fontSize="lg">
                Нет обложки
              </Text>
            </Box>
          )}

          <Box
            position="absolute"
            top="2"
            left="2"
            bg="green.500"
            color="white"
            borderRadius="md"
            px="1.5"
            py="0.5"
            lineHeight="1"
          >
            <Text fontSize="xs" fontWeight="700">
              {book.ratings.average.toFixed(1)}
            </Text>
          </Box>
        </Box>

        <Stack gap="0" mt="2">
          <Heading
            as="h3"
            fontSize="sm"
            fontWeight="600"
            lineHeight="short"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {book.title}
          </Heading>
          {genre && (
            <Text fontSize="xs" color="gray.500" mt="0.5">
              {genre}
            </Text>
          )}
        </Stack>
      </Box>
    </AppLink>
  );
}
