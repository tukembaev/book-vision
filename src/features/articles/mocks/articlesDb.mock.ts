import type { Article, ArticleContentBlock, ArticleType } from '@/types/core';

function buildContent(title: string, excerpt: string): ArticleContentBlock[] {
  return [
    { type: 'p', text: excerpt },
    { type: 'h2', text: 'Контекст' },
    {
      type: 'p',
      text: 'Ниже — структурированный текст (mock), который читается как документ: разделы, аргументы и вопросы.',
    },
    { type: 'h2', text: 'Ключевая мысль' },
    {
      type: 'quote',
      text: 'Книга становится яснее, когда ты понимаешь: что здесь спорят — не люди, а способы видеть мир.',
    },
    { type: 'h2', text: 'Аргументы' },
    { type: 'h3', text: '1) Что автор пытается сделать' },
    { type: 'p', text: `В тексте “${title}” это разворачивается как цепочка маленьких решений, а не один вывод.` },
    { type: 'h3', text: '2) Где читатель обычно ошибается' },
    {
      type: 'p',
      text: 'Частая ошибка — читать события буквально и пропускать моральную “геометрию” книги: что считается допустимым, а что нет.',
    },
    { type: 'h3', text: '3) Как читать, чтобы увидеть смысл' },
    {
      type: 'p',
      text: 'Смотри на повторяющиеся мотивы, на то, что персонажи называют “разумным”, и на цену этих объяснений.',
    },
    { type: 'h2', text: 'Вопросы для обсуждения' },
    { type: 'p', text: 'Какая мысль книги кажется тебе самой современной — и почему?' },
  ];
}

