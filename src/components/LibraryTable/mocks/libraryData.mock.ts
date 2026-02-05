import type { LibraryBookEntry, AuthorInfo } from '../types';

export const mockAuthors: AuthorInfo[] = [
  { id: 'a1', name: 'Оноре Де Бальзак', country: 'Франция', birthYear: 1799, deathYear: 1850, bio: 'Французский писатель, один из основоположников реализма в европейской литературе.', booksCount: 95 },
  { id: 'a2', name: 'Михаил Лермонтов', country: 'Россия', birthYear: 1814, deathYear: 1841, bio: 'Русский поэт, прозаик, драматург, художник.', booksCount: 12 },
  { id: 'a3', name: 'Лев Толстой', country: 'Россия', birthYear: 1828, deathYear: 1910, bio: 'Один из величайших писателей мира, мыслитель.', booksCount: 174 },
  { id: 'a4', name: 'Федор Достоевский', country: 'Россия', birthYear: 1821, deathYear: 1881, bio: 'Русский писатель, мыслитель, философ и публицист.', booksCount: 29 },
  { id: 'a5', name: 'Виктор Гюго', country: 'Франция', birthYear: 1802, deathYear: 1885, bio: 'Французский писатель, поэт, драматург.', booksCount: 52 },
  { id: 'a6', name: 'Александр Куприн', country: 'Россия', birthYear: 1870, deathYear: 1938, bio: 'Русский писатель, переводчик.', booksCount: 18 },
  { id: 'a7', name: 'Александр Пушкин', country: 'Россия', birthYear: 1799, deathYear: 1837, bio: 'Великий русский поэт, драматург и прозаик.', booksCount: 83 },
  { id: 'a8', name: 'А.С. Пушкин', country: 'Россия', birthYear: 1799, deathYear: 1837, bio: 'Великий русский поэт, драматург и прозаик.', booksCount: 83 },
  { id: 'a9', name: 'Джордж Оруэлл', country: 'Великобритания', birthYear: 1903, deathYear: 1950, bio: 'Британский писатель и публицист.', booksCount: 11 },
  { id: 'a10', name: 'Чингиз Айтматов', country: 'Киргизия', birthYear: 1928, deathYear: 2008, bio: 'Киргизский и русский писатель.', booksCount: 15 },
  { id: 'a11', name: 'Иван Гончаров', country: 'Россия', birthYear: 1812, deathYear: 1891, bio: 'Русский писатель и литературный критик.', booksCount: 8 },
  { id: 'a12', name: 'Гиде Мо Пассан', country: 'Франция', birthYear: 1850, deathYear: 1893, bio: 'Французский писатель, мастер новеллы.', booksCount: 36 },
  { id: 'a13', name: 'Александр Грибоедов', country: 'Россия', birthYear: 1795, deathYear: 1829, bio: 'Русский дипломат, поэт, драматург.', booksCount: 3 },
  { id: 'a14', name: 'Джек Лондон', country: 'США', birthYear: 1876, deathYear: 1916, bio: 'Американский писатель.', booksCount: 52 },
  { id: 'a15', name: 'Станислав Лем', country: 'Польша', birthYear: 1921, deathYear: 2006, bio: 'Польский писатель-фантаст, футуролог.', booksCount: 64 },
  { id: 'a16', name: 'Антон Чехов', country: 'Россия', birthYear: 1860, deathYear: 1904, bio: 'Русский писатель, драматург, врач.', booksCount: 201 },
  { id: 'a17', name: 'Альбер Камю', country: 'Франция', birthYear: 1913, deathYear: 1960, bio: 'Французский писатель и философ, лауреат Нобелевской премии.', booksCount: 14 },
  { id: 'a18', name: 'Стефан Цвейг(Австрийц, 1881-1942)', country: 'Австрия', birthYear: 1881, deathYear: 1942, bio: 'Австрийский писатель, критик, автор множества романов и новелл.', booksCount: 32 },
  { id: 'a19', name: 'Владимир Набоков', country: 'Россия/США', birthYear: 1899, deathYear: 1977, bio: 'Русский и американский писатель, поэт, переводчик.', booksCount: 19 },
  { id: 'a20', name: 'Эрнест Хемингуэй', country: 'США', birthYear: 1899, deathYear: 1961, bio: 'Американский писатель и журналист, лауреат Нобелевской премии.', booksCount: 20 },
];

