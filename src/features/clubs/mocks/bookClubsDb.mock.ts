import { getMockBookById } from '@/features/books/mocks/booksDb.mock';

/* ─── Types ─────────────────────────────────────────────── */

export interface ClubMember {
  userId: string;
  username: string;
  role: 'owner' | 'moderator' | 'member';
  joinedAt: string;
  booksDiscussed: number;
  rating: number;
}

export interface ClubDiscussion {
  id: string;
  clubId: string;
  title: string;
  bookId: string | null;
  authorId: string;
  createdAt: string;
  messagesCount: number;
  lastActivityAt: string;
  pinned: boolean;
}

export interface ClubPoll {
  id: string;
  clubId: string;
  question: string;
  options: { label: string; votes: number }[];
  createdAt: string;
  endsAt: string;
  authorId: string;
}

export interface ClubDebate {
  id: string;
  clubId: string;
  title: string;
  bookId: string | null;
  side1: { label: string; supporters: string[] };
  side2: { label: string; supporters: string[] };
  status: 'active' | 'finished';
  createdAt: string;
}

export interface ClubWeeklyBook {
  bookId: string;
  weekLabel: string;
  assignedAt: string;
  endsAt: string;
  discussionId: string | null;
  nextBookId: string | null;
  activeReaderIds: string[];
  readingProgress: number;
}

export interface BookClub {
  id: string;
  name: string;
  description: string;
  philosophy: string;
  rules: string[];
  coverColor: string;
  createdAt: string;
  ownerId: string;
  tags: string[];
  membersCount: number;
  members: ClubMember[];
  weeklyBook: ClubWeeklyBook | null;
  discussions: ClubDiscussion[];
  polls: ClubPoll[];
  debates: ClubDebate[];
  rating: number;
  isPrivate: boolean;
}

/* ─── Mock Data ─────────────────────────────────────────── */

