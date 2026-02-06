import { HStack, IconButton, Text } from '@chakra-ui/react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { formatNumber } from './utils';

export interface ActionBarProps {
  likes: number;
  repliesCount: number;
  repostsCount: number;
  sharesCount: number;
  iconSize?: number;
}

export function ActionBar({
  likes,
  repliesCount,
  repostsCount,
  sharesCount,
  iconSize = 16,
}: ActionBarProps) {
  return (
    <HStack gap="4" mt="2" onClick={(e) => e.stopPropagation()}>
      <HStack gap="1">
        <IconButton aria-label="Like" variant="ghost" size="xs">
          <Heart size={iconSize} />
        </IconButton>
        {likes > 0 && (
          <Text fontSize="xs" opacity={0.7}>
            {formatNumber(likes)}
          </Text>
        )}
      </HStack>

      <HStack gap="1">
        <IconButton aria-label="Reply" variant="ghost" size="xs">
          <MessageCircle size={iconSize} />
        </IconButton>
        {repliesCount > 0 && (
          <Text fontSize="xs" opacity={0.7}>
            {formatNumber(repliesCount)}
          </Text>
        )}
      </HStack>

      <HStack gap="1">
        <IconButton aria-label="Repost" variant="ghost" size="xs">
          <Repeat2 size={iconSize} />
        </IconButton>
        {repostsCount > 0 && (
          <Text fontSize="xs" opacity={0.7}>
            {formatNumber(repostsCount)}
          </Text>
        )}
      </HStack>

      <HStack gap="1">
        <IconButton aria-label="Share" variant="ghost" size="xs">
          <Send size={iconSize} />
        </IconButton>
        {sharesCount > 0 && (
          <Text fontSize="xs" opacity={0.7}>
            {formatNumber(sharesCount)}
          </Text>
        )}
      </HStack>
    </HStack>
  );
}
