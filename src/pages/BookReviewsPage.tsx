import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockBookById } from '../features/books/mocks/booksDb.mock';
import { getMockBookPartsByBookId } from '../features/books/mocks/bookPartsDb.mock';
import { getMockBookCharactersByBookId } from '../features/characters/mocks/charactersDb.mock';
import { getMockBookReviewsByBookId } from '../features/reviews/mocks/reviewsDb.mock';
import { getMockUserById } from '../features/users/mocks/usersDb.mock';

import { BookTocNav } from '../features/books/ui/BookTocNav/BookTocNav';
import { BookSidebar } from '../features/books/ui/BookSidebar/BookSidebar';
import { ReviewCard } from '@/components/ReviewCard/ReviewCard';
import type { Review } from '@/types/core';

function transformReviewToCardData(review: Review) {
  const user = getMockUserById(review.userId);
  return {
    id: review.id,
    status: 'completed' as const,
    title: `Оценка: ${review.rating}/10`,
    description: review.text,
    author: {
      name: user?.username ?? 'unknown',
      avatarUrl: undefined,
    },
    createdAt: new Date(review.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
    upvotes: 0,
    commentsCount: 0,
    category: review.likedCharacters && review.likedCharacters.length > 0 ? 'Понравились персонажи' : undefined,
    isUpvoted: false,
  };
}

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
  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  return (
    <ThreeColumnLayout
      left={<BookTocNav book={book} parts={parts} />}
      center={
        <Stack gap="5">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Отзывы
            </Heading>
            <Text mt="1" fontSize="sm" color="gray.500">
              {reviews.length} отзывов · средняя оценка {avgRating}/10
            </Text>
          </Box>

          {reviews.length === 0 ? (
            <Box borderWidth="1px" borderRadius="xl" p="6" textAlign="center">
              <Text color="gray.400">Пока нет отзывов.</Text>
            </Box>
          ) : (
            <Stack gap="4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={transformReviewToCardData(review)} />
              ))}
            </Stack>
          )}
        </Stack>
      }
      right={<BookSidebar book={book} parts={parts} characters={characters} />}
    />
  );
}
