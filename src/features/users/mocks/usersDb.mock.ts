import type { User } from '@/types/core';

export const mockUsersDb: User[] = [
  {
    id: 'u1',
    username: 'arif',
    avatarUrl: 'https://imo10.labirint.ru/books/893994/cover.jpg/242-0',
    role: 'user',
    createdAt: '2026-01-01T00:00:00.000Z',
    stats: { booksRead: 12, reviewsCount: 6, likesReceived: 48 },
    privacy: { profileVisibility: 'public', activityVisibility: 'public' },
  },
  {
    id: 'u2',
    username: 'moderator',
    avatarUrl: 'https://briefly.ru/static/cache/films/720/34.jpeg',
    role: 'moderator',
    createdAt: '2026-01-02T00:00:00.000Z',
    stats: { booksRead: 34, reviewsCount: 22, likesReceived: 190 },
    privacy: { profileVisibility: 'public', activityVisibility: 'friends' },
  },
  {
    id: 'u3',
    username: 'reader',
    avatarUrl: 'https://imo10.labirint.ru/books/893994/cover.jpg/242-0',
    role: 'user',
    createdAt: '2026-01-03T00:00:00.000Z',
    stats: { booksRead: 5, reviewsCount: 2, likesReceived: 7 },
    privacy: { profileVisibility: 'friends', activityVisibility: 'friends' },
  },
];

export function getMockUserById(userId: string) {
  return mockUsersDb.find((u) => u.id === userId);
}

export const mockCurrentUser = mockUsersDb[0];
