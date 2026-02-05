import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { AppLink } from '@/components/navigation/AppLink/AppLink';

import { mockBooksDb } from '@/features/books/mocks/booksDb.mock';
import { mockUsersDb } from '@/features/users/mocks/usersDb.mock';
import { CommentThread } from '@/features/comments/ui/CommentThread/CommentThread';
import { mockCommentThreads } from '@/features/comments/mocks/commentsThread.mock';

import {
  getMockArticleById,
  getMockArticles,
  getMockArticlesByBookId,
} from '../mocks/articlesDb.mock';
import { useArticlesPreferencesStore, articleSectionOrder } from '../model/articlesPreferences.store';
import type { Article, ArticleContentBlock, ArticleReadiness, ArticleType, Book, User } from '@/types/core';

import { slugifyHeading, useScrollSpy } from '../lib/scrollSpy';

type AuthorPeriod = 'week' | 'month';

const NOW = Date.now();

type TocItem = { id: string; text: string; level: 2 | 3 };

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

function formatDateLong(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: '2-digit' });
  } catch {
    return iso;
  }
}

function computeReadingMinutes(blocks: ArticleContentBlock[] | undefined) {
  if (!blocks || blocks.length === 0) return 4;
  const text = blocks.map((b) => ('text' in b ? b.text : '')).join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 180));
}

