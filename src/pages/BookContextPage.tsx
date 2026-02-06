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
        <Stack gap="4">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Факты и контекст
            </Heading>
            <Text mt="1" opacity={0.8}>
              {book.title}
            </Text>
          </Box>

          <BookContextBlocks blocks={contextBlocks} />

          <Box>
            <Heading as="h3" size="sm" fontWeight="600">
              Язык и слова
            </Heading>
            <Text mt="2" opacity={0.8}>
              Сложные или устаревшие слова (mock).
            </Text>
          </Box>
          <BookWordsList words={words} />

          <BookReadingTips tips={tips} />
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
