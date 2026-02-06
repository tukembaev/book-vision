import { Box, Flex, Grid, Heading, Stack } from '@chakra-ui/react';

import { BooksCarousel } from '@/components/home/BooksCarousel/BooksCarousel';
import { CurrentlyReadingSection } from '@/components/home/CurrentlyReadingSection/CurrentlyReadingSection';
import { ReviewCard } from '@/components/ReviewCard';
import { ArticleCard } from '@/components/ArticleCard';
import { CollectionCard } from '@/components/CollectionCard';

import {
  mockCarouselBooks,
  mockNewReleases,
  mockGainingPopularity,
  mockPopular,
  mockArticleCards,
  mockHomeReviews,
  mockCollections,
} from './HomePage.mock';

export default function HomePage() {
  return (
    <Box maxW="1200px" mx="auto" px="4" py="6">
      <Stack gap="6">
        {/* 1 — Carousel */}
        <BooksCarousel books={mockCarouselBooks} />

        {/* 2 — Currently Reading */}
        <CurrentlyReadingSection
          newReleases={mockNewReleases}
          gainingPopularity={mockGainingPopularity}
          popular={mockPopular}
        />

        {/* 3 — Articles (left) + Reviews & Collections (right) */}
        <Flex gap="6" direction={{ base: 'column', lg: 'row' }} align="flex-start">
          {/* Left — Articles */}
          <Box flex="3" minW="0">
            <Heading as="h3" fontSize="lg" fontWeight="700" mb="4">
              Статьи
            </Heading>
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
              gap="4"
            >
              {mockArticleCards.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </Grid>
          </Box>

          {/* Right — Reviews + Collections */}
          <Box flex="2" minW="0">
            {/* Reviews */}
            <Heading as="h3" fontSize="lg" fontWeight="700" mb="4">
              Последние отзывы
            </Heading>
            <Stack gap="3" mb="6">
              {mockHomeReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Stack>

            {/* Collections */}
            <Heading as="h3" fontSize="lg" fontWeight="700" mb="4">
              Коллекции
            </Heading>
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(1, 1fr)' }}
              gap="4"
            >
              {mockCollections.map((col) => (
                <CollectionCard key={col.id} collection={col} />
              ))}
            </Grid>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
