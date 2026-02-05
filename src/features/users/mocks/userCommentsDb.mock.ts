import type { Comment } from '@/types/core';

export interface UserCommentActivity {
  comment: Comment;
  parentComment?: Comment;
  bookTitle: string;
  bookCoverUrl?: string;
}

export const mockUserCommentsActivity: UserCommentActivity[] = [
  {
    comment: {
      id: 'uc1',
      userId: 'u1',
      bookId: '1',
      text: 'Друзья, как вы знаете, сейчас в Кыргызстане один из самых грязных уровней воздуха ‼️\nВ продаже маски KN95 - защита от смога и пыли. Сами носили такие в Корее.\nЦвета: белый, чёрный, бежевый.\nЕсть разных видов.',
      likes: 127,
      createdAt: '2026-02-04T10:30:00.000Z',
    },
    bookTitle: 'Преступление и наказание',
    bookCoverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  },
  {
    comment: {
      id: 'uc2',
      userId: 'u1',
      bookId: '2',
      parentCommentId: 'pc1',
      replyToUserId: 'u2',
      text: 'здравствуйте,хочу заказать. как можно будет?',
      likes: 1,
      createdAt: '2026-02-03T15:20:00.000Z',
    },
    parentComment: {
      id: 'pc1',
      userId: 'u2',
      bookId: '2',
      text: 'Друзья, как вы знаете, сейчас в Кыргызстане один из самых грязных уровней воздуха ‼️\nВ продаже маски KN95 - защита от смога и пыли.',
      likes: 156,
      createdAt: '2026-02-03T14:00:00.000Z',
    },
    bookTitle: '1984',
    bookCoverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
  },
  {
    comment: {
      id: 'uc3',
      userId: 'u1',
      bookId: '3',
      text: 'El Psy Kongroo',
      likes: 58,
      createdAt: '2026-02-02T09:15:00.000Z',
    },
    bookTitle: 'Мастер и Маргарита',
    bookCoverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
  },
  {
    comment: {
      id: 'uc4',
      userId: 'u1',
      bookId: '4',
      parentCommentId: 'pc2',
      replyToUserId: 'u3',
      text: "Stein's Gate for sure (wait till 9-11 episode)",
      likes: 30,
      createdAt: '2026-02-01T18:45:00.000Z',
    },
    parentComment: {
      id: 'pc2',
      userId: 'u3',
      bookId: '4',
      text: 'Какую книгу посоветуете для начала знакомства с жанром sci-fi?',
      likes: 12,
      createdAt: '2026-02-01T17:30:00.000Z',
    },
    bookTitle: 'Война и мир',
    bookCoverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
  },
  {
    comment: {
      id: 'uc5',
      userId: 'u1',
      bookId: '5',
      text: 'Эта книга изменила моё восприятие классической литературы. Раньше думал, что это скучно, но теперь понимаю всю глубину.',
      likes: 89,
      createdAt: '2026-01-31T12:00:00.000Z',
    },
    bookTitle: 'Анна Каренина',
    bookCoverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
  },
  {
    comment: {
      id: 'uc6',
      userId: 'u1',
      bookId: '1',
      parentCommentId: 'pc3',
      replyToUserId: 'u4',
      text: 'Полностью согласен! Особенно сцена в конце третьей части.',
      likes: 15,
      createdAt: '2026-01-30T08:30:00.000Z',
    },
    parentComment: {
      id: 'pc3',
      userId: 'u4',
      bookId: '1',
      text: 'Достоевский - гений психологического анализа. Каждый раз перечитываю и нахожу что-то новое.',
      likes: 45,
      createdAt: '2026-01-30T07:00:00.000Z',
    },
    bookTitle: 'Преступление и наказание',
    bookCoverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  },
];

export function getMockUserCommentsActivity(userId: string): UserCommentActivity[] {
  return mockUserCommentsActivity
    .filter((activity) => activity.comment.userId === userId)
    .sort((a, b) => (a.comment.createdAt < b.comment.createdAt ? 1 : -1));
}
