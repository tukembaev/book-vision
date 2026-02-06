import { Flex, Image } from '@chakra-ui/react';

export interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'xs' | 'sm' | 'md';
}

export function UserAvatar({
  name,
  avatar,
  size = 'md',
}: UserAvatarProps) {
  const sizeMap = { xs: '24px', sm: '32px', md: '40px' };
  const fontSize = { xs: '10px', sm: '12px', md: '14px' };

  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={sizeMap[size]}
        height={sizeMap[size]}
        borderRadius="full"
        objectFit="cover"
        flexShrink={0}
      />
    );
  }

  return (
    <Flex
      width={sizeMap[size]}
      height={sizeMap[size]}
      borderRadius="full"
      bg="gray.300"
      align="center"
      justify="center"
      fontSize={fontSize[size]}
      fontWeight="600"
      flexShrink={0}
      color="white"
    >
      {name.charAt(0).toUpperCase()}
    </Flex>
  );
}
