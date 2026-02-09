import { Box, Checkbox, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
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
    <Stack gap="4">
      <Box>
        <Heading as="h3" size="sm" fontWeight="600">
          Структура
        </Heading>
        <Text mt="1" opacity={0.8}>
          {book.title}
        </Text>
      </Box>

      {/* Progress bar */}
      <Box>
        <Flex justify="space-between" fontSize="xs" mb="1">
          <Text color="gray.500" fontWeight="500">
            Прочитано {readCount} из {totalCount}
          </Text>
          <Text fontWeight="700" color={progressPct === 100 ? 'green.500' : 'gray.600'}>
            {progressPct}%
          </Text>
        </Flex>
        <Box bg="gray.100" borderRadius="full" h="6px" overflow="hidden">
          <Box
            h="100%"
            w={`${progressPct}%`}
            bg={progressPct === 100 ? 'green.400' : 'purple.400'}
            borderRadius="full"
            transition="width 0.3s"
          />
        </Box>
      </Box>

      {/* Parts with checkboxes */}
      <Stack gap="1">
        {parts.map((part) => {
          const isActive = activePartId === part.id;
          const isRead = readParts.includes(part.id);

          return (
            <Flex
              key={part.id}
              gap="3"
              align="flex-start"
              py="2"
              px="2"
              mx="-2"
              borderRadius="lg"
              bg={isActive ? 'purple.50' : 'transparent'}
              _hover={{ bg: isActive ? 'purple.50' : 'gray.50' }}
              transition="background 0.15s"
            >
              {/* Checkbox */}
              <Box pt="1" flexShrink={0}>
                <Checkbox.Root
                  checked={isRead}
                  onCheckedChange={() => toggleRead(part.id)}
                >
                  <Checkbox.Control />
                </Checkbox.Root>
              </Box>

              {/* Title + pages */}
              <Box flex="1" minW="0">
                <AppLink
                  to={`/books/${book.id}/parts/${part.id}`}
                  fontWeight={isActive ? '600' : '400'}
                  opacity={isRead && !isActive ? 0.6 : isActive ? 1 : 0.85}
                  fontSize="sm"
                  display="block"
                  textDecoration={isRead ? 'line-through' : 'none'}
                  _hover={{ textDecoration: 'underline' }}
                >
                  {part.order}. {part.title}
                </AppLink>
                <Text fontSize="xs" opacity={0.6} mt="0.5">
                  {part.pageStart && part.pageEnd
                    ? `стр. ${part.pageStart}–${part.pageEnd}`
                    : '—'}
                </Text>
              </Box>

              {/* Read indicator */}
              {isRead && (
                <Box pt="1" flexShrink={0}>
                  <CheckIcon size={14} color="var(--chakra-colors-green-400)" />
                </Box>
              )}
            </Flex>
          );
        })}
      </Stack>

      <Box>
        <Heading as="h4" size="xs" fontWeight="600">
          Разделы
        </Heading>
        <Stack mt="2" gap="2">
          <AppLink to={`/books/${book.id}`} opacity={0.85}>
            Описание и обсуждение
          </AppLink>
          <AppLink to={`/books/${book.id}/characters`} opacity={0.85}>
            Персонажи
          </AppLink>
          <AppLink to={`/books/${book.id}/reviews`} opacity={0.85}>
            Отзывы
          </AppLink>
          <AppLink to={`/books/${book.id}/context`} opacity={0.85}>
            Факты и контекст
          </AppLink>
          <AppLink to={`/books/${book.id}/playlists`} opacity={0.85}>
            Плейлисты
          </AppLink>
        </Stack>
      </Box>
    </Stack>
  );
}
