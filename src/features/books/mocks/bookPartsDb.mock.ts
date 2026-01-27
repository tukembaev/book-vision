import type { BookPart } from '@/types/core';

export const mockBookPartsDb: BookPart[] = [
  {
    id: 'p1',
    bookId: '1',
    title: 'Приезд Базарова',
    order: 1,
    pageStart: 1,
    pageEnd: 45,
    moodTags: ['drama', 'philosophy'],
    averageRating: 8.9,
  },
  {
    id: 'p2',
    bookId: '1',
    title: 'Идеологические споры',
    order: 2,
    pageStart: 46,
    pageEnd: 120,
    moodTags: ['philosophy', 'tension'],
    averageRating: 9.1,
  },
  {
    id: 'p3',
    bookId: '1',
    title: 'Отъезд Базарова',
    order: 3,
    pageStart: 121,
    pageEnd: 180,
    moodTags: ['melancholy'],
    averageRating: 8.4,
  },
  {
    id: 'p4',
    bookId: '2',
    title: 'Часть 1',
    order: 1,
    pageStart: 1,
    pageEnd: 112,
    moodTags: ['tension'],
    averageRating: 8.8,
  },
  {
    id: 'p5',
    bookId: '2',
    title: 'Часть 2',
    order: 2,
    pageStart: 113,
    pageEnd: 224,
    moodTags: ['drama'],
    averageRating: 9.2,
  },
  {
    id: 'p6',
    bookId: '2',
    title: 'Часть 3',
    order: 3,
    pageStart: 225,
    pageEnd: 336,
    moodTags: ['melancholy'],
    averageRating: 9.0,
  },
  {
    id: 'p7',
    bookId: '2',
    title: 'Часть 4',
    order: 4,
    pageStart: 337,
    pageEnd: 448,
    moodTags: ['tragedy'],
    averageRating: 9.3,
  },
  {
    id: 'p8',
    bookId: '2',
    title: 'Часть 5',
    order: 5,
    pageStart: 449,
    pageEnd: 560,
    moodTags: ['hope'],
    averageRating: 8.9,
  },
  {
    id: 'p9',
    bookId: '3',
    title: 'Москва: визит Воланда',
    order: 1,
    pageStart: 1,
    pageEnd: 140,
    moodTags: ['satire', 'mystery'],
    averageRating: 9.2,
  },
  {
    id: 'p10',
    bookId: '3',
    title: 'История Мастера',
    order: 2,
    pageStart: 141,
    pageEnd: 280,
    moodTags: ['romance', 'melancholy'],
    averageRating: 9.0,
  },
  {
    id: 'p11',
    bookId: '3',
    title: 'Бал и развязка',
    order: 3,
    pageStart: 281,
    pageEnd: 410,
    moodTags: ['tragedy', 'mystery'],
    averageRating: 9.4,
  },
];

export function getMockBookPartsByBookId(bookId: string) {
  return mockBookPartsDb
    .filter((p) => p.bookId === bookId)
    .sort((a, b) => a.order - b.order);
}

export function getMockBookPartById(bookId: string, partId: string) {
  return mockBookPartsDb.find((p) => p.bookId === bookId && p.id === partId);
}
