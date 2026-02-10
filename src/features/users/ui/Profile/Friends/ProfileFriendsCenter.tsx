import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Users } from 'lucide-react';

import { mockFriends } from './friends.mock';
import { FriendCard } from './FriendCard';

export function ProfileFriendsCenter() {
  return (
    <Stack gap="5">
      <Box>
        <Flex align="center" gap="2" mb="1">
          <Users size={18} />
          <Heading as="h2" size="md" fontWeight="700">
            Друзья
          </Heading>
        </Flex>
        <Text fontSize="sm" opacity={0.6}>
          {mockFriends.length} друзей
        </Text>
      </Box>

      {mockFriends.length === 0 ? (
        <Text fontSize="sm" opacity={0.5}>Пока нет друзей.</Text>
      ) : (
        <Stack gap="2">
          {mockFriends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