export const mockBookClubsDb: BookClub[] = [
  {
    id: 'club1',
    name: 'Философский Уголок',
    description:
      'Клуб для тех, кто любит разбирать глубокие идеи в литературе. Мы обсуждаем философские романы, спорим о моральных дилеммах и ищем смыслы между строк.',
    philosophy: 'Каждая книга — диалог. Мы не читаем, а разговариваем с автором.',
    rules: [
      'Уважай чужое мнение, даже если не согласен.',
      'Спойлеры только в отведённых ветках.',
      'Минимум одна книга в месяц.',
      'Конструктивная критика приветствуется.',
    ],
    coverColor: 'purple',
    createdAt: '2025-09-01T00:00:00.000Z',
    ownerId: 'u1',
    tags: ['философия', 'классика', 'дискуссии'],
    membersCount: 42,
    members: [
      { userId: 'u1', username: 'arif', role: 'owner', joinedAt: '2025-09-01T00:00:00.000Z', booksDiscussed: 18, rating: 95 },
      { userId: 'u2', username: 'moderator', role: 'moderator', joinedAt: '2025-09-05T00:00:00.000Z', booksDiscussed: 15, rating: 88 },
      { userId: 'u3', username: 'reader', role: 'member', joinedAt: '2025-10-12T00:00:00.000Z', booksDiscussed: 7, rating: 72 },
    ],
    weeklyBook: {
      bookId: '2',
      weekLabel: '3–9 фев 2026',
      assignedAt: '2026-02-03T00:00:00.000Z',
      endsAt: '2026-02-09T23:59:00.000Z',
      discussionId: 'd1',
      nextBookId: '3',
      activeReaderIds: ['u1', 'u2', 'u3'],
      readingProgress: 72,
    },
    discussions: [
      { id: 'd1', clubId: 'club1', title: 'Раскольников — жертва или злодей?', bookId: '2', authorId: 'u1', createdAt: '2026-02-03T10:00:00.000Z', messagesCount: 34, lastActivityAt: '2026-02-09T08:15:00.000Z', pinned: true },
      { id: 'd2', clubId: 'club1', title: 'Природа зла в "Мастере и Маргарите"', bookId: '3', authorId: 'u2', createdAt: '2026-01-28T14:00:00.000Z', messagesCount: 21, lastActivityAt: '2026-02-07T19:30:00.000Z', pinned: false },
      { id: 'd3', clubId: 'club1', title: 'Почему нигилизм Базарова актуален сегодня', bookId: '1', authorId: 'u3', createdAt: '2026-01-20T09:00:00.000Z', messagesCount: 12, lastActivityAt: '2026-01-25T16:00:00.000Z', pinned: false },
    ],
    polls: [
      { id: 'p1', clubId: 'club1', question: 'Кто зайдёт сегодня в 19:00 обсудить главы 3–5?', options: [{ label: 'Буду!', votes: 8 }, { label: 'Не смогу', votes: 3 }, { label: 'Может быть', votes: 5 }], createdAt: '2026-02-09T10:00:00.000Z', endsAt: '2026-02-09T19:00:00.000Z', authorId: 'u1' },
      { id: 'p2', clubId: 'club1', question: 'Какую книгу читаем на следующей неделе?', options: [{ label: 'Братья Карамазовы', votes: 12 }, { label: 'Война и мир', votes: 7 }, { label: 'Анна Каренина', votes: 9 }], createdAt: '2026-02-07T12:00:00.000Z', endsAt: '2026-02-10T23:59:00.000Z', authorId: 'u2' },
    ],
    debates: [
      { id: 'db1', clubId: 'club1', title: 'Можно ли оправдать поступок Раскольникова?', bookId: '2', side1: { label: 'Да, обстоятельства', supporters: ['u3'] }, side2: { label: 'Нет, это преступление', supporters: ['u1', 'u2'] }, status: 'active', createdAt: '2026-02-05T00:00:00.000Z' },
    ],
    rating: 4.8,
    isPrivate: false,
  },
  {
    id: 'club2',
    name: 'Литературная Мастерская',
    description:
      'Клуб для начинающих и опытных читателей, которые хотят глубже понимать технику письма, структуру романов и стиль авторов.',
    philosophy: 'Чтение — навык. Мы учимся читать по-настоящему.',
    rules: [
      'Приходи подготовленным — прочитай хотя бы часть.',
      'Делись заметками и цитатами.',
      'Никакого хейта к авторам.',
    ],
    coverColor: 'teal',
    createdAt: '2025-11-15T00:00:00.000Z',
    ownerId: 'u2',
    tags: ['техника', 'стиль', 'обучение'],
    membersCount: 28,
    members: [
      { userId: 'u2', username: 'moderator', role: 'owner', joinedAt: '2025-11-15T00:00:00.000Z', booksDiscussed: 10, rating: 91 },
      { userId: 'u1', username: 'arif', role: 'member', joinedAt: '2025-12-01T00:00:00.000Z', booksDiscussed: 6, rating: 80 },
    ],
    weeklyBook: {
      bookId: '1',
      weekLabel: '3–9 фев 2026',
      assignedAt: '2026-02-03T00:00:00.000Z',
      endsAt: '2026-02-09T23:59:00.000Z',
      discussionId: 'd4',
      nextBookId: '2',
      activeReaderIds: ['u2', 'u1'],
      readingProgress: 58,
    },
    discussions: [
      { id: 'd4', clubId: 'club2', title: 'Структура повествования у Тургенева', bookId: '1', authorId: 'u2', createdAt: '2026-02-04T11:00:00.000Z', messagesCount: 9, lastActivityAt: '2026-02-08T20:00:00.000Z', pinned: true },
      { id: 'd5', clubId: 'club2', title: 'Как Достоевский строит напряжение', bookId: '2', authorId: 'u1', createdAt: '2026-01-22T08:00:00.000Z', messagesCount: 15, lastActivityAt: '2026-01-30T14:00:00.000Z', pinned: false },
    ],
    polls: [
      { id: 'p3', clubId: 'club2', question: 'Встречаемся в субботу в 17:00?', options: [{ label: 'Да', votes: 11 }, { label: 'Нет', votes: 4 }], createdAt: '2026-02-08T09:00:00.000Z', endsAt: '2026-02-10T17:00:00.000Z', authorId: 'u2' },
    ],
    debates: [
      { id: 'db2', clubId: 'club2', title: 'Тургенев или Достоевский — кто лучший стилист?', bookId: null, side1: { label: 'Тургенев', supporters: ['u2'] }, side2: { label: 'Достоевский', supporters: ['u1'] }, status: 'active', createdAt: '2026-02-01T00:00:00.000Z' },
    ],
    rating: 4.5,
    isPrivate: false,
  },
  {
    id: 'club3',
    name: 'Ночные Читатели',
    description:
      'Для полуночников, которые читают до рассвета. Обсуждаем мистику, триллеры и всё, что не даёт уснуть.',
    philosophy: 'Лучшие книги те, после которых не можешь заснуть.',
    rules: [
      'Обсуждения после 22:00 приветствуются.',
      'Спойлеры — только под спойлер-тегами.',
      'Атмосферные рекомендации обязательны.',
    ],
    coverColor: 'gray',
    createdAt: '2025-10-20T00:00:00.000Z',
    ownerId: 'u3',
    tags: ['мистика', 'триллер', 'ночное чтение'],
    membersCount: 35,
    members: [
      { userId: 'u3', username: 'reader', role: 'owner', joinedAt: '2025-10-20T00:00:00.000Z', booksDiscussed: 12, rating: 85 },
      { userId: 'u1', username: 'arif', role: 'member', joinedAt: '2025-11-05T00:00:00.000Z', booksDiscussed: 4, rating: 70 },
      { userId: 'u2', username: 'moderator', role: 'moderator', joinedAt: '2025-10-25T00:00:00.000Z', booksDiscussed: 9, rating: 82 },
    ],
    weeklyBook: {
      bookId: '3',
      weekLabel: '3–9 фев 2026',
      assignedAt: '2026-02-03T00:00:00.000Z',
      endsAt: '2026-02-09T23:59:00.000Z',
      discussionId: 'd6',
      nextBookId: null,
      activeReaderIds: ['u3', 'u1', 'u2'],
      readingProgress: 45,
    },
    discussions: [
      { id: 'd6', clubId: 'club3', title: 'Воланд — зло или справедливость?', bookId: '3', authorId: 'u3', createdAt: '2026-02-04T23:00:00.000Z', messagesCount: 27, lastActivityAt: '2026-02-09T01:30:00.000Z', pinned: true },
      { id: 'd7', clubId: 'club3', title: 'Самые жуткие сцены в русской классике', bookId: null, authorId: 'u2', createdAt: '2026-01-15T22:00:00.000Z', messagesCount: 19, lastActivityAt: '2026-02-02T00:45:00.000Z', pinned: false },
    ],
    polls: [
      { id: 'p4', clubId: 'club3', question: 'Ночной марафон в пятницу — кто в деле?', options: [{ label: 'Я в деле!', votes: 14 }, { label: 'Пас', votes: 6 }], createdAt: '2026-02-06T21:00:00.000Z', endsAt: '2026-02-08T22:00:00.000Z', authorId: 'u3' },
    ],
    debates: [],
    rating: 4.6,
    isPrivate: false,
  },
  {
    id: 'club4',
    name: 'Книжный Клуб «Диалог»',
    description:
      'Закрытый клуб для серьёзных дискуссий. Каждую неделю — новая книга, строгий формат разбора, аргументированные позиции.',
    philosophy: 'Глубина важнее скорости. Одна книга — одна неделя — один честный разбор.',
    rules: [
      'Вступление по заявке.',
      'Обязательное участие минимум раз в две недели.',
      'Формат разбора: тезис → аргумент → цитата.',
      'Пропустил 3 обсуждения подряд — исключение.',
    ],
    coverColor: 'orange',
    createdAt: '2025-08-10T00:00:00.000Z',
    ownerId: 'u1',
    tags: ['серьёзное чтение', 'разборы', 'закрытый клуб'],
    membersCount: 15,
    members: [
      { userId: 'u1', username: 'arif', role: 'owner', joinedAt: '2025-08-10T00:00:00.000Z', booksDiscussed: 22, rating: 97 },
      { userId: 'u2', username: 'moderator', role: 'moderator', joinedAt: '2025-08-12T00:00:00.000Z', booksDiscussed: 20, rating: 93 },
    ],
    weeklyBook: {
      bookId: '4',
      weekLabel: '3–9 фев 2026',
      assignedAt: '2026-02-03T00:00:00.000Z',
      endsAt: '2026-02-09T23:59:00.000Z',
      discussionId: 'd8',
      nextBookId: '5',
      activeReaderIds: ['u1', 'u2'],
      readingProgress: 90,
    },
    discussions: [
      { id: 'd8', clubId: 'club4', title: 'Разбор: «Маленький принц» — философия для взрослых', bookId: '4', authorId: 'u1', createdAt: '2026-02-03T18:00:00.000Z', messagesCount: 8, lastActivityAt: '2026-02-08T17:00:00.000Z', pinned: true },
    ],
    polls: [],
    debates: [
      { id: 'db3', clubId: 'club4', title: '«Маленький принц» — детская книга или философский трактат?', bookId: '4', side1: { label: 'Детская', supporters: [] }, side2: { label: 'Философский трактат', supporters: ['u1', 'u2'] }, status: 'active', createdAt: '2026-02-04T00:00:00.000Z' },
    ],
    rating: 4.9,
    isPrivate: true,
  },
  {
    id: 'club5',
    name: 'Романтики и Реалисты',
    description:
      'Клуб для тех, кто спорит о героях, переживает за их судьбы и верит (или не верит) в хэппи-энды.',
    philosophy: 'Литература — зеркало, в котором мы узнаём себя.',
    rules: [
      'Эмоции приветствуются, оскорбления — нет.',
      'Делитесь своими любимыми цитатами.',
      'Новички всегда welcome!',
    ],
    coverColor: 'pink',
    createdAt: '2026-01-05T00:00:00.000Z',
    ownerId: 'u3',
    tags: ['романтика', 'драма', 'герои'],
    membersCount: 51,
    members: [
      { userId: 'u3', username: 'reader', role: 'owner', joinedAt: '2026-01-05T00:00:00.000Z', booksDiscussed: 4, rating: 78 },
      { userId: 'u1', username: 'arif', role: 'member', joinedAt: '2026-01-10T00:00:00.000Z', booksDiscussed: 3, rating: 65 },
      { userId: 'u2', username: 'moderator', role: 'member', joinedAt: '2026-01-08T00:00:00.000Z', booksDiscussed: 4, rating: 75 },
    ],
    weeklyBook: {
      bookId: '1',
      weekLabel: '3–9 фев 2026',
      assignedAt: '2026-02-03T00:00:00.000Z',
      endsAt: '2026-02-09T23:59:00.000Z',
      discussionId: null,
      nextBookId: '3',
      activeReaderIds: ['u3', 'u1', 'u2'],
      readingProgress: 30,
    },
    discussions: [
      { id: 'd9', clubId: 'club5', title: 'Любовная линия в «Отцах и детях»', bookId: '1', authorId: 'u3', createdAt: '2026-02-05T15:00:00.000Z', messagesCount: 11, lastActivityAt: '2026-02-08T22:30:00.000Z', pinned: false },
      { id: 'd10', clubId: 'club5', title: 'Самые трагичные пары в литературе', bookId: null, authorId: 'u1', createdAt: '2026-01-20T10:00:00.000Z', messagesCount: 28, lastActivityAt: '2026-02-06T18:00:00.000Z', pinned: true },
    ],
    polls: [
      { id: 'p5', clubId: 'club5', question: 'Лучшая любовная история в русской классике?', options: [{ label: 'Мастер и Маргарита', votes: 18 }, { label: 'Анна Каренина', votes: 15 }, { label: 'Евгений Онегин', votes: 12 }], createdAt: '2026-02-07T08:00:00.000Z', endsAt: '2026-02-14T23:59:00.000Z', authorId: 'u3' },
    ],
    debates: [],
    rating: 4.3,
    isPrivate: false,
  },
];

