import { Box, Button, Checkbox, Heading, Input, Stack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface BooksCatalogFiltersProps {
  selectedGenres: string[];
  onSelectedGenresChange: (values: string[]) => void;

  selectedAgeRatings: Array<'6+' | '12+' | '16+' | '18+'>;
  onSelectedAgeRatingsChange: (values: Array<'6+' | '12+' | '16+' | '18+'>) => void;

  selectedSizes: Array<'small' | 'medium' | 'large'>;
  onSelectedSizesChange: (values: Array<'small' | 'medium' | 'large'>) => void;

  selectedCountries: string[];
  onSelectedCountriesChange: (values: string[]) => void;

  yearFrom: string;
  onYearFromChange: (value: string) => void;
  yearTo: string;
  onYearToChange: (value: string) => void;

  ratingFrom: string;
  onRatingFromChange: (value: string) => void;
  ratingTo: string;
  onRatingToChange: (value: string) => void;

  canReset: boolean;
  onReset: () => void;
}

const EDITORIAL_GENRES = [
  'Роман',
  'Драма',
  'Фантастика',
  'Философия',
  'Приключения',
  'Исторический',
  'Психология',
  'Поэзия',
];

const AUTHOR_COUNTRIES = ['Россия', 'Франция', 'Япония', 'США', 'Великобритания', 'Германия', 'Другое'];

const AGE_RATINGS: Array<'6+' | '12+' | '16+' | '18+'> = ['6+', '12+', '16+', '18+'];

const BOOK_SIZES: Array<{ value: 'small' | 'medium' | 'large'; label: string; hint: string }> = [
  { value: 'small', label: 'Маленькая', hint: 'до ~200 стр.' },
  { value: 'medium', label: 'Средняя', hint: '200–450 стр.' },
  { value: 'large', label: 'Большая', hint: '450+ стр.' },
];

export function BooksCatalogFilters({
  selectedGenres,
  onSelectedGenresChange,
  selectedAgeRatings,
  onSelectedAgeRatingsChange,
  selectedSizes,
  onSelectedSizesChange,
  selectedCountries,
  onSelectedCountriesChange,
  yearFrom,
  onYearFromChange,
  yearTo,
  onYearToChange,
  ratingFrom,
  onRatingFromChange,
  ratingTo,
  onRatingToChange,
  canReset,
  onReset,
}: BooksCatalogFiltersProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">
      <Stack gap="5">
        <Box>
          <Heading as="h3" size="sm" fontWeight="700">
            Фильтры
          </Heading>
          <Text mt="1" fontSize="sm" opacity={0.8}>
            Применяются автоматически
          </Text>
        </Box>

        <FilterSection title="Жанры">
          <CheckboxList
            items={EDITORIAL_GENRES}
            selected={selectedGenres}
            onChange={(values) => onSelectedGenresChange(values)}
          />
        </FilterSection>

        <FilterSection title="Возрастной рейтинг">
          <CheckboxList
            items={AGE_RATINGS}
            selected={selectedAgeRatings}
            onChange={(values) => onSelectedAgeRatingsChange(values as Array<'6+' | '12+' | '16+' | '18+'>)}
          />
        </FilterSection>

        <FilterSection title="Объём книги">
          <Stack gap="2">
            {BOOK_SIZES.map((s) => (
              <SizeCheckbox
                key={s.value}
                label={s.label}
                hint={s.hint}
                checked={selectedSizes.includes(s.value)}
                onCheckedChange={(checked) => {
                  const next = checked
                    ? Array.from(new Set([...selectedSizes, s.value]))
                    : selectedSizes.filter((v) => v !== s.value);
                  onSelectedSizesChange(next);
                }}
              />
            ))}
          </Stack>
        </FilterSection>

        <FilterSection title="Страна / регион автора">
          <CheckboxList
            items={AUTHOR_COUNTRIES}
            selected={selectedCountries}
            onChange={(values) => onSelectedCountriesChange(values)}
          />
        </FilterSection>

        <FilterSection title="Год публикации">
          <Stack gap="2">
            <Input
              value={yearFrom}
              onChange={(e) => onYearFromChange(e.currentTarget.value)}
              placeholder="От"
              inputMode="numeric"
            />
            <Input
              value={yearTo}
              onChange={(e) => onYearToChange(e.currentTarget.value)}
              placeholder="До"
              inputMode="numeric"
            />
          </Stack>
        </FilterSection>

        <FilterSection title="Оценка пользователей">
          <Stack gap="2">
            <Input
              value={ratingFrom}
              onChange={(e) => onRatingFromChange(e.currentTarget.value)}
              placeholder="От"
              inputMode="decimal"
            />
            <Input
              value={ratingTo}
              onChange={(e) => onRatingToChange(e.currentTarget.value)}
              placeholder="До"
              inputMode="decimal"
            />
          </Stack>
        </FilterSection>

        <Button size="sm" onClick={onReset} disabled={!canReset}>
          Сбросить
        </Button>
      </Stack>
    </Box>
  );
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <Heading as="h4" size="xs" fontWeight="700">
        {title}
      </Heading>
      <Box mt="2">{children}</Box>
    </Box>
  );
}

function CheckboxList({
  items,
  selected,
  onChange,
}: {
  items: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <Stack gap="2">
      {items.map((item) => {
        const checked = selected.includes(item);
        return (
          <Box key={item}>
            <Checkbox.Root
              checked={checked}
              onCheckedChange={(details: { checked: boolean | string }) => {
                const nextChecked = details.checked === true;
                const next = nextChecked
                  ? Array.from(new Set([...selected, item]))
                  : selected.filter((v) => v !== item);
                onChange(next);
              }}
            >
              <Checkbox.Control />
              <Checkbox.Label>{item}</Checkbox.Label>
            </Checkbox.Root>
          </Box>
        );
      })}
    </Stack>
  );
}

function SizeCheckbox({
  label,
  hint,
  checked,
  onCheckedChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Box>
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(details: { checked: boolean | string }) => onCheckedChange(details.checked === true)}
      >
        <Checkbox.Control />
        <Checkbox.Label>
          <Text as="span" fontWeight="600">
            {label}
          </Text>{' '}
          <Text as="span" fontSize="sm" opacity={0.75}>
            ({hint})
          </Text>
        </Checkbox.Label>
      </Checkbox.Root>
    </Box>
  );
}
