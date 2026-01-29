import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout';
import { AppLink } from '@/components/navigation/AppLink';

import { mockBooksDb } from '@/features/books/mocks/booksDb.mock';
import { mockUsersDb } from '@/features/users/mocks/usersDb.mock';

import { getMockArticles } from '../mocks/articlesDb.mock';
import type { Article, ArticleReadiness, ArticleType, Book, User } from '@/types/core';

import {
  articleSectionOrder,
  useArticlesPreferencesStore,
  type ArticleSectionId,
} from '../model/articlesPreferences.store';

type AuthorPeriod = 'week' | 'month';

function getUserById(userId: string) {
  return mockUsersDb.find((u) => u.id === userId);
}

function getBookById(bookId: string) {
  return mockBooksDb.find((b) => b.id === bookId);
}

function articleTypeLabel(type: ArticleType) {
  if (type === 'shouldRead') return 'Стоит ли читать?';
  if (type === 'analysis') return 'Разбор';
  if (type === 'review') return 'Рецензия';
  if (type === 'collection') return 'Подборка';
  if (type === 'guide') return 'Гайд';
  if (type === 'comparison') return 'Сравнение';
  return 'Дискуссия';
}

function readinessLabel(r: ArticleReadiness) {
  if (r === 'must') return 'Обязательно';
  if (r === 'maybe') return 'На любителя';
  return 'Не стоит';
}

function sectionLabelForArticle(article: Article): ArticleSectionId {
  if (article.type === 'shouldRead') return 'shouldRead';
  if (article.type === 'analysis') return 'analysis';
  if (article.type === 'review') return 'reviews';
  if (article.type === 'collection') return 'collections';
  if (article.type === 'guide') return 'guides';
  if (article.type === 'comparison') return 'comparisons';
  return 'discussions';
}

function formatCompactDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  } catch {
    return iso;
  }
}

