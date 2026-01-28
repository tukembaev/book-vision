import type { FeedItem } from '@/types/core';

export const mockFeedDb: FeedItem[] = [
  {
    id: 'f1',
    type: 'review',
    userId: 'u2',
    createdAt: '2026-01-08T12:10:00.000Z',
    title: 'Оставил отзыв на «Отцы и дети»',
    text: 'Сильнее всего запомнились споры и контраст темпераментов. Оценка: 9/10.',
    bookId: '1',
  },
  {
    id: 'f2',
    type: 'comment',
    userId: 'u3',
    createdAt: '2026-01-09T08:40:00.000Z',
    title: 'Комментарий к части книги',
    text: 'Эта часть ощущается как поворот — становится ясно, что конфликт не только идейный.',
    bookId: '2',
  },
  {
    id: 'f3',
    type: 'word',
    userId: 'u1',
    createdAt: '2026-01-10T18:05:00.000Z',
    title: 'Пояснение слова',
    text: '«Нигилист» — здесь как позиция отрицания общепринятых ценностей и авторитетов.',
    bookId: '1',
  },
  {
    id: 'f4',
    type: 'quote',
    userId: 'u1',
    createdAt: '2026-01-11T09:15:00.000Z',
    title: 'Добавил цитату',
    text: '«...человек всё может понять, кроме того, почему он так мало делает».',
    bookId: '3',
  },
  {
    id: 'f5',
    type: 'help',
    userId: 'u2',
    createdAt: '2026-01-11T14:20:00.000Z',
    title: 'Помог сообществу',
    text: 'Добавил источники по историческому контексту (Wikipedia + критическая статья).',
    bookId: '2',
  },
];

export function getMockFeedItems() {
  return [...mockFeedDb].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
