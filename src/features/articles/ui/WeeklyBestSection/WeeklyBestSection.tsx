import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import type { ArticleCardData } from '@/components/ArticleCard';
import { WeeklyBestCard } from '../WeeklyBestCard/WeeklyBestCard';

export interface WeeklyBestSectionProps {
  articles: ArticleCardData[];
}

export function WeeklyBestSection({ articles }: WeeklyBestSectionProps) {
  if (articles.length === 0) return null;

  return (
    <Box>
      <Heading as="h3" fontSize="lg" fontWeight="700" mb="1">
        🔥 Лучшее недели
      </Heading>
      <Text fontSize="sm" color="gray.500" mb="4">
        Самые популярные статьи за последние 7 дней
      </Text>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap="3"
      >
        {articles.map((article, i) => (
          <WeeklyBestCard key={article.id} article={article} rank={i + 1} />
        ))}
      </Grid>
    </Box>
  );
}
