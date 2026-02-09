import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppLayout } from '../components/layout/AppLayout/AppLayout'
import HomePage from '../pages/HomePage'
import BooksPage from '../pages/BooksPage'
import BookPage from '../pages/BookPage'
import BookPartPage from '../pages/BookPartPage'
import BookCharactersPage from '../pages/BookCharactersPage'
import BookReviewsPage from '../pages/BookReviewsPage'
import BookContextPage from '../pages/BookContextPage'
import BookPlaylistsPage from '../pages/BookPlaylistsPage'
import CharactersPage from '../pages/CharactersPage'
import CharacterPage from '../pages/CharacterPage'
import ChallengesPage from '../pages/ChallengesPage'
import ChallengeDetailPage from '../pages/ChallengeDetailPage'
import ArticlesPage from '../pages/ArticlesPage'
import ArticlePage from '../pages/ArticlePage'
import ReviewPage from '../pages/ReviewPage'
import UserProfilePage from '../pages/UserProfilePage'
import BookClubsPage from '../pages/BookClubsPage'
import BookClubPage from '../pages/BookClubPage'
import DebateDetailPage from '../pages/DebateDetailPage'
import NotFoundPage from '../pages/NotFoundPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
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
          <Route path="challenges/:challengeId" element={<ChallengeDetailPage />} />
          <Route path="clubs" element={<BookClubsPage />} />
          <Route path="clubs/:clubId" element={<BookClubPage />} />
          <Route path="debates/:debateId" element={<DebateDetailPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:articleId" element={<ArticlePage />} />
          <Route path="reviews/:reviewId" element={<ReviewPage />} />
          <Route path="users/:userId" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
