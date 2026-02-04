import { useState } from 'react';
import { Box, Text, Input, Popover, Portal } from '@chakra-ui/react';

interface DateFieldProps {
  date?: string;
  onChange?: (date: string) => void;
  readonly?: boolean;
}

export function DateField({ date, onChange, readonly }: DateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(date ?? '');

  const displayDate = date || '—';

  if (readonly || !onChange) {
    return (
      <Text fontSize="sm">
        {displayDate}
      </Text>
    );
  }

  const handleSave = () => {
    if (inputValue !== date) {
      onChange(inputValue);
    }
    setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Popover.Trigger asChild>
        <Box
          px={2}
          py={1}
          borderRadius="md"
          cursor="pointer"
          display="inline-block"
        >
          <Text fontSize="sm">
            {displayDate}
          </Text>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content p={3}>
            <Popover.Body p={0}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="дд месяц гггг"
                size="sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') setIsOpen(false);
                }}
                onBlur={handleSave}
                autoFocus
              />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
