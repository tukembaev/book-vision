import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

import { AppLayout } from '../components/layout/AppLayout';

const HomePage = lazy(() => import('../features/books/routes/HomePage'));
const FeedPage = lazy(() => import('../features/feed/routes/FeedPage'));
const BooksPage = lazy(() => import('../features/books/routes/BooksPage'));
const BookPage = lazy(() => import('../features/books/routes/BookPage'));
const BookPartPage = lazy(() => import('../features/books/routes/BookPartPage'));
const BookCharactersPage = lazy(() => import('../features/books/routes/BookCharactersPage'));
const BookReviewsPage = lazy(() => import('../features/books/routes/BookReviewsPage'));
const BookContextPage = lazy(() => import('../features/books/routes/BookContextPage'));
const BookPlaylistsPage = lazy(() => import('../features/books/routes/BookPlaylistsPage'));
const CharactersPage = lazy(() => import('../features/characters/routes/CharactersPage'));
const CharacterPage = lazy(() => import('../features/characters/routes/CharacterPage'));
const ChallengesPage = lazy(() => import('../features/challenges/routes/ChallengesPage'));
const ArticlesPage = lazy(() => import('../features/articles/routes/ArticlesPage'));
const ArticlePage = lazy(() => import('../features/articles/routes/ArticlePage'));
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
            <Route path="feed" element={<FeedPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="books/:bookId" element={<BookPage />} />
            <Route path="books/:bookId/parts/:partId" element={<BookPartPage />} />
            <Route path="books/:bookId/characters" element={<BookCharactersPage />} />
            <Route path="books/:bookId/reviews" element={<BookReviewsPage />} />
            <Route path="books/:bookId/context" element={<BookContextPage />} />
            <Route path="books/:bookId/playlists" element={<BookPlaylistsPage />} />
            <Route path="characters" element={<CharactersPage />} />
            <Route path="characters/:characterId" element={<CharacterPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="articles/:articleId" element={<ArticlePage />} />
            <Route path="users/:userId" element={<UserProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
