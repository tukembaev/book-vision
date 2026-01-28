import type { CharacterProfile } from '@/types/core';

export const mockCharacterProfilesDb: CharacterProfile[] = [
  {
    id: 'c1',
    bookId: '1',
    name: 'Евгений Базаров',
    aliases: ['Базаров'],
    imageUrl: undefined,
    stats: {
      age: 'около 25',
      height: '—',
      weight: '—',
      socialStatus: 'разночинец',
    },
    illustrations: [
      { id: 'c1-i1', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c1-i2', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c1-i3', imageUrl: undefined, authorName: 'artist (mock)' },
    ],
    descriptionNoSpoilers:
      'Резкий и рациональный герой, ставящий под сомнение авторитеты и провоцирующий столкновение взглядов.',
    descriptionSpoilers:
      'В ключевых моментах проявляет уязвимость и пределы собственной теории, что меняет траекторию конфликта.',
    quotesNoSpoilers: [
      '«Не надо фраз: дело надо делать.»',
      '«Природа не храм, а мастерская.»',
    ],
    quotesSpoilers: ['«Иногда отрицание — тоже вера, просто перевёрнутая.»'],
    favoritedByUserIds: ['u1', 'u2'],
  },
  {
    id: 'c2',
    bookId: '1',
    name: 'Аркадий Кирсанов',
    aliases: ['Аркадий'],
    imageUrl: undefined,
    stats: {
      age: 'около 23',
      height: '—',
      weight: '—',
      socialStatus: 'дворянин',
    },
    illustrations: [
      { id: 'c2-i1', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c2-i2', imageUrl: undefined, authorName: 'artist (mock)' },
    ],
    descriptionNoSpoilers:
      'Друг и спутник, мягче в оценках, разрывается между влияниями и постепенно формирует собственный взгляд.',
    descriptionSpoilers:
      'В финале принимает более личный и спокойный путь, дистанцируясь от крайностей чужих идей.',
    quotesNoSpoilers: ['«Я хочу понять, а не победить в споре.»'],
    quotesSpoilers: ['«Близость важнее теории.»'],
    favoritedByUserIds: ['u3'],
  },
  {
    id: 'c3',
    bookId: '2',
    name: 'Родион Раскольников',
    aliases: ['Родя'],
    imageUrl: undefined,
    stats: {
      age: 'около 23',
      height: '—',
      weight: '—',
      socialStatus: 'студент',
    },
    illustrations: [
      { id: 'c3-i1', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c3-i2', imageUrl: undefined, authorName: 'artist (mock)' },
    ],
    descriptionNoSpoilers:
      'Человек, пытающийся оправдать поступок идеей и сталкивающийся с разрушением внутренней целостности.',
    descriptionSpoilers:
      'Перелом наступает, когда теория перестаёт быть абстракцией и начинает разрушать связи с людьми.',
    quotesNoSpoilers: ['«Я только хотел проверить…»'],
    quotesSpoilers: ['«Никакая идея не стоит человеческой жизни.»'],
    favoritedByUserIds: ['u2', 'u3'],
  },
  {
    id: 'c4',
    bookId: '2',
    name: 'Соня Мармеладова',
    aliases: ['Соня'],
    imageUrl: undefined,
    stats: {
      age: 'около 18',
      height: '—',
      weight: '—',
      socialStatus: 'бедность',
    },
    illustrations: [
      { id: 'c4-i1', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c4-i2', imageUrl: undefined, authorName: 'artist (mock)' },
    ],
    descriptionNoSpoilers:
      'Сострадание и вера, становится опорой в момент морального краха героя.',
    descriptionSpoilers:
      'Важнейшая роль — не спасение «чудом», а выдерживание тяжести рядом и помощь принять ответственность.',
    quotesNoSpoilers: ['«Иногда нужно просто быть рядом.»'],
    quotesSpoilers: ['«Прощение не отменяет правды.»'],
    favoritedByUserIds: ['u1'],
  },
  {
    id: 'c5',
    bookId: '3',
    name: 'Воланд',
    aliases: ['профессор'],
    imageUrl: undefined,
    stats: {
      age: '—',
      height: '—',
      weight: '—',
      socialStatus: 'таинственный гость',
    },
    illustrations: [
      { id: 'c5-i1', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c5-i2', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c5-i3', imageUrl: undefined, authorName: 'artist (mock)' },
    ],
    descriptionNoSpoilers:
      'Фигура, запускающая цепочку событий, где сатира и мистический слой переплетаются в испытание общества.',
    descriptionSpoilers:
      'В кульминации показывает границу между наказанием и справедливостью, оставляя героям «их выбор».',
    quotesNoSpoilers: ['«Рукописи не горят.»'],
    quotesSpoilers: ['«Справедливость редко выглядит как милость.»'],
    favoritedByUserIds: ['u2'],
  },
  {
    id: 'c6',
    bookId: '3',
    name: 'Маргарита',
    aliases: ['—'],
    imageUrl: undefined,
    stats: {
      age: 'около 30',
      height: '—',
      weight: '—',
      socialStatus: 'городская интеллигенция',
    },
    illustrations: [
      { id: 'c6-i1', imageUrl: undefined, authorName: 'artist (mock)' },
      { id: 'c6-i2', imageUrl: undefined, authorName: 'artist (mock)' },
    ],
    descriptionNoSpoilers:
      'Сильная и свободная героиня, движимая любовью и выбором, готовая действовать.',
    descriptionSpoilers:
      'Через испытания приобретает не «награду», а право на свой вариант спокойствия.',
    quotesNoSpoilers: ['«Я выбираю сама.»'],
    quotesSpoilers: ['«Свобода требует цены.»'],
    favoritedByUserIds: ['u1', 'u3'],
  },
];

export function getMockCharacterProfileById(characterId: string) {
  return mockCharacterProfilesDb.find((c) => c.id === characterId);
}

export type CharacterSort = 'popularity' | 'favorites';

export interface CharacterCatalogEntry {
  id: string;
  bookId: string;
  name: string;
  aliases: string[];
  descriptionNoSpoilers: string;
  popularityScore: number;
  favoritesCount: number;
}

export function getMockCharactersCatalogEntries() {
  const base: CharacterCatalogEntry[] = mockCharacterProfilesDb.map((c) => ({
    id: c.id,
    bookId: c.bookId,
    name: c.name,
    aliases: c.aliases,
    descriptionNoSpoilers: c.descriptionNoSpoilers,
    popularityScore: c.illustrations.length * 10 + c.quotesNoSpoilers.length * 5,
    favoritesCount: c.favoritedByUserIds.length,
  }));

  return base;
}
