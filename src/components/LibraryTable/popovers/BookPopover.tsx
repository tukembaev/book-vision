import { Box, Text, HStack, VStack, Badge, Popover, Portal, Flex, Separator } from '@chakra-ui/react';
import { BookOpenIcon, CalendarIcon, FileTextIcon, StarIcon } from 'lucide-react';
import type { LibraryBookEntry } from '../types';
import { STATUS_LABELS, STATUS_COLORS, RATING_LABELS, RATING_COLORS } from '../types';

interface BookPopoverProps {
  book: LibraryBookEntry;
  children: React.ReactNode;
}

function getScoreColor(score: number): string {
  if (score >= 8) return '#2f855a';
  if (score >= 6) return '#d69e2e';
  if (score >= 4) return '#dd6b20';
  return '#e53e3e';
}

function getScoreBg(score: number): string {
  if (score >= 8) return '#f0fff4';
  if (score >= 6) return '#fffff0';
  if (score >= 4) return '#fffaf0';
  return '#fff5f5';
}

export function BookPopover({ book, children }: BookPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content p={0} maxW="380px" borderRadius="xl" overflow="hidden" boxShadow="xl">
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Body p={0}>
              {/* Header with score badge */}
              <Flex
                bg="orange.50"
                px={4}
                py={3}
                justify="space-between"
                align="flex-start"
                borderBottom="1px solid"
                borderColor="orange.100"
              >
                <Box flex={1} pr={3} pt='1'>
                  <Text fontSize="md" fontWeight="700" lineHeight="short">
                    {book.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mt={0.5}>
                    {book.author}
                  </Text>
                </Box>

                {book.score != null && (
                  <Flex
                    direction="column"
                    align="center"
                    bg={getScoreBg(book.score)}
                    border="2px solid"
                    borderColor={getScoreColor(book.score)}
                    borderRadius="lg"
                    px={3}
                    py={1.5}
                    minW="52px"
                    flexShrink={0}
                  >
                    <Text fontSize="lg" fontWeight="800" color={getScoreColor(book.score)} lineHeight="2">
                      {book.score}
                    </Text>
                  
                  </Flex>
                )}
              </Flex>

              <VStack align="stretch" gap={0} px={4} py={3}>
                {/* Metadata grid */}
                <Flex gap={0} flexWrap="wrap" mb={3}>
                  {book.year && (
                    <Box flex="1" minW="80px" textAlign="center" px={2} py={1.5}>
                      <HStack gap={1} justify="center" mb={0.5}>
                        <CalendarIcon size={12} color="#a0aec0" />
                        <Text fontSize="2xs" color="gray.500" fontWeight="600" textTransform="uppercase">
                          Год
                        </Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="700">
                        {book.year}
                      </Text>
                    </Box>
                  )}
                  {book.pagesCount && (
                    <Box flex="1" minW="80px" textAlign="center" px={2} py={1.5} borderLeft="1px solid" borderColor="gray.100">
                      <HStack gap={1} justify="center" mb={0.5}>
                        <FileTextIcon size={12} color="#a0aec0" />
                        <Text fontSize="2xs" color="gray.500" fontWeight="600" textTransform="uppercase">
                          Страниц
                        </Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="700">
                        {book.pagesCount}
                      </Text>
                    </Box>
                  )}
                  {book.rating && (
                    <Box flex="1" minW="80px" textAlign="center" px={2} py={1.5} borderLeft="1px solid" borderColor="gray.100">
                      <HStack gap={1} justify="center" mb={0.5}>
                        <StarIcon size={12} color="#a0aec0" />
                        <Text fontSize="2xs" color="gray.500" fontWeight="600" textTransform="uppercase">
                          Оценка
                        </Text>
                      </HStack>
                      <Badge colorPalette={RATING_COLORS[book.rating]} variant="subtle" size="sm">
                        {RATING_LABELS[book.rating]}
                      </Badge>
                    </Box>
                  )}
                </Flex>

                {/* Description */}
                {book.description && (
                  <>
                    <Separator mb={2} />
                    <Text fontSize="sm" color="gray.600" lineClamp={3} mb={2} lineHeight="tall">
                      {book.description}
                    </Text>
                  </>
                )}

                {/* Genres */}
                {book.genres && book.genres.length > 0 && (
                  <>
                    <Separator mb={2} />
                    <Box mb={2}>
                      <Text fontSize="2xs" color="gray.500" fontWeight="600" textTransform="uppercase" mb={1.5}>
                        Жанры
                      </Text>
                      <HStack gap={1.5} flexWrap="wrap">
                        {book.genres.map((genre) => (
                          <Badge
                            key={genre}
                            variant="outline"
                            size="sm"
                            borderRadius="full"
                            px={2.5}
                            py={0.5}
                            fontWeight="500"
                            borderColor="orange.200"
                            color="orange.700"
                          >
                            {genre}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>
                  </>
                )}

                {/* Footer: status + read date */}
                <Separator mb={2} />
                <Flex justify="space-between" align="center">
                  <HStack gap={2}>
                    <BookOpenIcon size={14} color="#a0aec0" />
                    <Badge colorPalette={STATUS_COLORS[book.status]} variant="solid" size="sm" borderRadius="full" px={2.5}>
                      {STATUS_LABELS[book.status]}
                    </Badge>
                  </HStack>
                  {book.readDate && (
                    <Text fontSize="xs" color="gray.500">
                      {book.readDate}
                    </Text>
                  )}
                </Flex>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
