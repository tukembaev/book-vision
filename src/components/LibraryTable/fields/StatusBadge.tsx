import { Badge, Menu, Portal } from '@chakra-ui/react';
import type { LibraryBookStatus } from '../types';
import { STATUS_LABELS, STATUS_COLORS } from '../types';

interface StatusBadgeProps {
  status: LibraryBookStatus;
  onChange?: (status: LibraryBookStatus) => void;
  readonly?: boolean;
}

const allStatuses: LibraryBookStatus[] = ['planned', 'reading', 'completed', 'onHold', 'dropped'];

export function StatusBadge({ status, onChange, readonly }: StatusBadgeProps) {
  const colorPalette = STATUS_COLORS[status];
  const label = STATUS_LABELS[status];

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
            {allStatuses.map((s) => (
              <Menu.Item
                key={s}
                value={s}
                onClick={() => onChange(s)}
              >
                <Badge colorPalette={STATUS_COLORS[s]} variant="solid" size="sm">
                  {STATUS_LABELS[s]}
                </Badge>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