/* ─── Helpers ───────────────────────────────────────────── */

export function getMockBookClubById(clubId: string) {
  return mockBookClubsDb.find((c) => c.id === clubId);
}

export function getMockBookClubs() {
  return [...mockBookClubsDb].sort((a, b) => b.rating - a.rating);
}

export function getTopRatedClubs(limit = 3) {
  return getMockBookClubs().slice(0, limit);
}

export function getActivePolls(): (ClubPoll & { clubName: string })[] {
  const result: (ClubPoll & { clubName: string })[] = [];
  for (const club of mockBookClubsDb) {
    for (const poll of club.polls) {
      result.push({ ...poll, clubName: club.name });
    }
  }
  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
}

export function getWeeklyBooks(): { clubId: string; clubName: string; bookId: string; bookTitle: string; weekLabel: string }[] {
  const result: { clubId: string; clubName: string; bookId: string; bookTitle: string; weekLabel: string }[] = [];
  for (const club of mockBookClubsDb) {
    if (club.weeklyBook) {
      const book = getMockBookById(club.weeklyBook.bookId);
      result.push({
        clubId: club.id,
        clubName: club.name,
        bookId: club.weeklyBook.bookId,
        bookTitle: book?.title ?? 'Неизвестная книга',
        weekLabel: club.weeklyBook.weekLabel,
      });
    }
  }
  return result;
}

