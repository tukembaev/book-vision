import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../mocks/booksDb.mock';
import {
  getMockBookPartById,
  getMockBookPartsByBookId,
} from '../mocks/bookPartsDb.mock';
import { BookTocNav } from '../ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../ui/BookSidebar/BookSidebar';
import { BookPartSummaryPlaceholder } from '../ui/BookPart/BookPartSummaryPlaceholder';
import { BookPartTitleBlock } from '../ui/BookPart/BookPartTitleBlock';
import { getMockBookCharactersByBookId } from '../../characters/mocks/charactersDb.mock';
import { CommentsList } from '../../comments/ui/CommentsList/CommentsList';

export default function BookPartPage() {
  const { bookId, partId } = useParams();

  if (!bookId || !partId) {
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
  const part = getMockBookPartById(bookId, partId);
  const characters = getMockBookCharactersByBookId(bookId);

  if (!part) {
    return (
      <Box>
        <Heading as="h2" size="md" fontWeight="600">
          Часть не найдена
        </Heading>
        <Text mt="2" opacity={0.8}>
          Нет части с id: {partId}
        </Text>
      </Box>
    );
  }

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} activePartId={part.id} />}
      center={
        <Stack gap="4">
          <BookPartTitleBlock part={part} />
          <BookPartSummaryPlaceholder text="Сюда позже добавим краткое описание событий (AI-структурирование)." />

          <CommentsList bookId={bookId} partId={partId} />
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
