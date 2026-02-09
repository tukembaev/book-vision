import { Box, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { ArticleCard } from '@/components/ArticleCard';

import {
  getArticleCards,
  getFeaturedArticle,
  getWeeklyBest,
  getTopAuthors,
  getPopularBooks,
} from '../features/articles/mocks/articlesPageMock';

import {
  ArticleTypeTabs,
  type ArticleFilter,
} from '../features/articles/ui/ArticleTypeTabs/ArticleTypeTabs';
import { FeaturedArticleHero } from '../features/articles/ui/FeaturedArticleHero/FeaturedArticleHero';
import { WeeklyBestSection } from '../features/articles/ui/WeeklyBestSection/WeeklyBestSection';
import { TopAuthorsWidget } from '../features/articles/ui/TopAuthorsWidget/TopAuthorsWidget';
import { PopularBooksWidget } from '../features/articles/ui/PopularBooksWidget/PopularBooksWidget';

export default function ArticlesPage() {
  const [filter, setFilter] = useState<ArticleFilter>('all');

  const articles = useMemo(
    () => getArticleCards(filter === 'all' ? undefined : filter),
    [filter],
  );

  const featured = useMemo(() => getFeaturedArticle(), []);
  const weeklyBest = useMemo(() => getWeeklyBest(), []);
  const topAuthors = useMemo(() => getTopAuthors(), []);
  const popularBooks = useMemo(() => getPopularBooks(), []);

  return (
    <Box maxW="1200px" mx="auto" px="4" py="6">
      <Stack gap="8">
        {/* Page header */}
        <Box>
          <Heading as="h2" fontSize="2xl" fontWeight="800">
            Статьи
          </Heading>
          <Text mt="1" fontSize="sm" color="gray.500">
            Разборы, рецензии, подборки и честные ответы «стоит ли читать?»
          </Text>
        </Box>

        {/* Featured article — full-width hero */}
        <FeaturedArticleHero article={featured} />

        {/* Weekly best — horizontal row */}
        <WeeklyBestSection articles={weeklyBest} />

        {/* Divider before browsing */}
        <Box borderTopWidth="1px" borderColor="gray.200" />

        {/* Filter tabs */}
        <ArticleTypeTabs value={filter} onChange={setFilter} />

        {/* Main content: articles grid + sidebar */}
        <Flex gap="6" direction={{ base: 'column', lg: 'row' }} align="flex-start">
          {/* Left — Article cards */}
          <Box flex="3" minW="0">
            {articles.length === 0 ? (
              <Box borderWidth="1px" borderRadius="lg" p="6" textAlign="center">
                <Text color="gray.500">Нет статей в этой категории.</Text>
              </Box>
            ) : (
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap="4"
              >
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </Grid>
            )}
          </Box>

          {/* Right — Sidebar widgets */}
          <Box
            flex="1.2"
            minW="280px"
            position={{ lg: 'sticky' }}
            top={{ lg: '80px' }}
          >
            <Stack gap="4">
              <TopAuthorsWidget authors={topAuthors} />
              <PopularBooksWidget books={popularBooks} />
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
