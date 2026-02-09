import { Badge, Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { CrownIcon, LockIcon, StarIcon, UsersIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import type { BookClub } from '../../mocks/bookClubsDb.mock';

export interface FeaturedClubHeroProps {
  club: BookClub;
}

export function FeaturedClubHero({ club }: FeaturedClubHeroProps) {
  const owner = club.members.find((m) => m.role === 'owner');

  return (
    <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" bg="white">
      {/* Color bar */}
      <Box h="8px" bg={`${club.coverColor}.400`} />

      <Flex direction={{ base: 'column', md: 'row' }} minH={{ base: 'auto', md: '240px' }}>
        {/* Left — Club image / placeholder */}
        <Flex
          flex={{ md: '1' }}
          bg={`${club.coverColor}.50`}
          minH={{ base: '180px', md: 'auto' }}
          align="center"
          justify="center"
          direction="column"
          gap="3"
          p="6"
        >
          <Box
            w="100px"
            h="100px"
            borderRadius="2xl"
            bg={`${club.coverColor}.200`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            shadow="sm"
          >
            <Text fontSize="5xl" fontWeight="900" color={`${club.coverColor}.600`}>
              {club.name.charAt(0)}
            </Text>
          </Box>
          <HStack gap="1" fontSize="md" fontWeight="700" color={`${club.coverColor}.600`}>
            <StarIcon size={16} />
            <Text>{club.rating.toFixed(1)}</Text>
          </HStack>
        </Flex>

      {/* Right — content */}
        <Flex
          flex={{ md: '2.5' }}
          direction="column"
          justify="center"
          p={{ base: '5', md: '8' }}
          gap="3"
        >
          <Flex gap="2" flexWrap="wrap" align="center">
            {club.isPrivate && (
              <Badge colorPalette="red" fontSize="2xs">
                <LockIcon size={10} /> Закрытый
              </Badge>
            )}
            {club.tags.map((tag) => (
              <Badge key={tag} variant="outline" fontSize="2xs" textTransform="none">
                {tag}
              </Badge>
            ))}
          </Flex>

          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="800" lineHeight="shorter">
            {club.name}
          </Heading>

          <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" lineHeight="tall">
            {club.description}
          </Text>

          <HStack gap="5" mt="2" fontSize="sm" color="gray.500" flexWrap="wrap">
            <HStack gap="1">
              <UsersIcon size={15} />
              <Text>{club.membersCount} участников</Text>
            </HStack>
            {owner && (
              <HStack gap="1">
                <CrownIcon size={15} />
                <AppLink to={`/users/${owner.userId}`}>@{owner.username}</AppLink>
              </HStack>
            )}
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
