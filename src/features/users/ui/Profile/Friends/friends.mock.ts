export interface FriendData {
  id: string;
  username: string;
  avatarUrl?: string;
  booksRead: number;
  status: string;
  mutualFriends: number;
}

export const mockFriends: FriendData[] = [
  {
    id: 'u2',
    username: 'moderator',
    avatarUrl: 'https://briefly.ru/static/cache/films/720/34.jpeg',
    booksRead: 34,
    status: 'Модерация и ревью вкладов.',
    mutualFriends: 1,
  },
  {
    id: 'u3',
    username: 'reader',
    avatarUrl: 'https://imo10.labirint.ru/books/893994/cover.jpg/242-0',
    booksRead: 5,
    status: 'Читаю фантастику.',
    mutualFriends: 0,
  },
  {
    id: 'u4',
    username: 'bookworm',
    booksRead: 22,
    status: 'Люблю классику.',
    mutualFriends: 2,
  },
  {
    id: 'u5',
    username: 'philosopher',
    booksRead: 18,
    status: 'Ницше, Камю, Сартр.',
    mutualFriends: 1,
  },
  {
    id: 'u6',
    username: 'novelist',
    booksRead: 45,
    status: 'Пишу рецензии на всё подряд.',
    mutualFriends: 3,
  },
];