export default function ArticlePage() {
  const { articleId } = useParams();
  const [searchParams] = useSearchParams();

  const [bookQuery, setBookQuery] = useState('');
  const [selectedBookIdOverride, setSelectedBookIdOverride] = useState<string | null>(null);
  const [subscribedAuthorIds, setSubscribedAuthorIds] = useState<Record<string, boolean>>({});
  const [authorPeriod, setAuthorPeriod] = useState<AuthorPeriod>('week');

  const visibleSections = useArticlesPreferencesStore((s) => s.visibleSections);
  const toggleSection = useArticlesPreferencesStore((s) => s.toggleSection);

  const article = useMemo(() => {
    if (!articleId) return null;
    return getMockArticleById(articleId) ?? null;
  }, [articleId]);

  const selectedBook = useMemo(() => {
    const fromUrl = searchParams.get('book');
    const bookId = selectedBookIdOverride ?? fromUrl ?? article?.bookId ?? null;
    if (!bookId) return null;
    return getBookById(bookId) ?? null;
  }, [article?.bookId, searchParams, selectedBookIdOverride]);

  const bookSearchResults = useMemo(() => {
    const q = bookQuery.trim().toLowerCase();
    if (q.length < 2) return [] as Book[];

    return mockBooksDb
      .filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
      .slice(0, 6);
  }, [bookQuery]);

  const contentBlocks = useMemo((): ArticleContentBlock[] => {
    if (!article) return [] as ArticleContentBlock[];
    return article.content && article.content.length > 0 ? article.content : buildFallbackContent(article);
  }, [article]);

  const toc: TocItem[] = useMemo(() => {
    if (!article) return [] as TocItem[];
    const headings: TocItem[] = contentBlocks
      .filter((b): b is Extract<ArticleContentBlock, { type: 'h2' | 'h3' }> =>
        b.type === 'h2' || b.type === 'h3'
      )
      .map((h) => {
        const id = h.id?.trim() ? h.id : slugifyHeading(h.text);
        return {
          id: `article-${article.id}-${id}`,
          text: h.text,
          level: h.type === 'h2' ? (2 as const) : (3 as const),
        };
      });

    const seen = new Set<string>();
    return headings
      .map((h) => {
        let nextId = h.id;
        let i = 2;
        while (seen.has(nextId)) {
          nextId = `${h.id}-${i}`;
          i += 1;
        }
        seen.add(nextId);
        return { ...h, id: nextId };
      })
      .slice(0, 40);
  }, [article, contentBlocks]);

  const author = useMemo(() => {
    if (!article) return undefined;
    return getUserById(article.authorId);
  }, [article]);

  const bookFromArticle = useMemo(() => {
    if (!article) return undefined;
    return getBookById(article.bookId);
  }, [article]);

  const showToc = toc.length >= 4;
  const activeTocId = useScrollSpy(
    toc.map((t) => t.id),
    showToc ? { rootMargin: '0px 0px -70% 0px' } : undefined
  );

  const readingMinutes = article?.readingMinutes ?? computeReadingMinutes(contentBlocks);

  const allByBook = useMemo(() => {
    return selectedBook ? getMockArticlesByBookId(selectedBook.id) : [];
  }, [selectedBook]);

  const otherByBook = useMemo(() => {
    if (!selectedBook || !article) return [] as Article[];

    return allByBook
      .filter((a) => a.id !== article.id)
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5);
  }, [allByBook, article, selectedBook]);

  const byBookShouldRead = useMemo(() => {
    return allByBook
      .filter((a) => a.type === 'shouldRead')
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);
  }, [allByBook]);

  const byBookAnalysis = useMemo(() => {
    return allByBook
      .filter((a) => a.type === 'analysis')
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);
  }, [allByBook]);

  const activeAuthors = useMemo(() => {
    const ms = authorPeriod === 'week' ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;

    const stats = new Map<string, { score: number; articles: number }>();

    for (const a of getMockArticles()) {
      const dt = new Date(a.createdAt).getTime();
      if (!Number.isFinite(dt)) continue;
      if (NOW - dt > ms) continue;

      const prev = stats.get(a.authorId) ?? { score: 0, articles: 0 };
      stats.set(a.authorId, {
        score: prev.score + a.likes * 2 + Math.round(a.views / 100),
        articles: prev.articles + 1,
      });
    }

    const rows = [...stats.entries()]
      .map(([authorId, v]) => ({ authorId, ...v }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((r) => ({ user: getUserById(r.authorId), score: r.score, articles: r.articles }))
      .filter((r): r is { user: User; score: number; articles: number } => Boolean(r.user));

    return rows;
  }, [authorPeriod]);

  const isSubscribedToAuthor = author ? Boolean(subscribedAuthorIds[author.id]) : false;

  if (!articleId) {
    return null;
  }

  if (!article) {
    return (
      <Box>
        <Heading as="h2" size="md" fontWeight="600">
          Статья не найдена
        </Heading>
        <Text mt="2" opacity={0.8}>
          Нет статьи с id: {articleId}
        </Text>
      </Box>
    );
  }

  return (
    <ThreeColumnLayout
      left={
        showToc ? (
          <Box position={{ base: 'static', lg: 'sticky' }} top={{ lg: '6' }}>
            <Box borderWidth="1px" borderRadius="md" p="4">
              <Heading as="h3" size="sm" fontWeight="700">
                Навигация
              </Heading>
              <Text mt="2" fontSize="sm" opacity={0.8}>
                По разделам статьи.
              </Text>

              <Stack mt="4" gap="2">
                {toc.map((t) => (
                  <Button
                    key={t.id}
                    variant="ghost"
                    size="xs"
                 
                    justifyContent="flex-start"
                    onClick={() => {
                      const el = document.getElementById(t.id);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    opacity={activeTocId === t.id ? 1 : 0.8}
                    fontWeight={activeTocId === t.id ? '700' : '600'}
                    pl={t.level === 3 ? '3' : '1'}
                  >
                    {t.text}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Box>
        ) : (
          <Box />
        )
      }
      center={
        <Stack gap="6">
          <Box>
            <Flex align="center" gap="2" wrap="wrap">
              <Badge variant="subtle">{articleTypeLabel(article.type)}</Badge>
              {bookFromArticle ? (
                <AppLink to={`/books/${bookFromArticle.id}`} fontWeight="600" fontSize="sm" opacity={0.9}>
                  {bookFromArticle.title}
                </AppLink>
              ) : null}
              {article.type === 'shouldRead' && article.shouldRead ? (
                <Badge variant="outline">{readinessLabel(article.shouldRead.readiness)}</Badge>
              ) : null}
              <Badge variant="outline">{article.noSpoilers ? 'Без спойлеров' : 'Со спойлерами'}</Badge>
            </Flex>

            <Heading as="h2" size="lg" fontWeight="700" mt="3" lineHeight={1.2}>
              {article.title}
            </Heading>

            <Text mt="3" opacity={0.85}>
              {author ? (
                <>
                  <AppLink to={`/users/${author.id}`} fontWeight="700">
                    {author.username}
                  </AppLink>
                  {' · '}
                </>
              ) : null}
              {formatDateLong(article.createdAt)} · ~{readingMinutes} мин чтения
            </Text>
          </Box>

          <Box borderTopWidth="1px" />

          <Box maxW={{ base: '100%', lg: '760px' }}>
            <ArticleContent blocks={contentBlocks} toc={toc} />
          </Box>

          <HStack gap="2" wrap="wrap">
            <Button size="sm" variant="ghost">
              👍 Полезно
            </Button>
            <Button size="sm" variant="ghost">
              🔖 В закладки
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const el = document.getElementById('article-comments');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              💬 Обсудить
            </Button>
          </HStack>

          <Box borderTopWidth="1px" />

          <Box id="article-comments" scrollMarginTop="88px">
            <Heading as="h3" size="sm" fontWeight="700">
              Комментарии
            </Heading>
            <Text mt="2" fontSize="sm" opacity={0.8}>
              Обсуждение статьи читателями.
            </Text>

            <Box mt="3">
              {mockCommentThreads.slice(0, 3).map((comment) => (
                <CommentThread key={comment.id} comment={comment} />
              ))}
            </Box>
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
                Быстрый вход: выбери книгу и смотри связанные статьи.
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

                  <Flex mt="2" gap="2" wrap="wrap">
                    <Button size="xs" variant="outline" onClick={() => setSelectedBookIdOverride(selectedBook.id)}>
                      Выбрать
                    </Button>
                    <Button size="xs" variant="outline" onClick={() => setSelectedBookIdOverride(null)}>
                      Сбросить
                    </Button>
                    <AppLink to={`/articles?book=${selectedBook.id}`} fontSize="xs" fontWeight="600" opacity={0.9}>
                      Все статьи по книге
                    </AppLink>
                  </Flex>
                </Box>
              ) : null}

              {bookSearchResults.length > 0 ? (
                <Stack mt="3" gap="2">
                  {bookSearchResults.map((b) => (
                    <Button
                      key={b.id}
                      size="sm"
                      variant="outline"
                      justifyContent="flex-start"
                      onClick={() => {
                        setSelectedBookIdOverride(b.id);
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
                Контекст по книге
              </Heading>
              <Text mt="2" fontSize="sm" opacity={0.8}>
                Продолжить чтение вокруг этой же книги.
              </Text>

              {selectedBook ? (
                <Stack mt="3" gap="4">
                  <SidebarArticleList title="Другие статьи" items={otherByBook} />
                  <SidebarArticleList title="Стоит ли читать?" items={byBookShouldRead} />
                  <SidebarArticleList title="Разборы" items={byBookAnalysis} />
                </Stack>
              ) : (
                <Text mt="3" fontSize="sm" opacity={0.75}>
                  Выбери книгу, чтобы увидеть связанные материалы.
                </Text>
              )}
            </Box>

            <Box borderWidth="1px" borderRadius="md" p="4">
              <Heading as="h3" size="sm" fontWeight="700">
                Статус статьи
              </Heading>

              <Stack mt="3" gap="2">
                <Text fontSize="sm" opacity={0.85}>
                  👍 {article.likes} · 👀 {article.views}
                </Text>

                {article.status?.verified ? (
                  <Badge variant="subtle">Verified by {article.status.verificationType ?? 'Community'}</Badge>
                ) : (
                  <Badge variant="outline">Не проверено</Badge>
                )}
              </Stack>
            </Box>

            <Box borderWidth="1px" borderRadius="md" p="4">
              <Heading as="h3" size="sm" fontWeight="700">
                Автор
              </Heading>

              {author ? (
                <Box mt="3">
                  <AppLink to={`/users/${author.id}`} fontWeight="700">
                    {author.username}
                  </AppLink>
                  <Text mt="1" fontSize="sm" opacity={0.8}>
                    Лайков: {author.stats.likesReceived} · Прочитано: {author.stats.booksRead}
                  </Text>

                  <Button
                    mt="3"
                    size="sm"
                    variant={isSubscribedToAuthor ? 'outline' : 'solid'}
                    onClick={() =>
                      setSubscribedAuthorIds((prev) => ({
                        ...prev,
                        [author.id]: !prev[author.id],
                      }))
                    }
                  >
                    {isSubscribedToAuthor ? 'Подписан' : 'Подписаться'}
                  </Button>
                </Box>
              ) : (
                <Text mt="3" fontSize="sm" opacity={0.75}>
                  Автор не найден.
                </Text>
              )}
            </Box>

            <Box borderWidth="1px" borderRadius="md" p="4">
              <Heading as="h3" size="sm" fontWeight="700">
                Показывать в ленте
              </Heading>
              <Text mt="2" fontSize="sm" opacity={0.8}>
                Влияет на страницу “Статьи сообщества”.
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
            </Box>
          </Stack>
        </Box>
      }
    />
  );
}

function SidebarArticleList({ title, items }: { title: string; items: Article[] }) {
  return (
    <Box>
      <Heading as="h4" size="xs" fontWeight="700">
        {title}
      </Heading>

      {items.length === 0 ? (
        <Text mt="2" fontSize="sm" opacity={0.75}>
          Нет материалов.
        </Text>
      ) : (
        <Stack mt="2" gap="2">
          {items.map((a) => (
            <Box key={a.id} borderWidth="1px" borderRadius="md" p="2">
              <AppLink to={`/articles/${a.id}`} fontWeight="700" fontSize="sm">
                {a.title}
              </AppLink>
              <Text mt="1" fontSize="xs" opacity={0.75}>
                👍 {a.likes} · 👀 {a.views}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

function ArticleContent({ blocks, toc }: { blocks: ArticleContentBlock[]; toc: TocItem[] }) {
  return (
    <Stack gap="4" lineHeight={1.8} fontSize={{ base: 'md', lg: 'lg' }}>
      {blocks.map((b, idx) => {
        if (b.type === 'h2' || b.type === 'h3') {
          const headingIndex = blocks
            .slice(0, idx)
            .filter((x): x is Extract<ArticleContentBlock, { type: 'h2' | 'h3' }> => x.type === 'h2' || x.type === 'h3')
            .length;
          const tocItem = toc[headingIndex];
          const headingId = tocItem?.id ?? `article-heading-${idx}`;

          return (
            <Heading
              key={`${b.type}-${idx}`}
              as={b.type}
              size={b.type === 'h2' ? 'md' : 'sm'}
              fontWeight="700"
              id={headingId}
              scrollMarginTop="88px"
            >
              {b.text}
            </Heading>
          );
        }

        if (b.type === 'quote') {
          return (
            <Box key={`q-${idx}`} borderLeftWidth="3px" pl="4" py="2" opacity={0.95}>
              <Text fontStyle="italic">{b.text}</Text>
            </Box>
          );
        }

        return (
          <Text key={`p-${idx}`} opacity={0.95}>
            {b.text}
          </Text>
        );
      })}
    </Stack>
  );
}

function CommentRow({ author, text }: { author: string; text: string }) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Text fontWeight="700" fontSize="sm">
        {author}
      </Text>
      <Text mt="2" opacity={0.9}>
        {text}
      </Text>
      <HStack mt="2" gap="2">
        <Button size="xs" variant="ghost">
          Полезно
        </Button>
      </HStack>
    </Box>
  );
}

function buildFallbackContent(article: Article): ArticleContentBlock[] {
  const type = articleTypeLabel(article.type);

  return [
    { type: 'p', text: article.excerpt },
    { type: 'h2', text: `О чём этот ${type.toLowerCase()}` },
    { type: 'p', text: 'Это mock-контент. Здесь будет полноценный текст статьи со структурой и ссылками.' },
    { type: 'h2', text: 'Ключевые мысли' },
    { type: 'p', text: '1) Книга — центр всего. 2) Текст читается как документ. 3) Вокруг есть пути продолжения.' },
    { type: 'h2', text: 'Вопросы для обсуждения' },
    { type: 'p', text: 'Что в этой книге для тебя самое важное: идея, сюжет, язык или персонажи?' },
  ];
}
