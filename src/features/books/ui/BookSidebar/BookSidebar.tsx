import { Box, Flex, Heading, Stack, Text, Badge } from '@chakra-ui/react';
import { BookOpen, Users, Star, ListMusic, CheckCircle } from 'lucide-react';

import type { Book, BookPart, Character } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getAveragePartRating } from '../../utils/getAveragePartRating';

export interface BookSidebarProps {
  book: Book;
  parts: BookPart[];
  characters: Character[];
}

export function BookSidebar({ book, parts, characters }: BookSidebarProps) {
  const topCharacters = characters.slice(0, 3);
  const avgPartRating = getAveragePartRating(parts);

  return (
    <Stack gap="6">
      {/* Information Section */}
      <Box>
        <Flex align="center" gap="2" mb="3">
          <BookOpen size={16} opacity={0.6} />
          <Heading as="h3" size="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wide">
            Информация
          </Heading>
        </Flex>
        <Stack gap="3">
          <Flex align="center" gap="2">
            <Box w="2" h="2" borderRadius="full" bg="gray.400" />
            <Text fontSize="sm" opacity={0.8}>
              <Text as="span" fontWeight="600">Страниц:</Text> {book.pagesCount}
            </Text>
          </Flex>
          
          <Flex align="start" gap="2">
            <Box w="2" h="2" borderRadius="full" bg="gray.400" mt={2} />
            <Box flex="1">
              <Text fontSize="sm" fontWeight="600" mb="1">Теги:</Text>
              <Flex flexWrap="wrap" gap="1">
                {book.tags.length > 0 ? (
                  book.tags.map((tag) => (
                    <Badge key={tag} size="sm" variant="subtle" colorScheme="gray">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <Text fontSize="sm" opacity={0.6}>—</Text>
                )}
              </Flex>
            </Box>
          </Flex>

          <Flex align="center" gap="2">
            <CheckCircle size={14} opacity={book.status.verified ? 0.6 : 0.3} color={book.status.verified ? 'green' : 'gray'} />
            <Text fontSize="sm" opacity={0.8}>
              <Text as="span" fontWeight="600">Верификация:</Text>{' '}
              {book.status.verified ? (
                <Text as="span" color="green.600">да</Text>
              ) : (
                <Text as="span" color="gray.500">нет</Text>
              )}
              {book.status.verificationType && (
                <Text as="span" opacity={0.6}> ({book.status.verificationType})</Text>
              )}
            </Text>
          </Flex>
        </Stack>
      </Box>

      <Box borderBottomWidth="1px" borderColor="gray.200" opacity={0.3} />

      {/* Characters Section */}
      <Box>
        <Flex align="center" gap="2" mb="3">
          <Users size={16} opacity={0.6} />
          <Heading as="h3" size="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wide">
            Персонажи
          </Heading>
        </Flex>
        <Stack gap="2">
          {topCharacters.map((c) => (
            <Flex align="center" gap="2" key={c.id}>
              <Box w="1.5" h="1.5" borderRadius="full" bg="gray.400" />
              <Text fontSize="sm" opacity={0.8}>{c.name}</Text>
            </Flex>
          ))}
          <AppLink 
            to={`/books/${book.id}/characters`} 
            fontSize="sm" 
            fontWeight="500" 
            color="blue.600"
            _hover={{ color: 'blue.700' }}
            mt="1"
          >
            Все персонажи →
          </AppLink>
        </Stack>
      </Box>

      <Box borderBottomWidth="1px" borderColor="gray.200" opacity={0.3} />

      {/* Statistics Section */}
      <Box>
        <Flex align="center" gap="2" mb="3">
          <Star size={16} opacity={0.6} />
          <Heading as="h3" size="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wide">
            Статистика
          </Heading>
        </Flex>
        <Stack gap="3">
          <Flex align="center" gap="3">
            <Flex align="center" gap="1" bg="yellow.50" px="2" py="1" borderRadius="md">
              <Star size={12} fill="gold" color="gold" />
              <Text fontSize="sm" fontWeight="600">{book.ratings.average}</Text>
            </Flex>
            <Text fontSize="sm" opacity={0.6}>
              ({book.ratings.count} оценок)
            </Text>
          </Flex>
          
          <Flex align="center" gap="2">
            <Box w="2" h="2" borderRadius="full" bg="gray.400" />
            <Text fontSize="sm" opacity={0.8}>
              <Text as="span" fontWeight="600">Средняя оценка частей:</Text>{' '}
              {avgPartRating ?? '—'}
            </Text>
          </Flex>
        </Stack>
      </Box>

      <Box borderBottomWidth="1px" borderColor="gray.200" opacity={0.3} />

      {/* Playlists Section */}
      <Box>
        <Flex align="center" gap="2" mb="3">
          <ListMusic size={16} opacity={0.6} />
          <Heading as="h3" size="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wide">
            Плейлисты
          </Heading>
        </Flex>
        <Stack gap="2">
          <Text fontSize="sm" opacity={0.6} fontStyle="italic">
            Позже: пользовательские и auto-suggested по mood
          </Text>
          <AppLink 
            to={`/books/${book.id}/playlists`} 
            fontSize="sm" 
            fontWeight="500" 
            color="blue.600"
            _hover={{ color: 'blue.700' }}
          >
            Открыть плейлисты →
          </AppLink>
        </Stack>
      </Box>
    </Stack>
  );
}
