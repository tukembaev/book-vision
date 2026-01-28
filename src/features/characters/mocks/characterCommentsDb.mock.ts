export interface CharacterComment {
  id: string;
  characterId: string;
  userId: string;
  text: string;
  likes: number;
  createdAt: string;
}

export const mockCharacterCommentsDb: CharacterComment[] = [
  {
    id: 'cc1',
    characterId: 'c1',
    userId: 'u1',
    text: 'Сильнее всего работает как «конфликт метода» — он не злой, он последовательный.',
    likes: 12,
    createdAt: '2026-01-12T10:00:00.000Z',
  },
  {
    id: 'cc2',
    characterId: 'c1',
    userId: 'u2',
    text: 'Сцены диалогов — как дуэли. Понимаешь персонажа именно по интонациям.',
    likes: 9,
    createdAt: '2026-01-13T11:30:00.000Z',
  },
  {
    id: 'cc3',
    characterId: 'c3',
    userId: 'u3',
    text: 'Пугает не поступок, а то, как он потом пытается объяснить себе, что всё нормально.',
    likes: 7,
    createdAt: '2026-01-14T08:10:00.000Z',
  },
];

export function getMockCharacterComments(characterId: string) {
  return mockCharacterCommentsDb
    .filter((c) => c.characterId === characterId)
    .slice()
    .sort((a, b) => b.likes - a.likes || b.createdAt.localeCompare(a.createdAt));
}