export const mockArticlesDb: Article[] = [
  {
    id: 'a1',
    title: 'Стоит ли читать «Преступление и наказание»? (без спойлеров)',
    type: 'shouldRead',
    authorId: 'u2',
    bookId: '2',
    excerpt:
      'Если ты откладывал из-за “тяжести” — вот честная карта: почему это читается быстрее, чем кажется, и что ты получишь в конце.',
    createdAt: '2026-01-26T10:00:00.000Z',
    likes: 142,
    views: 3100,
    readingMinutes: 6,
    status: { verified: true, verificationType: 'AI' },
    noSpoilers: true,
    shouldRead: { readiness: 'must' },
    coverUrl:'https://img.championat.com/i/y/m/1705310127760022734.jpg',

    content: buildContent(
      'Стоит ли читать «Преступление и наказание»?',
      'Если ты откладывал из-за “тяжести” — вот честная карта: почему это читается быстрее, чем кажется, и что ты получишь в конце.'
    ),
  },
  {
    id: 'a2',
    title: 'Разбор: конфликт “отцов и детей” как спор о языке будущего',
    type: 'analysis',
    authorId: 'u1',
    bookId: '1',
    excerpt:
      'Не про “плохих родителей” и “дерзкую молодежь”: конфликт тут о том, кто имеет право на смысл и как рождается новый словарь эпохи.',
    createdAt: '2026-01-20T12:00:00.000Z',
    likes: 96,
    views: 1450,
    readingMinutes: 8,
    status: { verified: true, verificationType: 'Community' },
    noSpoilers: true,
    coverUrl:'https://www.culture.ru/storage/images/4e973389ed7b0f4f18402026e50d9996/982ba184574c1ca83bc5222375422fea.jpg/g_center,c_fill/74309896.jpg',

    content: buildContent(
      'Разбор: конфликт “отцов и детей” как спор о языке будущего',
      'Не про “плохих родителей” и “дерзкую молодежь”: конфликт тут о том, кто имеет право на смысл и как рождается новый словарь эпохи.'
    ),
  },
  {
    id: 'a3',
    title: 'Лучшие цитаты и почему они “работают” (Мастер и Маргарита)',
    type: 'analysis',
    authorId: 'u2',
    bookId: '3',
    excerpt:
      'Пытаюсь объяснить не “что хотел сказать автор”, а почему некоторые фразы становятся личными паролями для поколения.',
    createdAt: '2026-01-18T09:00:00.000Z',
    likes: 210,
    views: 5200,
    readingMinutes: 7,
    status: { verified: true, verificationType: 'AI' },
    noSpoilers: true,
    coverUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxXl_5Zm9nfB3BzidNDksmBoEskgDUXrrW5A&s',
    content: buildContent(
      'Лучшие цитаты и почему они “работают” (Мастер и Маргарита)',
      'Пытаюсь объяснить не “что хотел сказать автор”, а почему некоторые фразы становятся личными паролями для поколения.'
    ),
  },
  {
    id: 'a4',
    title: 'Рецензия со спойлерами: «Норвежский лес» и честность грусти',
    type: 'review',
    authorId: 'u3',
    bookId: '5',
    excerpt:
      'Это не книга “про любовь”, а про то, как мы учимся жить с тем, что не можем исправить.',
    createdAt: '2026-01-25T08:30:00.000Z',
    coverUrl:'https://iv.okcdn.ru/videoPreview?id=46932101636&type=32&idx=13&tkn=4-Ie623ZZKo68JRRuH7cA7ZJTrc&fn=external_8',
    likes: 34,
    views: 780,
    noSpoilers: false,
  },
  {
    id: 'a5',
    title: 'Подборка: 5 книг, чтобы понять моральный выбор (с Достоевским внутри)',
    type: 'collection',
    authorId: 'u1',
    bookId: '2',
    excerpt:
      'Подборка в формате “если тебе зашло это — попробуй то”. Достоевский тут как точка входа, а не финальная остановка.',
    createdAt: '2026-01-12T14:00:00.000Z',
    likes: 58,
    views: 1900,
    noSpoilers: true,
    coverUrl:'https://www.deutschland.de/sites/default/files/styles/image_carousel_mobile/public/field_visuals/literature-russia-fyodor-dostoevsky-swetlana-geier_a2_0.jpg?itok=i_ZloYjP',

  },
  {
    id: 'a6',
    title: 'Гайд: как читать длинный роман и не сдаться на середине («Отверженные»)',
    type: 'guide',
    authorId: 'u2',
    bookId: '4',
    excerpt:
      'Три стратегии: карта персонажей, ритм чтения и “точки удержания” — чтобы огромный текст стал управляемым.',
    createdAt: '2026-01-10T10:00:00.000Z',
    likes: 77,
    views: 1620,
    noSpoilers: true,
    coverUrl:'https://buklya.com/media/article/6601eae01c568.jpg',

  },
  {
    id: 'a7',
    title: 'Стоит ли читать «Маленького принца» взрослым?',
    type: 'shouldRead',
    authorId: 'u1',
    bookId: '9',
    excerpt:
      'Это короткая книжка, которая неожиданно проверяет твою зрелость. Если ты устал — она работает как мягкая перезагрузка.',
    createdAt: '2026-01-27T07:10:00.000Z',
    likes: 120,
    views: 2600,
    noSpoilers: true,
    shouldRead: { readiness: 'must' },
     coverUrl:'https://www.invictory.org/articles/wp-content/uploads/sites/3/2018/07/maxresdefault-715x400.jpg'
  },
  {
    id: 'a8',
    title: 'Сравнение: «Великий Гэтсби» — роман про любовь или про статус?',
    type: 'comparison',
    authorId: 'u3',
    bookId: '6',
    excerpt:
      'Смотрим на текст как на систему сигналов: что герои показывают друг другу и что скрывают. Любовь — побочный эффект или двигатель?',
    createdAt: '2026-01-22T18:00:00.000Z',
    likes: 41,
    views: 980,
    noSpoilers: true,
    coverUrl:'https://storage.gpm-content.ru/s/tv3/st/2016/07/5eb3445224cf2495f832faff0c95bc3b8857f3fc.jpg',

  },
  {
    id: 'a9',
    title: 'Разбор: почему “чудо” в «Мастере и Маргарите» устроено как суд',
    type: 'analysis',
    authorId: 'u2',
    bookId: '3',
    excerpt:
      'Каждый фантастический эпизод — это не украшение, а механизм распределения вины и ответственности.',
    createdAt: '2026-01-23T11:00:00.000Z',
    likes: 64,
    views: 1120,
    noSpoilers: true,
    coverUrl:'https://skillbox.ru/upload/setka_images/08545813092021_08fda0244b5397e030ee401fd2bea5b24f78a72b.jpg',

      },
  {
    id: 'a10',
    title: 'Дискуссия: “нужно ли дочитывать книгу, если не идёт?”',
    type: 'discussion',
    authorId: 'u1',
    bookId: '1',
    excerpt:
      'Не совет, а приглашение поспорить. Когда “не идёт” — это сигнал про книгу или про твою фазу жизни?',
    createdAt: '2026-01-19T16:00:00.000Z',
    likes: 88,
    views: 4100,
    noSpoilers: true,
    coverUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgda9tF0DN3-Bc0dGFpVQpGPz0AKa78_nd4w&s',

      },
  {
    id: 'a11',
    title: 'Стоит ли читать «Фауста» сейчас (и зачем он вообще)?',
    type: 'shouldRead',
    authorId: 'u2',
    bookId: '8',
    excerpt:
      'Если воспринимать как “старую классику”, будет скучно. Если как текст про цену желания — внезапно становится современным.',
    createdAt: '2026-01-16T09:20:00.000Z',
    likes: 53,
    views: 860,
    noSpoilers: true,
    shouldRead: { readiness: 'maybe' },
    coverUrl:'https://magazineart.art/wp-content/uploads/photo-1580456929009-8ce1525d6a92-min-1024x678.jpg',

      },
  {
    id: 'a12',
    title: 'Рецензия: «Гарри Поттер» как книга про принадлежность',
    type: 'review',
    authorId: 'u3',
    bookId: '7',
    excerpt:
      'Почему взрослые возвращаются в Хогвартс: не из-за магии, а из-за обещания “ты не один”.',
    createdAt: '2026-01-21T07:00:00.000Z',
    likes: 39,
    views: 1500,
    noSpoilers: true,
    coverUrl:'https://bookmix.ru/notes/img/notes_1471358401.jpg',

      },
  {
    id: 'a13',
    title: 'Лучшие статьи недели: что читали и обсуждали больше всего',
    type: 'collection',
    authorId: 'u2',
    bookId: '2',
    excerpt:
      'Короткий дайджест: 6 материалов, которые собрали больше всего сохранений и обсуждений.',
    createdAt: '2026-01-28T12:30:00.000Z',
    likes: 22,
    views: 900,
    coverUrl:'https://abrakadabra.fun/uploads/posts/2022-03/1647626123_1-abrakadabra-fun-p-velikii-getsbi-art-1.jpg',
    noSpoilers: true,
  },
  {
    id: 'a14',
    title: 'Разбор: Родион Раскольников как попытка “сэкономить” совесть',
    type: 'analysis',
    authorId: 'u1',
    bookId: '2',
    excerpt:
      'Что происходит, когда человек пытается рационализировать внутренний запрет и превратить мораль в бухгалтерию.',
    createdAt: '2026-01-24T13:00:00.000Z',
    likes: 75,
    views: 2100,
    noSpoilers: true,
    coverUrl:'https://deti.libfl.ru/attachments/attachment/large/61260a983231da6bebc03944-large.jpg',

      },
];

export function getMockArticles() {
  return mockArticlesDb;
}

export function getMockArticleById(articleId: string) {
  return mockArticlesDb.find((a) => a.id === articleId);
}

export function getMockArticlesByBookId(bookId: string) {
  return mockArticlesDb.filter((a) => a.bookId === bookId);
}

export function getMockArticlesByType(type: ArticleType) {
  return mockArticlesDb.filter((a) => a.type === type);
}
