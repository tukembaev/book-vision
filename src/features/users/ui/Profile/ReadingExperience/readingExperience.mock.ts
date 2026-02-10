export interface ReadingNote {
  id: string;
  bookId: string;
  bookTitle: string;
  sectionTitle: string;
  note: string;
  createdAt: string;
  pageNumber?: number;
}

export const mockReadingNotes: ReadingNote[] = [
  {
    id: 'rn-1',
    bookId: '1',
    bookTitle: 'Отцы и дети',
    sectionTitle: 'Приезд Базарова',
    note: 'Базаров сразу производит сильное впечатление на Аркадия. Его уверенность и прямолинейность контрастируют с мягкостью Кирсановых. Чувствуется напряжение между старым и новым поколением.',
    createdAt: '2026-01-05T14:30:00.000Z',
    pageNumber: 12,
  },
  {
    id: 'rn-2',
    bookId: '1',
    bookTitle: 'Отцы и дети',
    sectionTitle: 'Спор за столом',
    note: 'Павел Петрович и Базаров — два полюса. Один держится за принципы, другой всё отрицает. Тургенев не выбирает сторону, а показывает трагедию обоих.',
    createdAt: '2026-01-06T10:00:00.000Z',
    pageNumber: 45,
  },
  {
    id: 'rn-3',
    bookId: '2',
    bookTitle: 'Преступление и наказание',
    sectionTitle: 'Раскольников и старуха',
    note: 'Внутренний монолог Раскольникова перед преступлением — один из самых мощных моментов. Достоевский погружает читателя в разум человека на грани.',
    createdAt: '2026-01-22T18:15:00.000Z',
    pageNumber: 58,
  },
  {
    id: 'rn-4',
    bookId: '2',
    bookTitle: 'Преступление и наказание',
    sectionTitle: 'Встреча с Соней',
    note: 'Соня как символ жертвенности и веры. Достоевский противопоставляет её чистоту рационализму Раскольникова. Здесь начинается его путь к искуплению.',
    createdAt: '2026-01-25T09:00:00.000Z',
    pageNumber: 240,
  },
  {
    id: 'rn-5',
    bookId: '1',
    bookTitle: 'Отцы и дети',
    sectionTitle: 'Смерть Базарова',
    note: 'Финал поражает. Базаров, который отрицал всё, встречает смерть с неожиданной нежностью. Тургенев показывает, что за маской нигилизма скрывается живой человек.',
    createdAt: '2026-01-10T20:00:00.000Z',
    pageNumber: 290,
  },
];

export function getMockReadingNotesByBookId(bookId: string): ReadingNote[] {
  return mockReadingNotes.filter((n) => n.bookId === bookId);
}
