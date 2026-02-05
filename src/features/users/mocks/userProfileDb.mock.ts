import type { User } from '@/types/core';

export type ProfileSection =
  | 'library'
  | 'libraryV2'
  | 'stats'
  | 'activity'
  | 'help'
  | 'challenges';

export type VerificationStatus = 'AI' | 'Community' | 'None';

export type UserActivityType = 'review' | 'comment' | 'quote' | 'word' | 'context';

export type UserLibraryStatus = 'planned' | 'reading_now' | 'completed' | 'onHold' | 'dropped';

export interface UserLibraryEntry {
  bookId: string;
  status: UserLibraryStatus;
  createdAt: string;
}

export interface UserActivityItem {
  id: string;
  type: UserActivityType;
  createdAt: string;

  title: string;
  text: string;

  bookId?: string;
  partId?: string;

  likes: number;
  verification: VerificationStatus;
}

export interface UserReadingEntry {
  bookId: string;
  status: 'reading' | 'finished';
  startedAt: string;
  finishedAt?: string;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic';
  earnedAt: string;
}

export interface UserProfileSocial {
  followersUserIds: string[];
  followingUserIds: string[];
}

export interface UserFavorites {
  bookIds: string[];
  characterIds: string[];
  quoteIds: string[];
}

export interface UserProfileDashboard {
  userId: string;
  status?: string;
  level?: number;
  rank?: string;

  social: UserProfileSocial;
  favorites: UserFavorites;

  library: UserLibraryEntry[];

  reading: UserReadingEntry[];
  activity: UserActivityItem[];
  contributions: UserActivityItem[];
  achievements: UserAchievement[];
}

