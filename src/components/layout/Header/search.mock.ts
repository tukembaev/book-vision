export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  category: 'book' | 'author' | 'club' | 'challenge';
}

export const mockSearchResults: SearchResult[] = [
  // Books
  { id: 'b1', title: 'Отцы и дети', subtitle: 'Иван Тургенев', url: '/books/1', category: 'book' },
  { id: 'b2', title: 'Преступление и наказание', subtitle: 'Фёдор Достоевский', url: '/books/2', category: 'book' },
  { id: 'b3', title: 'Война и мир', subtitle: 'Лев Толстой', url: '/books/3', category: 'book' },
  { id: 'b4', title: 'Мастер и Маргарита', subtitle: 'Михаил Булгаков', url: '/books/4', category: 'book' },
  { id: 'b5', title: 'Евгений Онегин', subtitle: 'Александр Пушкин', url: '/books/5', category: 'book' },
  
  // Authors
  { id: 'a1', title: 'Иван Тургенев', subtitle: '12 книг', url: '/authors/turgenev', category: 'author' },
  { id: 'a2', title: 'Фёдор Достоевский', subtitle: '15 книг', url: '/authors/dostoevsky', category: 'author' },
  { id: 'a3', title: 'Лев Толстой', subtitle: '18 книг', url: '/authors/tolstoy', category: 'author' },
  { id: 'a4', title: 'Михаил Булгаков', subtitle: '8 книг', url: '/authors/bulgakov', category: 'author' },
  { id: 'a5', title: 'Александр Пушкин', subtitle: '25 книг', url: '/authors/pushkin', category: 'author' },
  
  // Clubs
  { id: 'c1', title: 'Русская классика', subtitle: '234 участника', url: '/clubs/1', category: 'club' },
  { id: 'c2', title: 'Философия в литературе', subtitle: '156 участников', url: '/clubs/2', category: 'club' },
  { id: 'c3', title: 'Детективы и триллеры', subtitle: '312 участников', url: '/clubs/3', category: 'club' },
  { id: 'c4', title: 'Поэзия и проза', subtitle: '89 участников', url: '/clubs/4', category: 'club' },
  { id: 'c5', title: 'Современная литература', subtitle: '201 участник', url: '/clubs/5', category: 'club' },
  
  // Challenges
  { id: 'ch1', title: 'Читать 30 дней', subtitle: '45 участников', url: '/challenges/1', category: 'challenge' },
  { id: 'ch2', title: '100 книг за год', subtitle: '234 участника', url: '/challenges/2', category: 'challenge' },
  { id: 'ch3', title: 'Русская классика за месяц', subtitle: '78 участников', url: '/challenges/3', category: 'challenge' },
  { id: 'ch4', title: 'Философский марафон', subtitle: '34 участника', url: '/challenges/4', category: 'challenge' },
  { id: 'ch5', title: 'Детективный челлендж', subtitle: '92 участника', url: '/challenges/5', category: 'challenge' },
];

export const categoryConfig = {
  book: { label: 'Книги', icon: '📚' },
  author: { label: 'Авторы', icon: '✍️' },
  club: { label: 'Клубы', icon: '👥' },
  challenge: { label: 'Челленджи', icon: '🏆' },
} as const;