export function getRecentDiscussions(limit = 5): (ClubDiscussion & { clubName: string })[] {
  const result: (ClubDiscussion & { clubName: string })[] = [];
  for (const club of mockBookClubsDb) {
    for (const d of club.discussions) {
      result.push({ ...d, clubName: club.name });
    }
  }
  return result
    .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())
    .slice(0, limit);
}

export function getActiveDebates(): (ClubDebate & { clubName: string })[] {
  const result: (ClubDebate & { clubName: string })[] = [];
  for (const club of mockBookClubsDb) {
    for (const db of club.debates) {
      if (db.status === 'active') {
        result.push({ ...db, clubName: club.name });
      }
    }
  }
  return result;
}

/* ─── Debate Detail Types & Mock ────────────────────────── */

export interface DebateArgument {
  id: string;
  userId: string;
  username: string;
  text: string;
  votes: number;
  createdAt: string;
}

export interface DebateDetail {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  bookId: string | null;
  status: 'active' | 'finished';
  createdAt: string;
  side1: { label: string; arguments: DebateArgument[] };
  side2: { label: string; arguments: DebateArgument[] };
  summary: string | null;
}

const mockDebateDetails: DebateDetail[] = [
  {
    id: 'db1',
    clubId: 'club1',
    clubName: 'Философский Уголок',
    title: 'Можно ли оправдать поступок Раскольникова?',
    bookId: '2',
    status: 'active',
    createdAt: '2026-02-05T00:00:00.000Z',
    side1: {
      label: 'Да, обстоятельства',
      arguments: [
        { id: 'a1', userId: 'u3', username: 'reader', text: 'Раскольников жил в нечеловеческих условиях. Нищета, голод, болезнь сестры — всё это давило на него. Общество, которое допускает такое неравенство, несёт свою долю ответственности за его поступок.', votes: 12, createdAt: '2026-02-05T10:00:00.000Z' },
        { id: 'a2', userId: 'u3', username: 'reader', text: 'Старуха-процентщица сама была жестока к бедным. Она наживалась на чужом горе. Это не снимает вину, но создаёт контекст, в котором поступок выглядит менее однозначно.', votes: 8, createdAt: '2026-02-06T14:00:00.000Z' },
        { id: 'a3', userId: 'u1', username: 'arif', text: 'Важно различать «оправдать» и «понять». Понять мотивы Раскольникова можно — и именно это делает роман великим. Достоевский не даёт простых ответов.', votes: 15, createdAt: '2026-02-05T12:30:00.000Z' },
      ],
    },
    side2: {
      label: 'Нет, это преступление',
      arguments: [
        { id: 'a4', userId: 'u1', username: 'arif', text: 'Никакие обстоятельства не могут оправдать убийство. Это базовый принцип морали. Раскольников сам это понимает — именно поэтому его мучает совесть на протяжении всего романа.', votes: 18, createdAt: '2026-02-05T11:00:00.000Z' },
        { id: 'a5', userId: 'u2', username: 'moderator', text: 'Теория «сверхчеловека» Раскольникова — это самообман. Он хочет верить, что имеет право решать чужие судьбы, но сам же разрушается от этого. Достоевский явно показывает: идея порочна.', votes: 14, createdAt: '2026-02-05T15:00:00.000Z' },
        { id: 'a6', userId: 'u2', username: 'moderator', text: 'Не забываем, что он убил не только старуху, но и Лизавету — невинную, кроткую женщину. Это полностью разрушает любую попытку оправдания «справедливостью».', votes: 11, createdAt: '2026-02-06T09:00:00.000Z' },
      ],
    },
    summary: null,
  },
  {
    id: 'db2',
    clubId: 'club2',
    clubName: 'Литературная Мастерская',
    title: 'Тургенев или Достоевский — кто лучший стилист?',
    bookId: null,
    status: 'finished',
    createdAt: '2026-02-01T00:00:00.000Z',
    side1: {
      label: 'Тургенев',
      arguments: [
        { id: 'a7', userId: 'u2', username: 'moderator', text: 'Тургенев — мастер лаконичности. Каждое слово на своём месте. Его проза прозрачна, как стекло, и при этом полна нюансов. «Отцы и дети» — образец стилистического совершенства.', votes: 9, createdAt: '2026-02-01T10:00:00.000Z' },
        { id: 'a8', userId: 'u2', username: 'moderator', text: 'Пейзажи Тургенева — это отдельный вид искусства. Природа у него не фон, а полноценный участник повествования, отражающий внутренний мир героев.', votes: 7, createdAt: '2026-02-02T08:00:00.000Z' },
      ],
    },
    side2: {
      label: 'Достоевский',
      arguments: [
        { id: 'a9', userId: 'u1', username: 'arif', text: 'Достоевский создал совершенно новый тип прозы — полифонический роман. Его стиль нервный, лихорадочный, но именно это передаёт внутреннее состояние героев так, как никто другой не мог.', votes: 13, createdAt: '2026-02-01T12:00:00.000Z' },
        { id: 'a10', userId: 'u1', username: 'arif', text: 'Диалоги Достоевского — это высшая форма литературного мастерства. Каждый персонаж говорит своим голосом, и через речь раскрывается целая философия.', votes: 10, createdAt: '2026-02-02T14:00:00.000Z' },
      ],
    },
    summary: 'Дебаты завершились с перевесом в сторону Достоевского. Участники пришли к выводу, что оба автора — мастера, но работают в разных регистрах: Тургенев — в классической гармонии, Достоевский — в экспрессивном напряжении. Стиль зависит от задачи, и сравнивать их — как сравнивать живопись и скульптуру.',
  },
  {
    id: 'db3',
    clubId: 'club4',
    clubName: 'Книжный Клуб «Диалог»',
    title: '«Маленький принц» — детская книга или философский трактат?',
    bookId: '4',
    status: 'active',
    createdAt: '2026-02-04T00:00:00.000Z',
    side1: {
      label: 'Детская',
      arguments: [
        { id: 'a11', userId: 'u3', username: 'reader', text: 'Форма книги — сказка. Простой язык, рисунки, фантастический сюжет. Дети прекрасно её воспринимают без всякой «философской подготовки». Значит, это детская книга, которую взрослые перечитывают.', votes: 6, createdAt: '2026-02-04T10:00:00.000Z' },
      ],
    },
    side2: {
      label: 'Философский трактат',
      arguments: [
        { id: 'a12', userId: 'u1', username: 'arif', text: 'За простотой формы скрываются глубочайшие вопросы: одиночество, ответственность, смерть, смысл жизни. Ребёнок прочтёт сказку, взрослый — экзистенциальный текст. Это и есть признак великой философской работы.', votes: 16, createdAt: '2026-02-04T11:00:00.000Z' },
        { id: 'a13', userId: 'u2', username: 'moderator', text: '«Зорко одно лишь сердце» — это не детская мораль. Это утверждение, которое перекликается с Паскалем и Кьеркегором. Экзюпери сознательно выбрал форму притчи для философских идей.', votes: 12, createdAt: '2026-02-05T09:00:00.000Z' },
      ],
    },
    summary: null,
  },
];

export function getMockDebateDetail(debateId: string): DebateDetail | undefined {
  return mockDebateDetails.find((d) => d.id === debateId);
}

export function getClubDebatesWithDetail(clubId: string): DebateDetail[] {
  return mockDebateDetails.filter((d) => d.clubId === clubId);
}