export const mockUserProfilesDb: UserProfileDashboard[] = [
  {
    userId: 'u1',
    status: 'Читаю по 30 минут в день.',
    level: 7,
    rank: 'Собиратель цитат',
    social: {
      followersUserIds: ['u2', 'u3'],
      followingUserIds: ['u2'],
    },
    favorites: {
      bookIds: ['1', '2'],
      characterIds: ['c1', 'c2'],
      quoteIds: ['q1', 'q3'],
    },
    library: [
      { bookId: '1', status: 'completed', createdAt: '2026-01-10T10:00:00.000Z' },
      { bookId: '2', status: 'reading_now', createdAt: '2026-01-20T10:00:00.000Z' },
      { bookId: '3', status: 'planned', createdAt: '2026-01-28T10:00:00.000Z' },
      { bookId: '4', status: 'onHold', createdAt: '2026-01-15T10:00:00.000Z' },
      { bookId: '5', status: 'dropped', createdAt: '2026-01-12T10:00:00.000Z' },
    ],
    reading: [
      {
        bookId: '1',
        status: 'finished',
        startedAt: '2026-01-03T10:00:00.000Z',
        finishedAt: '2026-01-10T10:00:00.000Z',
      },
      {
        bookId: '2',
        status: 'reading',
        startedAt: '2026-01-20T10:00:00.000Z',
      },
    ],
    activity: [
      {
        id: 'ua-1',
        type: 'review',
        createdAt: '2026-01-22T10:00:00.000Z',
        title: 'Отзыв: коротко по делу',
        text: 'Сильный финал и хороший темп. Переосмыслил пару вещей.',
        bookId: '1',
        likes: 14,
        verification: 'Community',
      },
      {
        id: 'ua-2',
        type: 'comment',
        createdAt: '2026-01-23T10:00:00.000Z',
        title: 'Комментарий',
        text: 'Согласен с трактовкой, но я бы иначе расставил акценты.',
        bookId: '2',
        partId: 'p2',
        likes: 6,
        verification: 'None',
      },
      {
        id: 'ua-3',
        type: 'quote',
        createdAt: '2026-01-24T10:00:00.000Z',
        title: 'Добавил цитату',
        text: '«Природа не храм, а мастерская.»',
        bookId: '1',
        partId: 'p1',
        likes: 9,
        verification: 'AI',
      },
      {
        id: 'ua-4',
        type: 'word',
        createdAt: '2026-01-25T10:00:00.000Z',
        title: 'Пояснил слово',
        text: '«Нигилизм»: отрицание авторитетов и традиционных ценностей.',
        bookId: '1',
        partId: 'p1',
        likes: 11,
        verification: 'AI',
      },
    ],
    contributions: [
      {
        id: 'uc-1',
        type: 'word',
        createdAt: '2026-01-25T10:00:00.000Z',
        title: 'Пояснение слова',
        text: '«Нигилизм»: отрицание авторитетов и традиционных ценностей.',
        bookId: '1',
        partId: 'p1',
        likes: 11,
        verification: 'AI',
      },
      {
        id: 'uc-2',
        type: 'context',
        createdAt: '2026-01-24T12:00:00.000Z',
        title: 'Контекст',
        text: 'Короткая справка о эпохе и том, почему спор поколений здесь ключевой.',
        bookId: '1',
        likes: 5,
        verification: 'Community',
      },
      {
        id: 'uc-3',
        type: 'quote',
        createdAt: '2026-01-24T10:00:00.000Z',
        title: 'Цитата',
        text: '«Природа не храм, а мастерская.»',
        bookId: '1',
        partId: 'p1',
        likes: 9,
        verification: 'AI',
      },
      {
        id: 'uc-4',
        type: 'comment',
        createdAt: '2026-01-23T10:00:00.000Z',
        title: 'Комментарий (полезно)',
        text: 'Согласен с трактовкой, но я бы иначе расставил акценты.',
        bookId: '2',
        partId: 'p2',
        likes: 6,
        verification: 'None',
      },
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Первые 10 лайков',
        description: 'Сообщество оценило твой вклад.',
        rarity: 'common',
        earnedAt: '2026-01-12T10:00:00.000Z',
      },
      {
        id: 'ach-2',
        title: 'AI verified',
        description: 'ИИ подтвердил 3 твоих пояснения/контекста.',
        rarity: 'rare',
        earnedAt: '2026-01-25T10:00:00.000Z',
      },
    ],
  },
  {
    userId: 'u2',
    status: 'Модерация и ревью вкладов.',
    level: 12,
    rank: 'Хранитель качества',
    social: {
      followersUserIds: ['u1'],
      followingUserIds: ['u1', 'u3'],
    },
    favorites: {
      bookIds: ['2'],
      characterIds: ['c2'],
      quoteIds: ['q2'],
    },
    library: [{ bookId: '2', status: 'completed', createdAt: '2026-01-12T10:00:00.000Z' }],
    reading: [
      {
        bookId: '2',
        status: 'finished',
        startedAt: '2026-01-05T10:00:00.000Z',
        finishedAt: '2026-01-12T10:00:00.000Z',
      },
    ],
    activity: [],
    contributions: [],
    achievements: [],
  },
];

export function getMockUserProfileByUserId(userId: string) {
  return mockUserProfilesDb.find((p) => p.userId === userId);
}

export function getProfileSectionFromSearch(value: string | null): ProfileSection {
  switch (value) {
    case 'library':
    case 'stats':
    case 'activity':
    case 'help':
    case 'challenges':
      return value;
    default:
      return 'library';
  }
}

export function isProfileSectionVisible(_section: ProfileSection, _isSelf: boolean) {
  void _section;
  void _isSelf;
  return true;
}

export function getDefaultProfileSections(_isSelf: boolean) {
  void _isSelf;
  const sections: { key: ProfileSection; title: string }[] = [
    { key: 'library', title: 'Библиотека' },
    { key: 'stats', title: 'Статистика' },
    { key: 'activity', title: 'Активность' },
    { key: 'help', title: 'Помощь сообществу ⭐' },
    { key: 'challenges', title: 'Челленджи' },
  ];

  return sections;
}

export function getCommunityHelpStats(profile: UserProfileDashboard) {
  const aiVerified = profile.contributions.filter((c) => c.verification === 'AI').length;
  const communityVerified = profile.contributions.filter((c) => c.verification === 'Community').length;
  const totalLikes = profile.contributions.reduce((acc, c) => acc + c.likes, 0);

  return {
    aiVerified,
    communityVerified,
    totalLikes,
  };
}

export function getSelfOrOtherLabel(user: User, isSelf: boolean) {
  return isSelf ? `@${user.username}` : user.username;
}
