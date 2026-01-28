import { Box, Text } from '@chakra-ui/react';

export interface UserAvatarCircleProps {
  name: string;
  size?: string;
}

export function UserAvatarCircle({ name, size = '56px' }: UserAvatarCircleProps) {
  const letter = name.trim().slice(0, 1).toUpperCase() || '?';

  return (
    <Box
      width={size}
      height={size}
      borderRadius="full"
      borderWidth="1px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontWeight="700">{letter}</Text>
    </Box>
  );
}
