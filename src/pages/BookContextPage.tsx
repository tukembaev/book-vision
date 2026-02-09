import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../features/books/mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../features/books/mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../features/characters/mocks/charactersDb.mock';

import { BookTocNav } from '../features/books/ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../features/books/ui/BookSidebar/BookSidebar';

import {
  getMockBookContextByBookId,
  getMockBookReadingTipsByBookId,
  getMockBookWordsByBookId,
} from '../features/books/mocks/bookContextDb.mock';

import { BookContextBlocks } from '../features/books/ui/BookContext/BookContextBlocks';
import { BookReadingTips } from '../features/books/ui/BookContext/BookReadingTips';
import { BookWordsList } from '../features/books/ui/BookContext/BookWordsList';

export default function BookContextPage() {
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

  const contextBlocks = getMockBookContextByBookId(bookId);
  const words = getMockBookWordsByBookId(bookId);
  const tips = getMockBookReadingTipsByBookId(bookId);

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} />}
      center={
        <Stack gap="6">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Факты и контекст
            </Heading>
            <Text mt="1" fontSize="sm" color="gray.500">
              Исторический, культурный и социальный фон книги «{book.title}»
            </Text>
          </Box>

          <BookContextBlocks blocks={contextBlocks} />

          <BookReadingTips tips={tips} />

          <Box>
            <Heading as="h3" fontSize="md" fontWeight="700" mb="1">
              📖 Язык и ключевые понятия
            </Heading>
            <Text fontSize="sm" color="gray.500" mb="4">
              Слова и термины, которые помогут лучше понять текст
            </Text>
            <BookWordsList words={words} />
          </Box>
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
