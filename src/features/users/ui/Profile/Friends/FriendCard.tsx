import { Box, Flex, Text } from '@chakra-ui/react';
import { BookOpen, Users } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

import type { FriendData } from './friends.mock';

export interface FriendCardProps {
  friend: FriendData;
}

export function FriendCard({ friend }: FriendCardProps) {
  return (
    <AppLink to={`/users/${friend.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Flex align="center" gap="3">
          <Box
            w="40px"
            h="40px"
            borderRadius="full"
            bg="gray.200"
            flexShrink={0}
            backgroundImage={friend.avatarUrl ? `url(${friend.avatarUrl})` : undefined}
            backgroundSize="cover"
            backgroundPosition="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {!friend.avatarUrl && (
              <Text fontSize="sm" fontWeight="600" opacity={0.5}>
                {friend.username.charAt(0).toUpperCase()}
              </Text>
            )}
          </Box>

          <Box flex="1" minW="0">
            <Text fontSize="sm" fontWeight="600">@{friend.username}</Text>
            <Text fontSize="xs" opacity={0.6} lineClamp={1}>{friend.status}</Text>
          </Box>

          <Flex direction="column" align="flex-end" gap="1" flexShrink={0}>
            <Flex align="center" gap="1" opacity={0.5}>
              <BookOpen size={12} />
              <Text fontSize="xs">{friend.booksRead}</Text>
            </Flex>
            {friend.mutualFriends > 0 && (
              <Flex align="center" gap="1" opacity={0.4}>
                <Users size={11} />
                <Text fontSize="xs">{friend.mutualFriends}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </AppLink>
  );
}
