import { useState, useMemo } from 'react';
import { Box, Text, Input, VStack, Popover, Portal } from '@chakra-ui/react';
import { searchAuthors } from '../mocks/libraryData.mock';
import type { AuthorInfo } from '../types';

interface AuthorFieldProps {
  author: string;
  authorId: string;
  onChange?: (authorId: string, authorName: string) => void;
  onHover?: () => void;
  readonly?: boolean;
}

export function AuthorField({ author, onChange, readonly }: AuthorFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuthors = useMemo(() => {
    return searchAuthors(searchQuery);
  }, [searchQuery]);

  if (readonly || !onChange) {
    return (
      <Text fontSize="sm" cursor="default">
        {author}
      </Text>
    );
  }

  const handleSelect = (selectedAuthor: AuthorInfo) => {
    onChange(selectedAuthor.id, selectedAuthor.name);
    setIsOpen(false);
    setSearchQuery('');
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
            {author}
          </Text>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content p={0} minW="250px" maxH="300px">
            <Popover.Body p={0}>
              <Box p={2} borderBottomWidth="1px">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск автора..."
                  size="sm"
                  autoFocus
                />
              </Box>
              <VStack gap={0} maxH="200px" overflowY="auto" align="stretch">
                {filteredAuthors.length === 0 ? (
                  <Box p={3}>
                    <Text fontSize="sm">Автор не найден</Text>
                  </Box>
                ) : (
                  filteredAuthors.map((a) => (
                    <Box
                      key={a.id}
                      px={3}
                      py={2}
                      cursor="pointer"
                      onClick={() => handleSelect(a)}
                    >
                      <Text fontSize="sm">{a.name}</Text>
                      {a.country && (
                        <Text fontSize="xs">{a.country}</Text>
                      )}
                    </Box>
                  ))
                )}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
