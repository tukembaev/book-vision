import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../features/books/mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../features/books/mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../features/characters/mocks/charactersDb.mock';

import { BookTocNav } from '../features/books/ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../features/books/ui/BookSidebar/BookSidebar';

import { getMockBookPlaylistsByBookId } from '../features/books/mocks/bookPlaylistsDb.mock';
import { BookPlaylistsList } from '../features/books/ui/BookPlaylists/BookPlaylistsList';

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
