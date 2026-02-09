import { Badge, Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { LockIcon, StarIcon, UsersIcon, MessageSquareIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import type { BookClub } from '../../mocks/bookClubsDb.mock';

export interface BookClubCardProps {
  club: BookClub;
}

export function BookClubCard({ club }: BookClubCardProps) {
  const weeklyBook = club.weeklyBook ? getMockBookById(club.weeklyBook.bookId) : null;
  const totalDiscussions = club.discussions.length;
  const owner = club.members.find((m) => m.role === 'owner');

  return (
    <AppLink to={`/clubs/${club.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        bg="white"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
        h="100%"
      >
        {/* Color header bar */}
        <Box h="6px" bg={`${club.coverColor}.400`} />

        <Box p="4">
          <Flex direction="column" gap="2.5" h="100%">
            {/* Title + lock */}
            <Flex align="center" gap="2">
              <Heading as="h3" fontSize="md" fontWeight="700" lineHeight="short" flex="1">
                {club.name}
              </Heading>
              {club.isPrivate && <LockIcon size={14} color="var(--chakra-colors-gray-400)" />}
            </Flex>

            {/* Tags */}
            <Flex gap="1.5" flexWrap="wrap">
              {club.tags.map((tag) => (
                <Badge key={tag} variant="outline" fontSize="2xs" textTransform="none">
                  {tag}
                </Badge>
              ))}
            </Flex>

            {/* Description */}
            <Text
              fontSize="sm"
              color="gray.600"
              lineHeight="tall"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {club.description}
            </Text>

            {/* Weekly book */}
            {weeklyBook && (
              <Box bg="gray.50" borderRadius="md" px="3" py="2">
                <Text fontSize="xs" color="gray.400" fontWeight="600">
                  Читаем на этой неделе
                </Text>
                <Text fontSize="sm" fontWeight="600" mt="0.5">
                  {weeklyBook.title}
                </Text>
              </Box>
            )}

            {/* Stats row */}
            <HStack gap="4" fontSize="xs" color="gray.500" mt="auto" pt="1">
              <HStack gap="1">
                <UsersIcon size={13} />
                <Text>{club.membersCount}</Text>
              </HStack>
              <HStack gap="1">
                <MessageSquareIcon size={13} />
                <Text>{totalDiscussions}</Text>
              </HStack>
              <HStack gap="1">
                <StarIcon size={13} />
                <Text>{club.rating.toFixed(1)}</Text>
              </HStack>
              {owner && (
                <Text ml="auto" color="gray.400">
                  @{owner.username}
                </Text>
              )}
            </HStack>
          </Flex>
        </Box>
      </Box>
    </AppLink>
  );
}
