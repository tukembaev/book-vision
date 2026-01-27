import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

import { AppLayout } from '../components/layout/AppLayout';

const HomePage = lazy(() => import('../features/books/routes/HomePage'));
const BookPage = lazy(() => import('../features/books/routes/BookPage'));
const BookPartPage = lazy(() => import('../features/books/routes/BookPartPage'));
const BookCharactersPage = lazy(() => import('../features/books/routes/BookCharactersPage'));
const BookReviewsPage = lazy(() => import('../features/books/routes/BookReviewsPage'));
const UserProfilePage = lazy(() => import('../features/users/routes/UserProfilePage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box p="6">
            <Text opacity={0.8}>Загрузка…</Text>
          </Box>
        }
      >
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="books/:bookId" element={<BookPage />} />
            <Route path="books/:bookId/parts/:partId" element={<BookPartPage />} />
            <Route path="books/:bookId/characters" element={<BookCharactersPage />} />
            <Route path="books/:bookId/reviews" element={<BookReviewsPage />} />
            <Route path="users/:userId" element={<UserProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
