import { Box, Text, HStack, VStack, Badge, Popover, Portal } from '@chakra-ui/react';
import type { LibraryBookEntry } from '../types';

interface BookPopoverProps {
  book: LibraryBookEntry;
  children: React.ReactNode;
}

export function BookPopover({ book, children }: BookPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content p={4} maxW="320px">
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Body p={0}>
              <VStack align="stretch" gap={3}>
                <Box>
                  <Text fontSize="md" fontWeight="600">
                    {book.title}
                  </Text>
                  <Text fontSize="sm">
                    {book.author}
                  </Text>
                </Box>

                <HStack gap={2} flexWrap="wrap">
                  {book.year && (
                    <Badge variant="subtle" size="sm">
                      {book.year}
                    </Badge>
                  )}
                  {book.pagesCount && (
                    <Badge variant="subtle" size="sm">
                      {book.pagesCount} стр.
                    </Badge>
                  )}
                </HStack>

                {book.genres && book.genres.length > 0 && (
                  <HStack gap={1} flexWrap="wrap">
                    {book.genres.map((genre) => (
                      <Badge key={genre} variant="subtle" size="sm">
                        {genre}
                      </Badge>
                    ))}
                  </HStack>
                )}

                {book.description && (
                  <Text fontSize="sm" lineClamp={3}>
                    {book.description}
                  </Text>
                )}

                {book.score && (
                  <HStack>
                    <Text fontSize="sm">Ваша оценка:</Text>
                    <Text fontSize="sm" fontWeight="600">
                      {book.score}/10
                    </Text>
                  </HStack>
                )}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
