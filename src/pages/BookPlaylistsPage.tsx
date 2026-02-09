import { Badge, Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpenIcon, MusicIcon } from 'lucide-react';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../features/books/mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../features/books/mocks/bookPartsDb.mock';
// characters import removed — not needed for playlists page

import { BookTocNav } from '../features/books/ui/BookTocNav/BookTocNav';

import {
  getMockBookPlaylistsByBookId,
  getMockPlaylistsByPartId,
} from '../features/books/mocks/bookPlaylistsDb.mock';
import { PlaylistCardWide } from '../features/books/ui/BookPlaylists/PlaylistCardWide';
import { PlaylistCardCompact } from '../features/books/ui/BookPlaylists/PlaylistCardCompact';
import { BookSidebar } from '@/features/books/ui/BookSidebar/BookSidebar';
import { getMockBookCharactersByBookId } from '@/features/characters/mocks/charactersDb.mock';

export default function BookPlaylistsPage() {
  const { bookId } = useParams();

  if (!bookId) {
    return null;
  }

  const book = getMockBookById(bookId);

  if (!book) {
    return (
      <Box>
        <Heading as="h2" size="md" fontWeight="600">
          Книга не найдена
        </Heading>
        <Text mt="2" opacity={0.8}>
          Нет книги с id: {bookId}
        </Text>
      </Box>
    );
  }

  const parts = getMockBookPartsByBookId(bookId);
  const characters = getMockBookCharactersByBookId(bookId);
  const allPlaylists = getMockBookPlaylistsByBookId(bookId);

  const [activePartId, setActivePartId] = useState(parts[0]?.id ?? '');

  const sidebarPlaylists = useMemo(
    () => (activePartId ? getMockPlaylistsByPartId(bookId, activePartId) : allPlaylists),
    [bookId, activePartId, allPlaylists],
  );

  const activePart = parts.find((p) => p.id === activePartId);

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} activePartId={activePartId} />}
      center={
        <Stack gap="6">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Плейлисты
            </Heading>
            <Text mt="1" fontSize="sm" color="gray.500">
              Музыка к каждой части книги «{book.title}»
            </Text>
          </Box>

          {/* Parts with playlists */}
          {parts.map((part) => {
            const partPlaylists = getMockPlaylistsByPartId(bookId, part.id);
            const isActive = part.id === activePartId;

            return (
              <Box key={part.id}>
                {/* Part header */}
                <Flex
                  align="center"
                  gap="3"
                  p="3"
                  mx="-3"
                  borderRadius="xl"
                  bg={isActive ? 'purple.50' : 'transparent'}
                  _hover={{ bg: isActive ? 'purple.50' : 'gray.50' }}
                  transition="background 0.15s"
                  cursor="pointer"
                  onClick={() => setActivePartId(part.id)}
                >
                  <Flex
                    w="36px"
                    h="36px"
                    borderRadius="lg"
                    bg={isActive ? 'purple.100' : 'gray.100'}
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <BookOpenIcon size={16} color={isActive ? 'var(--chakra-colors-purple-600)' : 'var(--chakra-colors-gray-400)'} />
                  </Flex>
                  <Box flex="1" minW="0">
                    <Text fontSize="sm" fontWeight={isActive ? '700' : '600'} color={isActive ? 'purple.700' : 'gray.700'}>
                      {part.order}. {part.title}
                    </Text>
                    <HStack gap="2" fontSize="2xs" color="gray.400" mt="0.5">
                      {part.pageStart && part.pageEnd && (
                        <Text>стр. {part.pageStart}–{part.pageEnd}</Text>
                      )}
                      {part.moodTags.length > 0 && (
                        <Flex gap="1">
                          {part.moodTags.map((tag) => (
                            <Badge key={tag} variant="subtle" colorPalette="gray" fontSize="2xs" textTransform="none">
                              {tag}
                            </Badge>
                          ))}
                        </Flex>
                      )}
                    </HStack>
                  </Box>
                  <HStack gap="1" fontSize="xs" color="gray.400" flexShrink={0}>
                    <MusicIcon size={12} />
                    <Text>{partPlaylists.length}</Text>
                  </HStack>
                </Flex>

                {/* Wide playlists for this part */}
                {partPlaylists.length > 0 ? (
                  <Stack gap="3" mt="3" pl={{ base: '0', md: '12' }}>
                    {partPlaylists.map((pl) => (
                      <PlaylistCardWide key={pl.id} playlist={pl} />
                    ))}
                  </Stack>
                ) : (
                  <Box pl={{ base: '0', md: '12' }} mt="2">
                    <Text fontSize="sm" color="gray.400" fontStyle="italic">
                      Пока нет плейлистов для этой части
                    </Text>
                  </Box>
                )}
              </Box>
            );
          })}
        </Stack>
      }
      right={
       <BookSidebar book={book} parts={parts} characters={characters} />
      }
    />
  );
}
