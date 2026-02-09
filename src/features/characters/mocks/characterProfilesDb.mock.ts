import type { CharacterProfile } from '@/types/core';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';

export const mockCharacterProfilesDb: CharacterProfile[] = [
  {
    id: 'c1',
    bookId: '1',
    name: 'Евгений Базаров',
    aliases: ['Базаров'],
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH3ickUcXbXLQFNfkJOmDOu3NZnhxRCqg77fF7s67Iud2sjJrlFlIAVof-9fviyXXQTZX-3gKYCP8Hg-wEDt8hmCJGB6_-UMFk-FVHarg&s=10',
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
    imageUrl: 'https://robohash.org/Arkady-Kirsanov.png?set=set5',
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
    imageUrl: 'https://robohash.org/Raskolnikov-Dostoyevsky.png?set=set5',
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
    imageUrl: 'https://robohash.org/Sonya-Marmeladova.png?set=set5',
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
    imageUrl: 'https://robohash.org/Woland-Bulgakov.png?set=set5',
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
    imageUrl: 'https://robohash.org/Margarita-Bulgakov.png?set=set5',
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
  imageUrl?: string;
}

export function getMockCharactersCatalogEntries() {
  const base: CharacterCatalogEntry[] = mockCharacterProfilesDb.map((c) => ({
    id: c.id,
    bookId: c.bookId,
    name: c.name,
    aliases: c.aliases,
    descriptionNoSpoilers: c.descriptionNoSpoilers,
    popularityScore: c.illustrations.length * 10 + c.quotesNoSpoilers.length * 5,
    favoritesCount: c.quotesNoSpoilers.length * 7,
    imageUrl: c.imageUrl,
  }));

  return base;
}

export function getFeaturedCharacter(): CharacterCatalogEntry & { quote: string; socialStatus: string } {
  const sorted = getMockCharactersCatalogEntries().sort(
    (a, b) => b.popularityScore - a.popularityScore,
  );
  const top = sorted[0];
  const profile = mockCharacterProfilesDb.find((c) => c.id === top.id)!;
  return {
    ...top,
    quote: profile.quotesNoSpoilers[0] ?? '',
    socialStatus: profile.stats.socialStatus ?? '—',
  };
}

export function getPopularCharacters(): (CharacterCatalogEntry & { quote: string })[] {
  const sorted = getMockCharactersCatalogEntries().sort(
    (a, b) => b.popularityScore - a.popularityScore,
  );
  const featuredId = sorted[0]?.id;
  return sorted
    .filter((c) => c.id !== featuredId)
    .slice(0, 4)
    .map((c) => {
      const profile = mockCharacterProfilesDb.find((p) => p.id === c.id);
      return {
        ...c,
        quote: profile?.quotesNoSpoilers[0] ?? '',
      };
    });
}

export interface CharactersByBookGroup {
  bookId: string;
  bookTitle: string;
  characters: { id: string; name: string }[];
}

export function getCharactersByBook(): CharactersByBookGroup[] {
  const groups = new Map<string, { id: string; name: string }[]>();

  for (const c of mockCharacterProfilesDb) {
    const arr = groups.get(c.bookId) ?? [];
    arr.push({ id: c.id, name: c.name });
    groups.set(c.bookId, arr);
  }

  const results: CharactersByBookGroup[] = [];
  for (const [bookId, chars] of groups.entries()) {
    const book = getMockBookById(bookId);
    results.push({
      bookId,
      bookTitle: book?.title ?? 'Неизвестная книга',
      characters: chars,
    });
  }
  return results;
}

export function getCatalogEntriesByBookId(bookId: string): CharacterCatalogEntry[] {
  return getMockCharactersCatalogEntries()
    .filter((c) => c.bookId === bookId)
    .sort((a, b) => b.popularityScore - a.popularityScore);
}

export function getRandomQuotes(): { characterName: string; characterId: string; quote: string }[] {
  const all: { characterName: string; characterId: string; quote: string }[] = [];
  for (const c of mockCharacterProfilesDb) {
    for (const q of c.quotesNoSpoilers) {
      all.push({ characterName: c.name, characterId: c.id, quote: q });
    }
  }
  // Deterministic shuffle based on index
  return all.sort((a, b) => a.quote.length - b.quote.length).slice(0, 3);
}
