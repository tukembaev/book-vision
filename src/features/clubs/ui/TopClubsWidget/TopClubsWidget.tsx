import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { StarIcon, UsersIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import type { BookClub } from '../../mocks/bookClubsDb.mock';

export interface TopClubsWidgetProps {
  clubs: BookClub[];
}

export function TopClubsWidget({ clubs }: TopClubsWidgetProps) {
  if (clubs.length === 0) return null;

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        🏆 Лучшие клубы
      </Heading>

      <Stack gap="3">
        {clubs.map((club, i) => (
          <AppLink key={club.id} to={`/clubs/${club.id}`} _hover={{ textDecoration: 'none' }}>
            <Flex gap="2.5" align="flex-start" _hover={{ bg: 'gray.50' }} borderRadius="md" p="2" mx="-2" transition="background 0.15s">
              <Text fontSize="lg" fontWeight="800" color="gray.200" lineHeight="1" mt="0.5" w="20px" textAlign="center" flexShrink={0}>
                {i + 1}
              </Text>
              <Box flex="1" minW="0">
                <Text fontSize="sm" fontWeight="600" truncate>
                  {club.name}
                </Text>
                <HStack gap="3" fontSize="xs" color="gray.400" mt="0.5">
                  <HStack gap="0.5">
                    <StarIcon size={11} />
                    <Text>{club.rating.toFixed(1)}</Text>
                  </HStack>
                  <HStack gap="0.5">
                    <UsersIcon size={11} />
                    <Text>{club.membersCount}</Text>
                  </HStack>
                </HStack>
              </Box>
            </Flex>
          </AppLink>
        ))}
      </Stack>
    </Box>
  );
}
