import { Box, Heading, Text } from '@chakra-ui/react';

import type { User } from '@/types/core';

export interface UserProfileHeaderProps {
  user: User;
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <Box>
      <Heading as="h2" size="lg" fontWeight="700">
        {user.username}
      </Heading>
      <Text mt="1" opacity={0.8}>
        Role: {user.role}
      </Text>
    </Box>
  );
}
