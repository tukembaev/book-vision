import { Box, Button, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { mockBooksDb } from '../mocks/booksDb.mock';
import { BooksCatalogFilters } from '../ui/BooksCatalog/BooksCatalogFilters.tsx';
import { BooksCatalogHeader } from '../ui/BooksCatalog/BooksCatalogHeader.tsx';
import { BooksCatalogList } from '../ui/BooksCatalog/BooksCatalogList.tsx';

type AgeRating = '6+' | '12+' | '16+' | '18+';
type BookSize = 'small' | 'medium' | 'large';

function parseCsvParam(searchParams: URLSearchParams, key: string) {
  const raw = searchParams.get(key);
  if (!raw) return [];
  return raw
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function setCsvParam(next: URLSearchParams, key: string, values: string[]) {
  if (values.length === 0) {
    next.delete(key);
    return;
  }

  next.set(key, values.join(','));
}

function setStringParam(next: URLSearchParams, key: string, value: string) {
  const v = value.trim();
  if (v.length === 0) {
    next.delete(key);
    return;
  }

  next.set(key, v);
}

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const selectedGenres = parseCsvParam(searchParams, 'genres');
  const selectedAgeRatings = parseCsvParam(searchParams, 'age') as AgeRating[];
  const selectedSizes = parseCsvParam(searchParams, 'size') as BookSize[];
  const selectedCountries = parseCsvParam(searchParams, 'country');
  const yearFrom = searchParams.get('yearFrom') ?? '';
  const yearTo = searchParams.get('yearTo') ?? '';
  const ratingFrom = searchParams.get('ratingFrom') ?? '';
  const ratingTo = searchParams.get('ratingTo') ?? '';

  const canReset =
    query.trim().length > 0 ||
    selectedGenres.length > 0 ||
    selectedAgeRatings.length > 0 ||
    selectedSizes.length > 0 ||
    selectedCountries.length > 0 ||
    yearFrom.trim().length > 0 ||
    yearTo.trim().length > 0 ||
    ratingFrom.trim().length > 0 ||
    ratingTo.trim().length > 0;

  const books = useMemo(() => {
    const q = query.trim().toLowerCase();

    const yearFromNumberRaw = yearFrom.trim().length > 0 ? Number(yearFrom) : null;
    const yearToNumberRaw = yearTo.trim().length > 0 ? Number(yearTo) : null;
    const ratingFromNumberRaw = ratingFrom.trim().length > 0 ? Number(ratingFrom) : null;
    const ratingToNumberRaw = ratingTo.trim().length > 0 ? Number(ratingTo) : null;

    const yearFromNumber = Number.isFinite(yearFromNumberRaw) ? yearFromNumberRaw : null;
    const yearToNumber = Number.isFinite(yearToNumberRaw) ? yearToNumberRaw : null;
    const ratingFromNumber = Number.isFinite(ratingFromNumberRaw) ? ratingFromNumberRaw : null;
    const ratingToNumber = Number.isFinite(ratingToNumberRaw) ? ratingToNumberRaw : null;

    return mockBooksDb
      .filter((b) => {
        const matchesQuery =
          q.length === 0 ||
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q);

        const bookGenres = b.genres ?? [];
        const matchesGenres =
          selectedGenres.length === 0 || selectedGenres.some((g) => bookGenres.includes(g));

        const matchesAge =
          selectedAgeRatings.length === 0 ||
          (b.ageRating ? selectedAgeRatings.includes(b.ageRating) : false);

        const matchesCountry =
          selectedCountries.length === 0 ||
          (b.authorCountry ? selectedCountries.includes(b.authorCountry) : false);

        const matchesYear =
          (!yearFromNumber && !yearToNumber) ||
          (typeof b.year === 'number' &&
            (yearFromNumber ? b.year >= yearFromNumber : true) &&
            (yearToNumber ? b.year <= yearToNumber : true));

        const matchesRating =
          (!ratingFromNumber && !ratingToNumber) ||
          ((ratingFromNumber ? b.ratings.average >= ratingFromNumber : true) &&
            (ratingToNumber ? b.ratings.average <= ratingToNumber : true));

        const pages = b.pagesCount;
        const matchesSize =
          selectedSizes.length === 0 ||
          selectedSizes.some((s) => {
            if (s === 'small') return pages <= 200;
            if (s === 'medium') return pages >= 200 && pages <= 450;
            return pages > 450;
          });

        return (
          matchesQuery &&
          matchesGenres &&
          matchesAge &&
          matchesCountry &&
          matchesYear &&
          matchesRating &&
          matchesSize
        );
      })
      .slice()
      .sort((a, b) => b.ratings.average - a.ratings.average);
  }, [query, ratingFrom, ratingTo, selectedAgeRatings, selectedCountries, selectedGenres, selectedSizes, yearFrom, yearTo]);

  const handleQueryChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    setStringParam(next, 'q', value);
    setSearchParams(next);
  };

  const handleSelectedGenresChange = (values: string[]) => {
    const next = new URLSearchParams(searchParams);
    setCsvParam(next, 'genres', values);
    setSearchParams(next);
  };

  const handleSelectedAgeRatingsChange = (values: AgeRating[]) => {
    const next = new URLSearchParams(searchParams);
    setCsvParam(next, 'age', values);
    setSearchParams(next);
  };

  const handleSelectedSizesChange = (values: BookSize[]) => {
    const next = new URLSearchParams(searchParams);
    setCsvParam(next, 'size', values);
    setSearchParams(next);
  };

  const handleSelectedCountriesChange = (values: string[]) => {
    const next = new URLSearchParams(searchParams);
    setCsvParam(next, 'country', values);
    setSearchParams(next);
  };

  const handleYearFromChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    setStringParam(next, 'yearFrom', value);
    setSearchParams(next);
  };

  const handleYearToChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    setStringParam(next, 'yearTo', value);
    setSearchParams(next);
  };

  const handleRatingFromChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    setStringParam(next, 'ratingFrom', value);
    setSearchParams(next);
  };

  const handleRatingToChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    setStringParam(next, 'ratingTo', value);
    setSearchParams(next);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <Stack gap="6">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Каталог книг
        </Heading>
        <Text mt="2" opacity={0.8}>
          Быстрый обзор + умный отбор (mock).
        </Text>
      </Box>

      <Grid gap="6" alignItems="start" templateColumns={{ base: '1fr', lg: '1fr 320px' }}>
        <Stack gap="4">
          <BooksCatalogHeader query={query} onQueryChange={handleQueryChange} />

          {books.length === 0 ? (
            <Box borderWidth="1px" borderRadius="md" p="4">
              <Text opacity={0.9} fontWeight="600">
                Ничего не найдено
              </Text>
              <Text mt="2" opacity={0.8}>
                Попробуй изменить фильтры или сбросить их.
              </Text>
              {canReset ? (
                <Button mt="3" size="sm" onClick={handleReset}>
                  Сбросить фильтры
                </Button>
              ) : null}
            </Box>
          ) : (
            <BooksCatalogList books={books} />
          )}
        </Stack>

        <Box position={{ base: 'static', lg: 'sticky' }} top={{ lg: '6' }} maxH={{ lg: 'calc(100vh - 24px)' }}>
          <Box overflowY={{ lg: 'auto' }} maxH={{ lg: 'calc(100vh - 24px)' }}>
            <BooksCatalogFilters
              selectedGenres={selectedGenres}
              onSelectedGenresChange={handleSelectedGenresChange}
              selectedAgeRatings={selectedAgeRatings}
              onSelectedAgeRatingsChange={handleSelectedAgeRatingsChange}
              selectedSizes={selectedSizes}
              onSelectedSizesChange={handleSelectedSizesChange}
              selectedCountries={selectedCountries}
              onSelectedCountriesChange={handleSelectedCountriesChange}
              yearFrom={yearFrom}
              onYearFromChange={handleYearFromChange}
              yearTo={yearTo}
              onYearToChange={handleYearToChange}
              ratingFrom={ratingFrom}
              onRatingFromChange={handleRatingFromChange}
              ratingTo={ratingTo}
              onRatingToChange={handleRatingToChange}
              canReset={canReset}
              onReset={handleReset}
            />
          </Box>
        </Box>
      </Grid>
    </Stack>
  );
}
