import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../../characters/mocks/charactersDb.mock';

import { BookTocNav } from '../ui/BookTocNav/BookTocNav.tsx';
import { BookSidebar } from '../ui/BookSidebar/BookSidebar.tsx';

import { getMockBookPlaylistsByBookId } from '../mocks/bookPlaylistsDb.mock';
import { BookPlaylistsList } from '../ui/BookPlaylists/BookPlaylistsList.tsx';

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
  const playlists = getMockBookPlaylistsByBookId(bookId);

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} />}
      center={
        <Stack gap="4">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Плейлисты
            </Heading>
            <Text mt="1" opacity={0.8}>
              {book.title}
            </Text>
          </Box>

          <Text opacity={0.85}>
            Пользовательские плейлисты + Auto suggested по настроению (mock).
          </Text>

          <BookPlaylistsList playlists={playlists} />
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
