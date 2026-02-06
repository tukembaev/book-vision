import { Box, Text, HStack, VStack, Popover, Portal, Flex, Separator } from '@chakra-ui/react';
import { MapPinIcon, CalendarIcon, BookMarkedIcon, UserIcon } from 'lucide-react';
import { getAuthorById } from '../mocks/libraryData.mock';

interface AuthorPopoverProps {
  authorId: string;
  authorName: string;
  children: React.ReactNode;
}

function getLifeSpan(birthYear?: number, deathYear?: number): string | null {
  if (!birthYear) return null;
  const age = deathYear
    ? deathYear - birthYear
    : new Date().getFullYear() - birthYear;
  const suffix = deathYear ? '' : ', наст. время';
  return `${birthYear} — ${deathYear || '...'}  (${age} лет${suffix})`;
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
          <Popover.Content p={0} maxW="360px" borderRadius="xl" overflow="hidden" boxShadow="xl">
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Body p={0}>
              {/* Header */}
              <Flex
                bg="teal.50"
                px={4}
                py={3}
                align="center"
                gap={3}
                borderBottom="1px solid"
                borderColor="teal.100"
              >
                <Flex
                  align="center"
                  justify="center"
                  bg="teal.100"
                  borderRadius="full"
                  w="40px"
                  h="40px"
                  flexShrink={0}
                >
                  <UserIcon size={20} color="#2c7a7b" />
                </Flex>
                <Box flex={1}>
                  <Text fontSize="md" fontWeight="700" lineHeight="short">
                    {author?.name || authorName}
                  </Text>
                  {author?.country && (
                    <HStack gap={1} mt={0.5}>
                      <MapPinIcon size={12} color="#718096" />
                      <Text fontSize="sm" color="gray.600">
                        {author.country}
                      </Text>
                    </HStack>
                  )}
                </Box>
              </Flex>

              {author ? (
                <VStack align="stretch" gap={0} px={4} py={3}>
                  {/* Life span */}
                  {author.birthYear && (
                    <HStack gap={2} mb={2}>
                      <CalendarIcon size={14} color="#a0aec0" />
                      <Text fontSize="sm" color="gray.700">
                        {getLifeSpan(author.birthYear, author.deathYear)}
                      </Text>
                    </HStack>
                  )}

                  {/* Books count */}
                  {author.booksCount != null && (
                    <HStack gap={2} mb={2}>
                      <BookMarkedIcon size={14} color="#a0aec0" />
                      <Text fontSize="sm" color="gray.700">
                        <Text as="span" fontWeight="700">{author.booksCount}</Text>
                        {' '}произведений
                      </Text>
                    </HStack>
                  )}

                  {/* Bio */}
                  {author.bio && (
                    <>
                      <Separator mb={2} />
                      <Text fontSize="sm" color="gray.600" lineHeight="tall" lineClamp={4}>
                        {author.bio}
                      </Text>
                    </>
                  )}
                </VStack>
              ) : (
                <Box px={4} py={3}>
                  <Text fontSize="sm" color="gray.500">
                    Информация об авторе недоступна
                  </Text>
                </Box>
              )}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
