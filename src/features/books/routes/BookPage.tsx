import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../../characters/mocks/charactersDb.mock';

import { BookTocNav } from '../ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../ui/BookSidebar/BookSidebar';
import { BookDescriptionSection } from '../ui/BookDetails/BookDescriptionSection';
import { BookDiscussion } from '../ui/BookDetails/BookDiscussion';
import { bookDiscussionMock } from '../ui/BookDetails/BookDiscussion.mock';
import { BookTitleBlock } from '../ui/BookDetails/BookTitleBlock';

export default function BookPage() {
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
          <BookTitleBlock book={book} />
          <BookDescriptionSection description={book.description} />
          <BookDiscussion {...bookDiscussionMock} />
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
