import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface BooksCatalogListItemProps {
  book: Book;
}

export function BooksCatalogListItem({ book }: BooksCatalogListItemProps) {
  return (
    <AppLink to={`/books/${book.id}`} display="block" _hover={{ textDecoration: 'none' }} _focus={{ outline: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        position="relative"
        height="320px"
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
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
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
          top="3"
          right="3"
          bg="green.500"
          color="white"
          borderRadius="md"
          px="2"
          py="1"
        >
          <Text fontSize="sm" fontWeight="700">
            {book.ratings.average.toFixed(1)}
          </Text>
        </Box>

        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p="4"
          bg={book.coverUrl ? "transparent" : "white"}
          color={book.coverUrl ? "white" : "black"}
        >
          <Stack gap="1">
            <Heading
              as="h3"
              size="sm"
              fontWeight="600"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {book.title}
            </Heading>
            <Text
              opacity={0.9}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {book.author}
            </Text>
          </Stack>
        </Box>
      </Box>
    </AppLink>
  );
}