export default function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookQuery, setBookQuery] = useState('');

  const visibleSections = useArticlesPreferencesStore((s) => s.visibleSections);
  const toggleSection = useArticlesPreferencesStore((s) => s.toggleSection);
  const setAllSections = useArticlesPreferencesStore((s) => s.setAllSections);

  const selectedBookId = searchParams.get('book');

  const [authorPeriod, setAuthorPeriod] = useState<AuthorPeriod>('week');
  const [subscribedAuthorIds, setSubscribedAuthorIds] = useState<Record<string, boolean>>({});

  const allArticles = useMemo(() => getMockArticles(), []);

  const selectedBook = useMemo(() => {
    if (!selectedBookId) return null;
    return getBookById(selectedBookId) ?? null;
  }, [selectedBookId]);

  const filteredArticles = useMemo(() => {
    if (!selectedBookId) return allArticles;
    return allArticles.filter((a) => a.bookId === selectedBookId);
  }, [allArticles, selectedBookId]);

  const bookSearchResults = useMemo(() => {
    const q = bookQuery.trim().toLowerCase();
    if (q.length < 2) return [] as Book[];

    return mockBooksDb
      .filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
      .slice(0, 6);
  }, [bookQuery]);

  const sectionArticles = useMemo(() => {
    const bySection: Record<ArticleSectionId, Article[]> = {
      shouldRead: [],
      best: [],
      popular: [],
      analysis: [],
      reviews: [],
      collections: [],
      guides: [],
      comparisons: [],
      discussions: [],
      new: [],
    };

    for (const a of filteredArticles) {
      const s = sectionLabelForArticle(a);
      bySection[s].push(a);
      bySection.new.push(a);
    }

    bySection.shouldRead = bySection.shouldRead.filter((a) => a.type === 'shouldRead');
    bySection.analysis = bySection.analysis.filter((a) => a.type === 'analysis');
    bySection.reviews = bySection.reviews.filter((a) => a.type === 'review');
    bySection.collections = bySection.collections.filter((a) => a.type === 'collection');
    bySection.guides = bySection.guides.filter((a) => a.type === 'guide');
    bySection.comparisons = bySection.comparisons.filter((a) => a.type === 'comparison');
    bySection.discussions = bySection.discussions.filter((a) => a.type === 'discussion');

    bySection.new = bySection.new
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    bySection.best = filteredArticles
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    bySection.popular = filteredArticles
      .slice()
      .sort((a, b) => b.views - a.views)
      .slice(0, 6);

    bySection.shouldRead = bySection.shouldRead
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    bySection.analysis = bySection.analysis
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    bySection.reviews = bySection.reviews
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 6);

    bySection.collections = bySection.collections
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    bySection.guides = bySection.guides
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    bySection.comparisons = bySection.comparisons
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);

    bySection.discussions = bySection.discussions
      .slice()
      .sort((a, b) => b.views - a.views)
      .slice(0, 6);

    return bySection;
  }, [filteredArticles]);

  const activeAuthors = useMemo(() => {
    const now = Date.now();
    const ms = authorPeriod === 'week' ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;

    const stats = new Map<string, { score: number; articles: number }>();

    for (const a of allArticles) {
      const dt = new Date(a.createdAt).getTime();
      if (!Number.isFinite(dt)) continue;
      if (now - dt > ms) continue;

      const prev = stats.get(a.authorId) ?? { score: 0, articles: 0 };
      stats.set(a.authorId, {
        score: prev.score + a.likes * 2 + Math.round(a.views / 100),
        articles: prev.articles + 1,
      });
    }

    const rows = [...stats.entries()]
      .map(([authorId, v]) => ({ authorId, ...v }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return rows
      .map((r) => ({
        user: getUserById(r.authorId),
        score: r.score,
        articles: r.articles,
      }))
      .filter((r): r is { user: User; score: number; articles: number } => Boolean(r.user));
  }, [allArticles, authorPeriod]);

  const popularBooks = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of allArticles) {
      counts.set(a.bookId, (counts.get(a.bookId) ?? 0) + 1);
    }

    return [...counts.entries()]
      .map(([bookId, n]) => ({ book: getBookById(bookId), n }))
      .filter((r): r is { book: Book; n: number } => Boolean(r.book))
      .sort((a, b) => b.n - a.n)
      .slice(0, 6);
  }, [allArticles]);

  const handleScrollTo = (sectionId: ArticleSectionId) => {
    const el = document.getElementById(`articles-section-${sectionId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ThreeColumnLayout
      left={
        <Box position={{ base: 'static', lg: 'sticky' }} top={{ lg: '6' }}>
          <Box borderWidth="1px" borderRadius="md" p="4">
            <Heading as="h3" size="sm" fontWeight="700">
              Разделы
            </Heading>
            <Text mt="2" fontSize="sm" opacity={0.8}>
              Навигация по странице.
            </Text>

            <Stack mt="4" gap="2">
              {articleSectionOrder.map((s) => (
                <Button
                  key={s.id}
                  variant="ghost"
                  size="sm"
                  justifyContent="flex-start"
                  onClick={() => handleScrollTo(s.id)}
                  disabled={!visibleSections[s.id]}
                >
                  {s.title}
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>
      }
      center={
        <Stack gap="6">
          <Box>
            <Heading as="h2" size="md" fontWeight="700">
              Статьи сообщества
            </Heading>
            <Text mt="2" opacity={0.8}>
              Журнал вокруг книг: разборы, рецензии, подборки и короткие ответы “стоит ли читать?” (mock).
            </Text>
          </Box>

          {articleSectionOrder
            .filter((s) => visibleSections[s.id])
            .map((s) => (
              <ArticlesSection
                key={s.id}
                id={s.id}
                title={s.title}
                subtitle={s.subtitle}
                items={sectionArticles[s.id] ?? []}
                selectedBook={selectedBook}
              />
            ))}

          <Box borderTopWidth="1px" />

          <Box>
            <Heading as="h3" size="sm" fontWeight="700">
              Активные авторы
            </Heading>
            <Text mt="2" fontSize="sm" opacity={0.8}>
              Топ авторов по активности и реакции сообщества.
            </Text>

            <Flex mt="3" gap="2">
              <Button
                size="sm"
                variant={authorPeriod === 'week' ? 'solid' : 'outline'}
                onClick={() => setAuthorPeriod('week')}
              >
                Неделя
              </Button>
              <Button
                size="sm"
                variant={authorPeriod === 'month' ? 'solid' : 'outline'}
                onClick={() => setAuthorPeriod('month')}
              >
                Месяц
              </Button>
            </Flex>

            {activeAuthors.length === 0 ? (
              <Box mt="4" borderWidth="1px" borderRadius="md" p="4">
                <Text fontSize="sm" opacity={0.8}>
                  Пока нет данных за выбранный период.
                </Text>
              </Box>
            ) : (
              <Stack mt="4" gap="3">
                {activeAuthors.map((row) => {
                  const isSubscribed = Boolean(subscribedAuthorIds[row.user.id]);

                  return (
                    <Box key={row.user.id} borderWidth="1px" borderRadius="md" p="4">
                      <Flex align="center" justify="space-between" gap="3">
                        <Box>
                          <AppLink to={`/users/${row.user.id}`} fontWeight="700">
                            {row.user.username}
                          </AppLink>
                          <Text mt="1" fontSize="sm" opacity={0.8}>
                            Статей: {row.articles} · Очки: {row.score}
                          </Text>
                        </Box>
                        <Button
                          size="sm"
                          variant={isSubscribed ? 'outline' : 'solid'}
                          onClick={() =>
                            setSubscribedAuthorIds((prev) => ({
                              ...prev,
                              [row.user.id]: !prev[row.user.id],
                            }))
                          }
                        >
                          {isSubscribed ? 'Подписан' : 'Подписаться'}
                        </Button>
                      </Flex>
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Box>

          <Box borderTopWidth="1px" />

          <Box>
            <Heading as="h3" size="sm" fontWeight="700">
              Хочешь написать статью?
            </Heading>
            <Text mt="2" fontSize="sm" opacity={0.8}>
              Выбери формат: разбор, “стоит ли читать?”, подборка или рецензия.
            </Text>
            <Flex mt="3" gap="3" wrap="wrap">
              <Button size="sm" variant="solid" disabled>
                Написать статью (позже)
              </Button>
              <Button size="sm" variant="outline" disabled>
                Шаблон “Стоит ли читать?”
              </Button>
              <Button size="sm" variant="outline" disabled>
                Шаблон “Разбор”
              </Button>
              <Button size="sm" variant="outline" disabled>
                Шаблон “Подборка”
              </Button>
            </Flex>
          </Box>

          <Box>
            <Heading as="h3" size="sm" fontWeight="700">
              Популярные книги по статьям
            </Heading>
            <Text mt="2" fontSize="sm" opacity={0.8}>
              Книги, к которым чаще всего пишут.
            </Text>

            <Stack mt="3" gap="2">
              {popularBooks.map((r) => (
                <Box key={r.book.id} borderWidth="1px" borderRadius="md" p="3">
                  <AppLink to={`/books/${r.book.id}`} fontWeight="700" fontSize="sm">
                    {r.book.title}
                  </AppLink>
                  <Text mt="1" fontSize="xs" opacity={0.75}>
                    Статей: {r.n}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      }
      right={
        <Box position={{ base: 'static', lg: 'sticky' }} top={{ lg: '6' }}>
          <Stack gap="4">
            <Box borderWidth="1px" borderRadius="md" p="4">
              <Heading as="h3" size="sm" fontWeight="700">
                По книге
              </Heading>
              <Text mt="2" fontSize="sm" opacity={0.8}>
                Быстрый вход: выбери книгу и смотри статьи только по ней.
              </Text>

              <Input
                mt="3"
                size="sm"
                value={bookQuery}
                onChange={(e) => setBookQuery(e.currentTarget.value)}
                placeholder="Название или автор…"
              />

              {selectedBook ? (
                <Box mt="3" borderWidth="1px" borderRadius="md" p="3">
                  <AppLink to={`/books/${selectedBook.id}`} fontWeight="700" fontSize="sm">
                    {selectedBook.title}
                  </AppLink>
                  <Text mt="1" fontSize="xs" opacity={0.75}>
                    {selectedBook.author}
                  </Text>
                  <Button
                    mt="2"
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      next.delete('book');
                      setSearchParams(next);
                    }}
                  >
                    Сбросить
                  </Button>
                </Box>
              ) : null}

              {selectedBook ? null : bookSearchResults.length > 0 ? (
                <Stack mt="3" gap="2">
                  {bookSearchResults.map((b) => (
                    <Button
                      key={b.id}
                      size="sm"
                      variant="outline"
                      justifyContent="flex-start"
                      onClick={() => {
                        const next = new URLSearchParams(searchParams);
                        next.set('book', b.id);
                        setSearchParams(next);
                        setBookQuery('');
                      }}
                    >
                      {b.title}
                    </Button>
                  ))}
                </Stack>
              ) : bookQuery.trim().length >= 2 ? (
                <Text mt="3" fontSize="sm" opacity={0.75}>
                  Ничего не найдено.
                </Text>
              ) : null}
            </Box>

            <Box borderWidth="1px" borderRadius="md" p="4">
              <Heading as="h3" size="sm" fontWeight="700">
                Видимость секций
              </Heading>
              <Text mt="2" fontSize="sm" opacity={0.8}>
                Спрячь то, что не хочешь видеть сейчас.
              </Text>

              <Stack mt="3" gap="2">
                {articleSectionOrder.map((s) => (
                  <Checkbox.Root
                    key={s.id}
                    checked={visibleSections[s.id]}
                    onCheckedChange={() => toggleSection(s.id)}
                  >
                    <Checkbox.Control />
                    <Checkbox.Label>{s.title}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Stack>

              <Flex mt="4" gap="2" wrap="wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAllSections(true)}
                >
                  Показать всё
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAllSections(false)}
                >
                  Скрыть всё
                </Button>
              </Flex>
            </Box>

            <Box borderWidth="1px" borderRadius="md" p="4">
              <Heading as="h3" size="sm" fontWeight="700">
                Подсказки
              </Heading>
              <Text mt="2" fontSize="sm" opacity={0.8}>
                Скоро здесь появятся фильтры по жанрам/типам, а также закрепления разборов к книгам.
              </Text>
            </Box>
          </Stack>
        </Box>
      }
    />
  );
}

function ArticlesSection({
  id,
  title,
  subtitle,
  items,
  selectedBook,
}: {
  id: ArticleSectionId;
  title: string;
  subtitle: string;
  items: Article[];
  selectedBook: Book | null;
}) {
  return (
    <Box id={`articles-section-${id}`} scrollMarginTop="88px">
      <Heading as="h3" size="sm" fontWeight="700">
        {title}
      </Heading>
      <Text mt="2" fontSize="sm" opacity={0.8}>
        {subtitle}
        {selectedBook ? ` · Книга: ${selectedBook.title}` : ''}
      </Text>

      {items.length === 0 ? (
        <Box mt="3" borderWidth="1px" borderRadius="md" p="4">
          <Text fontSize="sm" opacity={0.8}>
            Пока нет материалов в этом разделе.
          </Text>
        </Box>
      ) : (
        <Stack mt="3" gap="3">
          {items.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const author = getUserById(article.authorId);
  const book = getBookById(article.bookId);

  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="2">
        <Box>
          <Flex align="center" justify="space-between" gap="2">
            <AppLink to={`/articles/${article.id}`} fontWeight="700">
              <Heading as="h4" size="sm" fontWeight="700">
                {article.title}
              </Heading>
            </AppLink>
            <Badge variant="subtle">{articleTypeLabel(article.type)}</Badge>
          </Flex>

          <Text mt="1" fontSize="sm" opacity={0.8}>
            {author ? (
              <>
                <AppLink to={`/users/${author.id}`} fontWeight="600">
                  {author.username}
                </AppLink>
                {' · '}
              </>
            ) : null}
            {formatCompactDate(article.createdAt)}
          </Text>
        </Box>

        <Text opacity={0.9}>{article.excerpt}</Text>

        <Flex align="center" gap="2" wrap="wrap">
          {book ? (
            <AppLink to={`/books/${book.id}`} fontSize="sm" fontWeight="600">
              {book.title}
            </AppLink>
          ) : null}

          {article.type === 'shouldRead' && article.shouldRead ? (
            <Badge variant="outline">{readinessLabel(article.shouldRead.readiness)}</Badge>
          ) : null}

          <Badge variant="outline">{article.noSpoilers ? 'Без спойлеров' : 'Со спойлерами'}</Badge>
        </Flex>

        <Text fontSize="sm" opacity={0.75}>
          👍 {article.likes} · 👀 {article.views}
        </Text>
      </Stack>
    </Box>
  );
}
