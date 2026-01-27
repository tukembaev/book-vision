import type { Book } from '@/types/core';

export const mockBooksDb: Book[] = [
  {
    id: '1',
    title: 'Отцы и дети',
    originalTitle: 'Fathers and Sons',
    author: 'Иван Тургенев',
    year: 1862,
    description:
      'Роман о конфликте поколений и столкновении идей в России середины XIX века.',
    coverUrl: undefined,
    pagesCount: 320,
    status: { verified: true, verificationType: 'AI' },
    createdBy: 'u1',
    createdAt: '2026-01-01T00:00:00.000Z',
    tags: ['философия', 'общество', 'конфликт'],
    ratings: { average: 8.6, count: 1240 },
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    year: 1866,
    description:
      'История внутреннего кризиса и морального выбора, разворачивающаяся вокруг преступления.',
    coverUrl: undefined,
    pagesCount: 560,
    status: { verified: true, verificationType: 'AI' },
    createdBy: 'u1',
    createdAt: '2026-01-02T00:00:00.000Z',
    tags: ['психология', 'вина', 'искупление'],
    ratings: { average: 9.1, count: 2305 },
  },
  {
    id: '3',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    year: 1967,
    description:
      'Сатира и мистический роман, переплетающий несколько линий и смысловых пластов.',
    coverUrl: undefined,
    pagesCount: 410,
    status: { verified: true, verificationType: 'Community' },
    createdBy: 'u2',
    createdAt: '2026-01-03T00:00:00.000Z',
    tags: ['мистика', 'сатира', 'любовь'],
    ratings: { average: 9.0, count: 3102 },
  },
];

export function getMockBookById(bookId: string) {
  return mockBooksDb.find((b) => b.id === bookId);
}
