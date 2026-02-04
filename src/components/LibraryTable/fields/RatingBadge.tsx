import { Badge, Menu, Portal } from '@chakra-ui/react';
import type { LibraryBookRating } from '../types';
import { RATING_LABELS, RATING_COLORS } from '../types';

interface RatingBadgeProps {
  rating?: LibraryBookRating;
  onChange?: (rating: LibraryBookRating) => void;
  readonly?: boolean;
}

const allRatings: LibraryBookRating[] = ['excellent', 'good', 'average', 'belowAverage', 'poor'];

export function RatingBadge({ rating, onChange, readonly }: RatingBadgeProps) {
  if (!rating) {
    if (readonly || !onChange) {
      return <Badge colorPalette="gray" variant="subtle" size="sm">—</Badge>;
    }
    return (
      <Menu.Root>
        <Menu.Trigger asChild>
          <Badge colorPalette="gray" variant="subtle" size="sm" cursor="pointer">
            Выбрать
          </Badge>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content minW="160px">
              {allRatings.map((r) => (
                <Menu.Item
                  key={r}
                  value={r}
                  onClick={() => onChange(r)}
                >
                  <Badge colorPalette={RATING_COLORS[r]} variant="solid" size="sm">
                    {RATING_LABELS[r]}
                  </Badge>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    );
  }

  const colorPalette = RATING_COLORS[rating];
  const label = RATING_LABELS[rating];

  if (readonly || !onChange) {
    return (
      <Badge colorPalette={colorPalette} variant="solid" size="sm" cursor="default">
        {label}
      </Badge>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Badge
          colorPalette={colorPalette}
          variant="solid"
          size="sm"
          cursor="pointer"
        >
          {label}
        </Badge>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="160px">
            {allRatings.map((r) => (
              <Menu.Item
                key={r}
                value={r}
                onClick={() => onChange(r)}
              >
                <Badge colorPalette={RATING_COLORS[r]} variant="solid" size="sm">
                  {RATING_LABELS[r]}
                </Badge>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
