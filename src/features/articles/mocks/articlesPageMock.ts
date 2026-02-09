import type { Article, ArticleType } from '@/types/core';
import type { ArticleCardData } from '@/components/ArticleCard';
import type { TopAuthorData } from '../ui/TopAuthorsWidget/TopAuthorsWidget';
import type { PopularBookData } from '../ui/PopularBooksWidget/PopularBooksWidget';

import { mockArticlesDb } from './articlesDb.mock';
import { mockUsersDb } from '@/features/users/mocks/usersDb.mock';
import { mockBooksDb } from '@/features/books/mocks/booksDb.mock';

function articleTypeLabel(type: ArticleType): string {
  const labels: Record<ArticleType, string> = {
    shouldRead: 'Стоит ли читать?',
    analysis: 'Разбор',
    review: 'Рецензия',
    collection: 'Подборка',
    guide: 'Гайд',
    comparison: 'Сравнение',
    discussion: 'Дискуссия',
  };
  return labels[type];
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function articleToCardData(article: Article): ArticleCardData {
  const user = mockUsersDb.find((u) => u.id === article.authorId);

  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    categoryLabel: articleTypeLabel(article.type),
    coverUrl: article.coverUrl,
    author: {
      name: user?.username ?? 'Неизвестный',
      avatarUrl: user?.avatarUrl,
    },
    createdAt: formatDate(article.createdAt),
    rating: Number(((article.likes / Math.max(article.views, 1)) * 50).toFixed(1)),
    upvotes: article.likes,
  };
}

export function getArticleCards(filter?: ArticleType): ArticleCardData[] {
  let articles: Article[];

  if (filter) {
    articles = mockArticlesDb.filter((a) => a.type === filter);
  } else {
    articles = [...mockArticlesDb];
  }

  return articles
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(articleToCardData);
}

export function getTopAuthors(): TopAuthorData[] {
  const stats = new Map<string, { articlesCount: number; totalLikes: number }>();

  for (const a of mockArticlesDb) {
    const prev = stats.get(a.authorId) ?? { articlesCount: 0, totalLikes: 0 };
    stats.set(a.authorId, {
      articlesCount: prev.articlesCount + 1,
      totalLikes: prev.totalLikes + a.likes,
    });
  }

  const results: TopAuthorData[] = [];

  for (const [authorId, v] of stats.entries()) {
    const user = mockUsersDb.find((u) => u.id === authorId);
    if (!user) continue;
    results.push({
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      articlesCount: v.articlesCount,
      totalLikes: v.totalLikes,
    });
  }

  return results.sort((a, b) => b.totalLikes - a.totalLikes);
}

export function getPopularBooks(): PopularBookData[] {
  const counts = new Map<string, number>();

  for (const a of mockArticlesDb) {
    counts.set(a.bookId, (counts.get(a.bookId) ?? 0) + 1);
  }

  const results: PopularBookData[] = [];

  for (const [bookId, n] of counts.entries()) {
    const book = mockBooksDb.find((b) => b.id === bookId);
    if (!book) continue;
    results.push({
      id: book.id,
      title: book.title,
      author: book.author,
      articlesCount: n,
    });
  }

  return results.sort((a, b) => b.articlesCount - a.articlesCount);
}

/** Single best article — highest likes, used as hero banner */
export function getFeaturedArticle(): ArticleCardData {
  const best = [...mockArticlesDb].sort((a, b) => b.likes - a.likes)[0];
  return articleToCardData(best);
}

/** Top 4 articles of the week by likes (excluding the featured one) */
export function getWeeklyBest(): ArticleCardData[] {
  const sorted = [...mockArticlesDb].sort((a, b) => b.likes - a.likes);
  const featuredId = sorted[0]?.id;
  return sorted
    .filter((a) => a.id !== featuredId)
    .slice(0, 4)
    .map(articleToCardData);
}
