import { useState } from 'react';
import { Box, HStack, Button, Input, IconButton, Menu, Portal, Text, Checkbox } from '@chakra-ui/react';
import type { LibraryTableFilter, LibraryTableSort, SortField, LibraryBookStatus, LibraryBookRating } from '../types';
import { STATUS_LABELS, RATING_LABELS } from '../types';

interface LibraryTableToolbarProps {
  filter: LibraryTableFilter;
  sort: LibraryTableSort;
  onFilterChange: (filter: LibraryTableFilter) => void;
  onSortChange: (sort: LibraryTableSort) => void;
  onAddClick: () => void;
}

const sortFields: { field: SortField; label: string }[] = [
  { field: 'title', label: 'Название' },
  { field: 'author', label: 'Автор' },
  { field: 'readDate', label: 'Дата' },
  { field: 'rating', label: 'Оценка' },
  { field: 'score', label: 'Рейтинг' },
];

const allStatuses: LibraryBookStatus[] = ['planned', 'reading', 'completed', 'onHold', 'dropped'];
const allRatings: LibraryBookRating[] = ['excellent', 'good', 'average', 'belowAverage', 'poor'];

export function LibraryTableToolbar({
  filter,
  sort,
  onFilterChange,
  onSortChange,
  onAddClick,
}: LibraryTableToolbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filter.search ?? '');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFilterChange({ ...filter, search: value });
  };

  const handleStatusToggle = (status: LibraryBookStatus) => {
    const current = filter.status ?? [];
    const newStatuses = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    onFilterChange({ ...filter, status: newStatuses.length > 0 ? newStatuses : undefined });
  };

  const handleRatingToggle = (rating: LibraryBookRating) => {
    const current = filter.rating ?? [];
    const newRatings = current.includes(rating)
      ? current.filter(r => r !== rating)
      : [...current, rating];
    onFilterChange({ ...filter, rating: newRatings.length > 0 ? newRatings : undefined });
  };

  const handleSortFieldChange = (field: SortField) => {
    if (sort.field === field) {
      onSortChange({ field, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      onSortChange({ field, direction: 'asc' });
    }
  };

  return (
    <HStack justify="flex-end" gap={1} mb={3}>
      {/* Filter Menu */}
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button size="sm" variant="ghost">
            <Box as="span" mr={1}>≡</Box>
            Фильтр
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content minW="200px" p={2}>
              <Text fontSize="xs" mb={2} px={2}>Статус</Text>
              {allStatuses.map((status) => (
                <Box
                  key={status}
                  px={2}
                  py={1}
                  cursor="pointer"
                  borderRadius="md"
                  onClick={() => handleStatusToggle(status)}
                >
                  <HStack>
                    <Checkbox.Root
                      checked={(filter.status ?? []).includes(status)}
                      size="sm"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Root>
                    <Text fontSize="sm">{STATUS_LABELS[status]}</Text>
                  </HStack>
                </Box>
              ))}
              <Box h="1px" my={2} />
              <Text fontSize="xs" mb={2} px={2}>Оценка</Text>
              {allRatings.map((rating) => (
                <Box
                  key={rating}
                  px={2}
                  py={1}
                  cursor="pointer"
                  borderRadius="md"
                  onClick={() => handleRatingToggle(rating)}
                >
                  <HStack>
                    <Checkbox.Root
                      checked={(filter.rating ?? []).includes(rating)}
                      size="sm"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Root>
                    <Text fontSize="sm">{RATING_LABELS[rating]}</Text>
                  </HStack>
                </Box>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {/* Sort Menu */}
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button size="sm" variant="ghost">
            <Box as="span" mr={1}>↕</Box>
            Sort
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content minW="160px">
              {sortFields.map(({ field, label }) => (
                <Menu.Item
                  key={field}
                  value={field}
                  onClick={() => handleSortFieldChange(field)}
                >
                  <HStack justify="space-between" w="100%">
                    <Text fontSize="sm">{label}</Text>
                    {sort.field === field && (
                      <Text fontSize="xs">
                        {sort.direction === 'asc' ? '↑' : '↓'}
                      </Text>
                    )}
                  </HStack>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {/* Search */}
      {searchOpen ? (
        <Input
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Поиск..."
          size="sm"
          w="200px"
          autoFocus
          onBlur={() => {
            if (!searchValue) setSearchOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSearchValue('');
              onFilterChange({ ...filter, search: undefined });
              setSearchOpen(false);
            }
          }}
        />
      ) : (
        <IconButton
          aria-label="Поиск"
          size="sm"
          variant="ghost"
          onClick={() => setSearchOpen(true)}
        >
          <Box as="span">🔍</Box>
        </IconButton>
      )}

      {/* Add Button */}
      <Button
        size="sm"
        onClick={onAddClick}
      >
        New
      </Button>
    </HStack>
  );
}
