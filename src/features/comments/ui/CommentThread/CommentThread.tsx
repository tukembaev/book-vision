import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal } from 'lucide-react';
import type { CommentThreadItem } from '../../mocks/commentsThread.mock';

export interface CommentThreadProps {
  comment: CommentThreadItem;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace('.0', '')} ${num >= 1000 ? 'тыс' : ''}`;
  }
  return num.toString();
}

function UserAvatar({ name, size = 'sm' }: { name: string; size?: 'xs' | 'sm' }) {
  const sizeMap = { xs: '24px', sm: '32px' };
  const fontSize = { xs: '10px', sm: '12px' };
  
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
    >
      {name.charAt(0).toUpperCase()}
    </Flex>
  );
}

export function CommentThread({ comment }: CommentThreadProps) {
  return (
    <Box>
      {/* Main comment */}
      <Flex gap="3" py="3" borderBottomWidth="1px">
        <UserAvatar name={comment.authorUsername} size="sm" />
        
        <Box flex="1">
          <Flex align="center" gap="2" mb="1">
            <Text fontSize="sm" fontWeight="600">
              {comment.authorUsername}
            </Text>
            <Text fontSize="sm" opacity={0.6}>
              {comment.createdAt}
            </Text>
            <Box ml="auto">
              <IconButton
                aria-label="More options"
                variant="ghost"
                size="xs"
              >
                <MoreHorizontal size={16} />
              </IconButton>
            </Box>
          </Flex>

          <Text fontSize="sm" lineHeight="1.5">
            {comment.text}
          </Text>

          <HStack gap="4" mt="2">
            <HStack gap="1">
              <IconButton
                aria-label="Like"
                variant="ghost"
                size="xs"
              >
                <Heart size={16} />
              </IconButton>
              <Text fontSize="xs" opacity={0.7}>
                {formatNumber(comment.likes)}
              </Text>
            </HStack>

            <HStack gap="1">
              <IconButton
                aria-label="Reply"
                variant="ghost"
                size="xs"
              >
                <MessageCircle size={16} />
              </IconButton>
              <Text fontSize="xs" opacity={0.7}>
                {formatNumber(comment.repliesCount)}
              </Text>
            </HStack>

            <HStack gap="1">
              <IconButton
                aria-label="Repost"
                variant="ghost"
                size="xs"
              >
                <Repeat2 size={16} />
              </IconButton>
              {comment.repostsCount > 0 && (
                <Text fontSize="xs" opacity={0.7}>
                  {formatNumber(comment.repostsCount)}
                </Text>
              )}
            </HStack>

            <HStack gap="1">
              <IconButton
                aria-label="Share"
                variant="ghost"
                size="xs"
              >
                <Send size={16} />
              </IconButton>
              {comment.sharesCount > 0 && (
                <Text fontSize="xs" opacity={0.7}>
                  {formatNumber(comment.sharesCount)}
                </Text>
              )}
            </HStack>
          </HStack>
        </Box>
      </Flex>

      {/* Popular reply if exists */}
      {comment.popularReply && (
        <Flex gap="3" py="3" pl="12" borderBottomWidth="1px" bg="rgba(0, 0, 0, 0.02)" _dark={{ bg: 'rgba(255, 255, 255, 0.02)' }}>
          <UserAvatar name={comment.popularReply.authorUsername} size="xs" />
          
          <Box flex="1">
            <Flex align="center" gap="2" mb="1">
              <Text fontSize="xs" fontWeight="600">
                {comment.popularReply.authorUsername}
              </Text>
              <Text fontSize="xs" opacity={0.6}>
                {comment.popularReply.createdAt}
              </Text>
              <Box ml="auto">
                <IconButton
                  aria-label="More options"
                  variant="ghost"
                  size="xs"
                >
                  <MoreHorizontal size={14} />
                </IconButton>
              </Box>
            </Flex>

            <Text fontSize="xs" lineHeight="1.5">
              {comment.popularReply.text}
            </Text>

            <HStack gap="3" mt="2">
              <HStack gap="1">
                <IconButton
                  aria-label="Like"
                  variant="ghost"
                  size="xs"
                >
                  <Heart size={14} />
                </IconButton>
                <Text fontSize="xs" opacity={0.7}>
                  {formatNumber(comment.popularReply.likes)}
                </Text>
              </HStack>

              <HStack gap="1">
                <IconButton
                  aria-label="Reply"
                  variant="ghost"
                  size="xs"
                >
                  <MessageCircle size={14} />
                </IconButton>
                {comment.popularReply.repliesCount > 0 && (
                  <Text fontSize="xs" opacity={0.7}>
                    {formatNumber(comment.popularReply.repliesCount)}
                  </Text>
                )}
              </HStack>

              <HStack gap="1">
                <IconButton
                  aria-label="Repost"
                  variant="ghost"
                  size="xs"
                >
                  <Repeat2 size={14} />
                </IconButton>
                {comment.popularReply.repostsCount > 0 && (
                  <Text fontSize="xs" opacity={0.7}>
                    {formatNumber(comment.popularReply.repostsCount)}
                  </Text>
                )}
              </HStack>

              <HStack gap="1">
                <IconButton
                  aria-label="Share"
                  variant="ghost"
                  size="xs"
                >
                  <Send size={14} />
                </IconButton>
              </HStack>
            </HStack>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
