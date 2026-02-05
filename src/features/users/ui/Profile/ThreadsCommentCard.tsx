import { Box, Flex, Text, HStack, Avatar, VStack, Image } from '@chakra-ui/react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

import type { UserCommentActivity } from '../../mocks/userCommentsDb.mock';
import { getMockUserById } from '../../mocks/usersDb.mock';

export interface ThreadsCommentCardProps {
  activity: UserCommentActivity;
}

export function ThreadsCommentCard({ activity }: ThreadsCommentCardProps) {
  const { comment, parentComment, bookTitle, bookCoverUrl } = activity;
  const user = getMockUserById(comment.userId);
  const parentUser = parentComment ? getMockUserById(parentComment.userId) : null;

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: false,
    locale: ru,
  });

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      _hover={{ borderColor: 'gray.300' }}
      transition="all 0.2s"
    >
      <Flex direction="column">
        <Box p="4">
          <Flex gap="3">
            <Avatar.Root size="md" flexShrink={0}>
              <Avatar.Fallback>{user?.username?.[0]?.toUpperCase() ?? 'U'}</Avatar.Fallback>
              {user?.avatarUrl && <Avatar.Image src={user.avatarUrl} />}
            </Avatar.Root>

            <VStack align="stretch" flex="1" gap="2">
              <Flex justify="space-between" align="center">
                <HStack gap="2">
                  <Text fontWeight="600" fontSize="sm">
                    {user?.username ?? 'Пользователь'}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {timeAgo}
                  </Text>
                </HStack>
                <Text fontSize="xs" color="gray.400" cursor="pointer" _hover={{ color: 'gray.600' }}>
                  •••
                </Text>
              </Flex>

              {parentComment && parentUser && (
                <Box
                  bg="gray.50"
                  borderLeftWidth="3px"
                  borderLeftColor="gray.300"
                  borderRadius="md"
                  p="3"
                  mb="2"
                >
                  <HStack gap="2" mb="1">
                    <Avatar.Root size="xs">
                      <Avatar.Fallback>{parentUser.username?.[0]?.toUpperCase() ?? 'U'}</Avatar.Fallback>
                      {parentUser.avatarUrl && <Avatar.Image src={parentUser.avatarUrl} />}
                    </Avatar.Root>
                    <Text fontSize="xs" fontWeight="600" color="gray.700">
                      {parentUser.username}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" lineClamp={3}>
                    {parentComment.text}
                  </Text>
                </Box>
              )}

              <Text fontSize="sm" lineHeight="1.6" whiteSpace="pre-wrap">
                {comment.text}
              </Text>

              <Flex align="center" gap="2" mt="1">
                <HStack
                  gap="2"
                  px="3"
                  py="1.5"
                  borderRadius="full"
                  bg="gray.50"
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                  transition="all 0.2s"
                >
                  {bookCoverUrl && (
                    <Image
                      src={bookCoverUrl}
                      alt={bookTitle}
                      boxSize="20px"
                      borderRadius="sm"
                      objectFit="cover"
                    />
                  )}
                  <Text fontSize="xs" fontWeight="500" color="gray.700" lineClamp={1}>
                    {bookTitle}
                  </Text>
                </HStack>
              </Flex>
            </VStack>
          </Flex>
        </Box>

        <Flex
          borderTopWidth="1px"
          borderColor="gray.100"
          px="4"
          py="2"
          justify="space-around"
          align="center"
        >
          <HStack
            gap="1.5"
            cursor="pointer"
            color="gray.600"
            _hover={{ color: 'red.500' }}
            transition="all 0.2s"
            px="3"
            py="1.5"
            borderRadius="md"
            _active={{ bg: 'gray.50' }}
          >
            <Heart size={18} />
            <Text fontSize="sm" fontWeight="500">
              {comment.likes}
            </Text>
          </HStack>

          <HStack
            gap="1.5"
            cursor="pointer"
            color="gray.600"
            _hover={{ color: 'blue.500' }}
            transition="all 0.2s"
            px="3"
            py="1.5"
            borderRadius="md"
            _active={{ bg: 'gray.50' }}
          >
            <MessageCircle size={18} />
            <Text fontSize="sm" fontWeight="500">
              Ответить
            </Text>
          </HStack>

          <HStack
            gap="1.5"
            cursor="pointer"
            color="gray.600"
            _hover={{ color: 'green.500' }}
            transition="all 0.2s"
            px="3"
            py="1.5"
            borderRadius="md"
            _active={{ bg: 'gray.50' }}
          >
            <Repeat2 size={18} />
          </HStack>

          <HStack
            gap="1.5"
            cursor="pointer"
            color="gray.600"
            _hover={{ color: 'purple.500' }}
            transition="all 0.2s"
            px="3"
            py="1.5"
            borderRadius="md"
            _active={{ bg: 'gray.50' }}
          >
            <Send size={18} />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
