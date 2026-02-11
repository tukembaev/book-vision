import { Box, Checkbox, Flex, Heading, Stack, Text, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import { CheckIcon, List, BookOpen, Users, Star, ListMusic, Hash } from 'lucide-react';
import type { Book, BookPart } from '@/types/core';
import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface BookTocNavProps {
  book: Book;
  parts: BookPart[];
  activePartId?: string;
}

export function BookTocNav({ book, parts, activePartId }: BookTocNavProps) {
  const storageKey = `book-progress-${book.id}`;

  const [readParts, setReadParts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const toggleRead = (partId: string) => {
    setReadParts((prev) => {
      const next = prev.includes(partId)
        ? prev.filter((id) => id !== partId)
        : [...prev, partId];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  };

  const readCount = readParts.length;
  const totalCount = parts.length;
  const progressPct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  return (
    <Stack gap="6">
      {/* Header */}
      <Box>
        <Flex align="center" gap="2" mb="3">
          <List size={16} opacity={0.6} />
          <Heading as="h3" size="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wide">
            Содержание
          </Heading>
        </Flex>
        <Text fontSize="sm" opacity={0.7} fontStyle="italic">
          {book.title}
        </Text>
      </Box>

      {/* Progress Section */}
      <Box>
        <Flex align="center" justify="space-between" mb="3">
          <Flex align="center" gap="2">
            <CheckIcon size={14} color={progressPct === 100 ? 'green.500' : 'purple.500'} />
            <Text fontSize="sm" fontWeight="600">
              Прогресс чтения
            </Text>
          </Flex>
          {progressPct === 100 && (
            <Badge size="sm" colorScheme="green" variant="solid">
              Завершено
            </Badge>
          )}
        </Flex>
        
        <Stack gap="2">
          <Flex justify="space-between" fontSize="xs" mb="1">
            <Text opacity={0.7}>
              {readCount} из {totalCount} глав
            </Text>
            <Text fontWeight="700" color={progressPct === 100 ? 'green.500' : 'purple.500'}>
              {progressPct}%
            </Text>
          </Flex>
          <Box bg="gray.100" borderRadius="full" h="8px" overflow="hidden" position="relative">
            <Box
              h="100%"
              w={`${progressPct}%`}
              bg={progressPct === 100 ? 'green.400' : 'purple.400'}
              borderRadius="full"
              transition="width 0.4s ease-out"
            />
          </Box>
        </Stack>
      </Box>

      {/* Chapters List */}
      <Box>
        <Flex align="center" gap="2" mb="3">
          <BookOpen size={16} opacity={0.6} />
          <Heading as="h4" size="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
            Главы
          </Heading>
        </Flex>
        
        <Stack gap="1">
          {parts.map((part) => {
            const isActive = activePartId === part.id;
            const isRead = readParts.includes(part.id);

            return (
              <Flex
                key={part.id}
                gap="3"
                align="center"
                py="2.5"
                px="3"
                mx="-3"
                borderRadius="lg"
                bg={isActive ? 'purple.50' : 'transparent'}
                borderLeftWidth="3px"
                borderLeftColor={isActive ? 'purple.400' : 'transparent'}
                _hover={{ bg: isActive ? 'purple.50' : 'gray.50' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                {/* Checkbox */}
                <Box flexShrink={0}>
                  <Checkbox.Root
                    checked={isRead}
                    onCheckedChange={() => toggleRead(part.id)}
                    size="sm"
                  >
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Box>

                {/* Chapter Info */}
                <Box flex="1" minW="0">
                  <AppLink
                    to={`/books/${book.id}/parts/${part.id}`}
                    fontWeight={isActive ? '600' : '500'}
                    opacity={isRead && !isActive ? 0.6 : isActive ? 1 : 0.9}
                    fontSize="sm"
                    display="block"
                    textDecoration={isRead ? 'line-through' : 'none'}
                    _hover={{ textDecoration: 'none', color: isActive ? 'purple.600' : 'blue.600' }}
                  >
                    {part.order}. {part.title}
                  </AppLink>
                  <Flex align="center" gap="2" mt="1">
                    {part.pageStart && part.pageEnd && (
                      <Flex align="center" gap="1" opacity={0.5}>
                        <Hash size={10} />
                        <Text fontSize="xs">
                          стр. {part.pageStart}–{part.pageEnd}
                        </Text>
                      </Flex>
                    )}
                    {isRead && (
                      <Flex align="center" gap="1" color="green.500">
                        <CheckIcon size={10} />
                        <Text fontSize="xs">Прочитано</Text>
                      </Flex>
                    )}
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        </Stack>
      </Box>

      {/* Navigation Sections */}
      <Box>
        <Flex align="center" gap="2" mb="3">
          <BookOpen size={16} opacity={0.6} />
          <Heading as="h4" size="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
            Навигация
          </Heading>
        </Flex>
        
        <Stack gap="1">
          <Flex
            align="center"
            gap="2"
            py="2"
            px="3"
            mx="-3"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            transition="background 0.15s"
          >
            <BookOpen size={14} opacity={0.5} />
            <AppLink
              to={`/books/${book.id}`}
              fontSize="sm"
              opacity={0.8}
              _hover={{ opacity: 1, textDecoration: 'none' }}
              flex="1"
            >
              Описание и обсуждение
            </AppLink>
          </Flex>
          
          <Flex
            align="center"
            gap="2"
            py="2"
            px="3"
            mx="-3"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            transition="background 0.15s"
          >
            <Users size={14} opacity={0.5} />
            <AppLink
              to={`/books/${book.id}/characters`}
              fontSize="sm"
              opacity={0.8}
              _hover={{ opacity: 1, textDecoration: 'none' }}
              flex="1"
            >
              Персонажи
            </AppLink>
          </Flex>
          
          <Flex
            align="center"
            gap="2"
            py="2"
            px="3"
            mx="-3"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            transition="background 0.15s"
          >
            <Star size={14} opacity={0.5} />
            <AppLink
              to={`/books/${book.id}/reviews`}
              fontSize="sm"
              opacity={0.8}
              _hover={{ opacity: 1, textDecoration: 'none' }}
              flex="1"
            >
              Отзывы
            </AppLink>
          </Flex>
          
          <Flex
            align="center"
            gap="2"
            py="2"
            px="3"
            mx="-3"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            transition="background 0.15s"
          >
            <Hash size={14} opacity={0.5} />
            <AppLink
              to={`/books/${book.id}/context`}
              fontSize="sm"
              opacity={0.8}
              _hover={{ opacity: 1, textDecoration: 'none' }}
              flex="1"
            >
              Факты и контекст
            </AppLink>
          </Flex>
          
          <Flex
            align="center"
            gap="2"
            py="2"
            px="3"
            mx="-3"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            transition="background 0.15s"
          >
            <ListMusic size={14} opacity={0.5} />
            <AppLink
              to={`/books/${book.id}/playlists`}
              fontSize="sm"
              opacity={0.8}
              _hover={{ opacity: 1, textDecoration: 'none' }}
              flex="1"
            >
              Плейлисты
            </AppLink>
          </Flex>
        </Stack>
      </Box>
    </Stack>
  );
}
