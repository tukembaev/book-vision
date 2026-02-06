import { Flex, Input, Button } from '@chakra-ui/react';
import { UserAvatar } from './UserAvatar';

export interface CommentInputProps {
  currentUserAvatar?: string;
}

export function CommentInput({ currentUserAvatar }: CommentInputProps) {
  return (
    <Flex align="center" gap="3" px="2" py="4" borderBottomWidth="1px">
      <UserAvatar name="Вы" avatar={currentUserAvatar} size="sm" />
      <Input
        placeholder="О чем вы думаете?"
        variant="outline"
        fontSize="sm"
        flex="1"
      />
      <Button
        size="sm"
        fontWeight="600"
        borderRadius="full"
        bg="black"
        color="white"
        _dark={{ bg: 'white', color: 'black' }}
        px="4"
      >
        Опубликовать
      </Button>
    </Flex>
  );
}
