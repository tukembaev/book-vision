import type { Character } from '@/types/core';

export const mockCharactersDb: Character[] = [
  {
    id: 'c1',
    bookId: '1',
    name: 'Евгений Базаров',
    description: 'Нигилист, резкий и рациональный, провоцирует споры и меняет окружающих.',
    source: 'wiki',
    verified: true,
    popularityScore: 92,
  },
  {
    id: 'c2',
    bookId: '1',
    name: 'Аркадий Кирсанов',
    description: 'Друг Базарова, мягче в оценках, разрывается между влияниями.',
    source: 'wiki',
    verified: true,
    popularityScore: 70,
  },
  {
    id: 'c3',
    bookId: '2',
    name: 'Родион Раскольников',
    description: 'Бедный студент, пытается оправдать теорию поступком и сталкивается с собой.',
    source: 'wiki',
    verified: true,
    popularityScore: 95,
  },
  {
    id: 'c4',
    bookId: '2',
    name: 'Соня Мармеладова',
    description: 'Сострадание и вера, становится опорой в момент морального краха.',
    source: 'wiki',
    verified: true,
    popularityScore: 88,
  },
  {
    id: 'c5',
    bookId: '3',
    name: 'Воланд',
    description: 'Таинственный гость, приводящий в движение сатирическую и мистическую линию.',
    source: 'wiki',
    verified: true,
    popularityScore: 90,
  },
  {
    id: 'c6',
    bookId: '3',
    name: 'Маргарита',
    description: 'Сильная и свободная героиня, движимая любовью и выбором.',
    source: 'wiki',
    verified: true,
    popularityScore: 89,
  },
];

export function getMockBookCharactersByBookId(bookId: string) {
  return mockCharactersDb
    .filter((c) => c.bookId === bookId)
    .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0));
}
