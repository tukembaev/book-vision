import { Box, Text } from '@chakra-ui/react';

export interface MiniAvatarCircleProps {
  name: string;
  size?: string;
}

export function MiniAvatarCircle({ name, size = '28px' }: MiniAvatarCircleProps) {
  const letter = name.trim().slice(0, 1).toUpperCase() || '?';

  return (
    <Box
      w={size}
      h={size}
      borderWidth="1px"
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="xs" fontWeight="600" opacity={0.9}>
        {letter}
      </Text>
    </Box>
  );
}
