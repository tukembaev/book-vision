import type { Review } from '@/types/core';

export const mockReviewsDb: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    bookId: '1',
    rating: 9,
    text: 'Очень цельная книга: спор идей чувствуется живым, а персонажи не картонные.',
    likedCharacters: ['c1'],
    bestParts: ['p2'],
    createdAt: '2026-01-10T00:00:00.000Z',
  },
  {
    id: 'r2',
    userId: 'u2',
    bookId: '2',
    rating: 10,
    text: 'Тяжело, но мощно. После прочтения ещё долго думаешь о мотивах и границах морали.',
    bestParts: ['p5', 'p7'],
    createdAt: '2026-01-12T00:00:00.000Z',
  },
  {
    id: 'r3',
    userId: 'u3',
    bookId: '3',
    rating: 9,
    text: 'Смешно и страшно одновременно. Сюжетные линии переплетаются неожиданно.',
    createdAt: '2026-01-15T00:00:00.000Z',
  },
];

export function getMockBookReviewsByBookId(bookId: string) {
  return mockReviewsDb
    .filter((r) => r.bookId === bookId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
