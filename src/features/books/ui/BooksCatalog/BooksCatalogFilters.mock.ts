import type { ComponentProps } from 'react';

import { BooksCatalogFilters } from './BooksCatalogFilters.tsx';

export const booksCatalogFiltersMock: ComponentProps<typeof BooksCatalogFilters> = {
  selectedGenres: ['Философия'],
  onSelectedGenresChange: () => undefined,

  selectedAgeRatings: ['16+'],
  onSelectedAgeRatingsChange: () => undefined,

  selectedSizes: ['medium'],
  onSelectedSizesChange: () => undefined,

  selectedCountries: ['Россия'],
  onSelectedCountriesChange: () => undefined,

  yearFrom: '1800',
  onYearFromChange: () => undefined,
  yearTo: '2000',
  onYearToChange: () => undefined,

  ratingFrom: '8',
  onRatingFromChange: () => undefined,
  ratingTo: '10',
  onRatingToChange: () => undefined,

  canReset: true,
  onReset: () => undefined,
};
