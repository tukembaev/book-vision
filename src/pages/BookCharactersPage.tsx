import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../features/books/mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../features/books/mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../features/characters/mocks/charactersDb.mock';

import { BookTocNav } from '../features/books/ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../features/books/ui/BookSidebar/BookSidebar';
import { CharactersList } from '../features/characters/ui/CharactersList/CharactersList';

export default function BookCharactersPage() {
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

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} />}
      center={
        <Stack gap="4">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Персонажи
            </Heading>
            <Text mt="1" opacity={0.8}>
              {book.title}
            </Text>
          </Box>

          <CharactersList characters={characters} />
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