export const mockLibraryBooks: LibraryBookEntry[] = [
  { id: 'lb1', bookId: 'b1', title: 'Гобсек', author: 'Оноре Де Бальзак', authorId: 'a1', status: 'completed', addedDate: '2024-01-10', readDate: '2024', rating: 'excellent', score: 9, year: 1830, pagesCount: 96 },
  { id: 'lb2', bookId: 'b2', title: 'Герой нашего времени', author: 'Михаил Лермонтов', authorId: 'a2', status: 'completed', addedDate: '2024-02-01', readDate: '2024', rating: 'excellent', score: 9, year: 1840, pagesCount: 224 },
  { id: 'lb3', bookId: 'b3', title: 'Анна Каренина', author: 'Лев Толстой', authorId: 'a3', status: 'completed', addedDate: '2024-02-20', readDate: '2024', rating: 'excellent', score: 9, year: 1877, pagesCount: 864 },
  { id: 'lb4', bookId: 'b4', title: 'Братья Карамазовы', author: 'Федор Достоевский', authorId: 'a4', status: 'completed', addedDate: '2024-03-05', readDate: '2024', rating: 'good', score: 8, year: 1880, pagesCount: 992 },
  { id: 'lb5', bookId: 'b5', title: 'Отверженные', author: 'Виктор Гюго', authorId: 'a5', status: 'completed', addedDate: '2025-07-01', readDate: '12 августа 2025', rating: 'good', score: 8, year: 1862, pagesCount: 1488 },
  { id: 'lb6', bookId: 'b6', title: 'Преступление и наказание', author: 'Федор Достоевский', authorId: 'a4', status: 'completed', addedDate: '2024-08-01', readDate: '18 августа 2024', rating: 'good', score: 7, year: 1866, pagesCount: 608 },
  { id: 'lb7', bookId: 'b7', title: 'Гранатовый браслет ( Audio )', author: 'Александр Куприн', authorId: 'a6', status: 'completed', addedDate: '2024-06-01', readDate: '13 июня 2024', rating: 'good', score: 7, year: 1910, pagesCount: 64 },
  { id: 'lb8', bookId: 'b8', title: 'Евгений Онегин', author: 'Александр Пушкин', authorId: 'a7', status: 'completed', addedDate: '2025-04-10', rating: 'good', score: 7, year: 1833, pagesCount: 224 },
  { id: 'lb9', bookId: 'b9', title: 'Звезда Соломона', author: 'Александр Куприн', authorId: 'a6', status: 'completed', addedDate: '2024-09-10', readDate: '2024', rating: 'good', score: 7, year: 1917, pagesCount: 96 },
  { id: 'lb10', bookId: 'b10', title: 'Дубровский', author: 'А.С. Пушкин', authorId: 'a8', status: 'completed', addedDate: '2025-04-20', readDate: '29 апреля 2025', rating: 'good', score: 7, year: 1841, pagesCount: 128 },
  { id: 'lb11', bookId: 'b11', title: '1984', author: 'Джордж Оруэлл', authorId: 'a9', status: 'completed', addedDate: '2025-10-01', readDate: '25 ноября 2025', rating: 'good', score: 7, year: 1949, pagesCount: 328 },
  { id: 'lb12', bookId: 'b12', title: 'И дольше века длится день', author: 'Чингиз Айтматов', authorId: 'a10', status: 'completed', addedDate: '2025-12-01', readDate: '22 декабря 2025', rating: 'good', score: 7, year: 1980, pagesCount: 352 },
  { id: 'lb13', bookId: 'b13', title: 'Обломов', author: 'Иван Гончаров', authorId: 'a11', status: 'completed', addedDate: '2024-12-01', readDate: '19 декабря 2024 Audio', rating: 'good', score: 7, year: 1859, pagesCount: 576 },
  { id: 'lb14', bookId: 'b14', title: 'Милый друг (Audio)', author: 'Гиде Мо Пассан', authorId: 'a12', status: 'completed', addedDate: '2024-06-10', readDate: '20 июня', rating: 'good', score: 6, year: 1885, pagesCount: 320 },
  { id: 'lb15', bookId: 'b15', title: 'Горе от ума', author: 'Александр Грибоедов', authorId: 'a13', status: 'completed', addedDate: '2024-06-01', readDate: '13 июня 2024 Audiobook', rating: 'average', score: 6, year: 1825, pagesCount: 176 },
  { id: 'lb16', bookId: 'b16', title: 'Мартин Иден', author: 'Джек Лондон', authorId: 'a14', status: 'completed', addedDate: '2024-03-20', readDate: '2024', rating: 'average', score: 5, year: 1909, pagesCount: 416 },
  { id: 'lb17', bookId: 'b17', title: 'Солярис', author: 'Станислав Лем', authorId: 'a15', status: 'completed', addedDate: '2024-04-01', readDate: '2024', rating: 'average', score: 5, year: 1961, pagesCount: 272 },
  { id: 'lb18', bookId: 'b18', title: 'Скрипка Ротшильда', author: 'Антон Чехов', authorId: 'a16', status: 'completed', addedDate: '2024-04-10', readDate: '2024', rating: 'average', score: 5, year: 1894, pagesCount: 16 },
  { id: 'lb19', bookId: 'b19', title: 'Посторонний', author: 'Альбер Камю', authorId: 'a17', status: 'completed', addedDate: '2024-09-01', readDate: '22 сентября 2024', rating: 'average', score: 5, year: 1942, pagesCount: 128 },
  { id: 'lb20', bookId: 'b20', title: 'Шахматная новелла', author: 'Стефан Цвейг(Австрийц, 1881-1942)', authorId: 'a18', status: 'completed', addedDate: '2024-12-01', readDate: '23 декабря 2024', rating: 'average', score: 5, year: 1942, pagesCount: 96 },
  { id: 'lb21', bookId: 'b21', title: 'Арап Петра Великого', author: 'А.С.Пушкин', authorId: 'a8', status: 'completed', addedDate: '2025-04-01', readDate: '15 апреля 2025', rating: 'average', score: 5, year: 1837, pagesCount: 64 },
  { id: 'lb22', bookId: 'b22', title: 'Пиковая дама', author: 'А.С. Пушкин', authorId: 'a8', status: 'completed', addedDate: '2025-05-01', readDate: '6 Мая 2025', rating: 'average', score: 5, year: 1834, pagesCount: 48 },
  { id: 'lb23', bookId: 'b23', title: 'Лолита', author: 'Владимир Набоков', authorId: 'a19', status: 'reading', addedDate: '2025-04-06', readDate: '6 апреля 2025', rating: 'belowAverage', score: 4, year: 1955, pagesCount: 368 },
  { id: 'lb24', bookId: 'b24', title: 'Идиот', author: 'Федор Достоевский', authorId: 'a4', status: 'planned', addedDate: '2026-01-12', year: 1869, pagesCount: 640 },
  { id: 'lb25', bookId: 'b25', title: 'Капитанская дочка', author: 'Александр Пушкин', authorId: 'a7', status: 'planned', addedDate: '2026-01-20', year: 1836, pagesCount: 160 },
  { id: 'lb26', bookId: 'b26', title: 'Чума', author: 'Альбер Камю', authorId: 'a17', status: 'onHold', addedDate: '2025-11-15', year: 1947, pagesCount: 320 },
  { id: 'lb27', bookId: 'b27', title: 'Старик и море', author: 'Эрнест Хемингуэй', authorId: 'a20', status: 'dropped', addedDate: '2025-08-10', readDate: '2025-08-20', rating: 'poor', score: 2, year: 1952, pagesCount: 128 },
];

export function getAuthorById(authorId: string): AuthorInfo | undefined {
  return mockAuthors.find(a => a.id === authorId);
}

export function getAuthorByName(name: string): AuthorInfo | undefined {
  return mockAuthors.find(a => a.name.toLowerCase().includes(name.toLowerCase()));
}

export function searchAuthors(query: string): AuthorInfo[] {
  if (!query) return mockAuthors;
  return mockAuthors.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
}
