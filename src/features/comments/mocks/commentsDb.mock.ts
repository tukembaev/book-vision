import type { Comment } from '@/types/core';

export const mockCommentsDb: Comment[] = [
  {
    id: 'cm1',
    userId: 'u1',
    bookId: '1',
    partId: 'p2',
    text: 'Этот спор идей ощущается максимально современно — будто читаешь про сегодняшний день.',
    likes: 12,
    createdAt: '2026-01-18T00:00:00.000Z',
  },
  {
    id: 'cm2',
    userId: 'u2',
    bookId: '1',
    partId: 'p2',
    text: 'Мне зашло, что нет «правильного» ответа: каждый персонаж по-своему убедителен.',
    likes: 7,
    createdAt: '2026-01-19T00:00:00.000Z',
  },
  {
    id: 'cm3',
    userId: 'u3',
    bookId: '2',
    partId: 'p5',
    text: 'На этой части особенно чувствуется, как герой «ломается» изнутри.',
    likes: 15,
    createdAt: '2026-01-16T00:00:00.000Z',
  },
];

export function getMockComments(params: { bookId: string; partId?: string }) {
  const list = mockCommentsDb.filter((c) => {
    if (c.bookId !== params.bookId) return false;
    if (params.partId && c.partId !== params.partId) return false;
    return true;
  });

  return list.sort((a, b) => {
    if (a.likes !== b.likes) return b.likes - a.likes;
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}
