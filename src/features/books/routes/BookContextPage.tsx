import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout';
import { getMockBookById } from '../mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../../characters/mocks/charactersDb.mock';

import { BookTocNav } from '../ui/BookTocNav/BookTocNav.tsx';
import { BookSidebar } from '../ui/BookSidebar/BookSidebar.tsx';

import {
  getMockBookContextByBookId,
  getMockBookReadingTipsByBookId,
  getMockBookWordsByBookId,
} from '../mocks/bookContextDb.mock';

import { BookContextBlocks } from '../ui/BookContext/BookContextBlocks.tsx';
import { BookReadingTips } from '../ui/BookContext/BookReadingTips.tsx';
import { BookWordsList } from '../ui/BookContext/BookWordsList.tsx';

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
