import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { BookOpen } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface PopularBookData {
  id: string;
  title: string;
  author: string;
  articlesCount: number;
}

export interface PopularBooksWidgetProps {
  books: PopularBookData[];
}

export function PopularBooksWidget({ books }: PopularBooksWidgetProps) {
  if (books.length === 0) return null;

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        📚 Популярные книги
      </Heading>

      <Stack gap="2">
        {books.map((book) => (
          <AppLink
            key={book.id}
            to={`/books/${book.id}`}
            display="block"
            _hover={{ textDecoration: 'none' }}
          >
            <Flex
              align="center"
              gap="3"
              py="2"
              px="2"
              borderRadius="md"
              _hover={{ bg: 'gray.50' }}
            >
              <Flex
                w="32px"
                h="32px"
                borderRadius="md"
                align="center"
                justify="center"
                bg="blue.50"
                flexShrink={0}
              >
                <BookOpen size={14} color="#3182ce" />
              </Flex>

              <Box flex="1" minW="0">
                <Text fontSize="sm" fontWeight="500" truncate>
                  {book.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {book.author} · {book.articlesCount} статей
                </Text>
              </Box>
            </Flex>
          </AppLink>
        ))}
      </Stack>
    </Box>
  );
}
