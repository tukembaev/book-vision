import { Box, Text, HStack, VStack, Badge, Popover, Portal } from '@chakra-ui/react';
import { getAuthorById } from '../mocks/libraryData.mock';

interface AuthorPopoverProps {
  authorId: string;
  authorName: string;
  children: React.ReactNode;
}

export function AuthorPopover({ authorId, authorName, children }: AuthorPopoverProps) {
  const author = getAuthorById(authorId);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content p={4} maxW="300px">
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Body p={0}>
              <VStack align="stretch" gap={3}>
                <Box>
                  <Text fontSize="md" fontWeight="600">
                    {author?.name || authorName}
                  </Text>
                  {author?.country && (
                    <Text fontSize="sm">
                      {author.country}
                    </Text>
                  )}
                </Box>

                {author && (
                  <HStack gap={2} flexWrap="wrap">
                    {author.birthYear && (
                      <Badge variant="subtle" size="sm">
                        {author.birthYear}
                        {author.deathYear ? ` — ${author.deathYear}` : ''}
                      </Badge>
                    )}
                    {author.booksCount && (
                      <Badge variant="subtle" size="sm">
                        {author.booksCount} книг
                      </Badge>
                    )}
                  </HStack>
                )}

                {author?.bio && (
                  <Text fontSize="sm" lineClamp={3}>
                    {author.bio}
                  </Text>
                )}

                {!author && (
                  <Text fontSize="sm">
                    Информация об авторе недоступна
                  </Text>
                )}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
