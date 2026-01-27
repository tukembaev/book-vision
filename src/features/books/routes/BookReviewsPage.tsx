import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout';
import { getMockBookById } from '../mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../../characters/mocks/charactersDb.mock';
import { getMockBookReviewsByBookId } from '../../reviews/mocks/reviewsDb.mock';

import { BookTocNav } from '../ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../ui/BookSidebar/BookSidebar';
import { ReviewsList } from '../../reviews/ui/ReviewsList/ReviewsList';

export default function BookReviewsPage() {
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
  const reviews = getMockBookReviewsByBookId(bookId);

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} />}
      center={
        <Stack gap="4">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Отзывы
            </Heading>
            <Text mt="1" opacity={0.8}>
              {book.title}
            </Text>
          </Box>

          <ReviewsList reviews={reviews} />
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
