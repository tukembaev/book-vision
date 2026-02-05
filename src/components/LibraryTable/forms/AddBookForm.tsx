import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Dialog,
  Portal,
  CloseButton,
  Field,
} from '@chakra-ui/react';
import { StatusBadge } from '../fields/StatusBadge';
import { RatingBadge } from '../fields/RatingBadge';
import { ScoreSlider } from '../fields/ScoreSlider';
import { searchAuthors } from '../mocks/libraryData.mock';
import type { LibraryBookEntry, LibraryBookStatus, LibraryBookRating, AuthorInfo } from '../types';

interface AddBookFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (book: Omit<LibraryBookEntry, 'id'>) => void;
}

export function AddBookForm({ open, onClose, onSubmit }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorInfo | null>(null);
  const [status, setStatus] = useState<LibraryBookStatus>('planned');
  const [readDate, setReadDate] = useState('');
  const [rating, setRating] = useState<LibraryBookRating | undefined>(undefined);
  const [score, setScore] = useState<number | undefined>(undefined);
  const [showAuthorList, setShowAuthorList] = useState(false);

  const filteredAuthors = useMemo(() => {
    return searchAuthors(authorSearch);
  }, [authorSearch]);

  const handleSubmit = () => {
    if (!title || !selectedAuthor) return;

    onSubmit({
      bookId: `b-${Date.now()}`,
      title,
      author: selectedAuthor.name,
      authorId: selectedAuthor.id,
      status,
      addedDate: new Date().toISOString().slice(0, 10),
      readDate: readDate || undefined,
      rating,
      score,
    });

    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTitle('');
    setAuthorSearch('');
    setSelectedAuthor(null);
    setStatus('planned');
    setReadDate('');
    setRating(undefined);
    setScore(undefined);
  };

  const handleSelectAuthor = (author: AuthorInfo) => {
    setSelectedAuthor(author);
    setAuthorSearch(author.name);
    setShowAuthorList(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.700" />
        <Dialog.Positioner>
          <Dialog.Content maxW="500px" w="90vw">
            <Dialog.Header borderBottomWidth="1px" pb={4}>
              <Dialog.Title>Добавить книгу в библиотеку</Dialog.Title>
              <Dialog.CloseTrigger asChild position="absolute" top={3} right={3}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body py={6}>
              <VStack gap={4} align="stretch">
                <Field.Root>
                  <Field.Label fontSize="sm">Название книги *</Field.Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите название"
                    size="sm"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm">Автор *</Field.Label>
                  <Box position="relative">
                    <Input
                      value={authorSearch}
                      onChange={(e) => {
                        setAuthorSearch(e.target.value);
                        setShowAuthorList(true);
                        if (selectedAuthor && e.target.value !== selectedAuthor.name) {
                          setSelectedAuthor(null);
                        }
                      }}
                      onFocus={() => setShowAuthorList(true)}
                      placeholder="Поиск автора..."
                      size="sm"
                    />
                    {showAuthorList && authorSearch && (
                      <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        right={0}
                        borderWidth="1px"
                        borderRadius="md"
                        maxH="200px"
                        overflowY="auto"
                        zIndex={10}
                        mt={1}
                      >
                        {filteredAuthors.length === 0 ? (
                          <Box p={3}>
                            <Text fontSize="sm">Автор не найден</Text>
                          </Box>
                        ) : (
                          filteredAuthors.slice(0, 10).map((author) => (
                            <Box
                              key={author.id}
                              px={3}
                              py={2}
                              cursor="pointer"
                              onClick={() => handleSelectAuthor(author)}
                            >
                              <Text fontSize="sm">{author.name}</Text>
                              {author.country && (
                                <Text fontSize="xs">{author.country}</Text>
                              )}
                            </Box>
                          ))
                        )}
                      </Box>
                    )}
                  </Box>
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm">Статус</Field.Label>
                  <Box>
                    <StatusBadge status={status} onChange={setStatus} />
                  </Box>
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm">Дата прочтения</Field.Label>
                  <Input
                    value={readDate}
                    onChange={(e) => setReadDate(e.target.value)}
                    placeholder="дд месяц гггг"
                    size="sm"
                  />
                </Field.Root>

                <HStack gap={6}>
                  <Field.Root flex={1}>
                    <Field.Label fontSize="sm">Оценка</Field.Label>
                    <Box>
                      <RatingBadge rating={rating} onChange={setRating} />
                    </Box>
                  </Field.Root>

                  <Field.Root flex={1}>
                    <Field.Label fontSize="sm">Рейтинг (1-10)</Field.Label>
                    <Box>
                      <ScoreSlider score={score} onChange={setScore} />
                    </Box>
                  </Field.Root>
                </HStack>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer borderTopWidth="1px" pt={4}>
              <HStack gap={3}>
                <Button variant="ghost" onClick={onClose}>
                  Отмена
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!title || !selectedAuthor}
                >
                  Добавить
                </Button>
              </HStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
