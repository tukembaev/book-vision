import { Box, Flex, HStack, IconButton, Text, Image } from '@chakra-ui/react';
import { MoreHorizontal, Plus, Pin } from 'lucide-react';
import type { CommentThreadItem } from '../../mocks/commentsThread.mock';
import { UserAvatar } from './UserAvatar';
import { ActionBar } from './ActionBar';
import { QuotedBlock } from './QuotedBlock';

export interface CommentRowProps {
  comment: CommentThreadItem;
  isReply?: boolean;
  hasReply?: boolean;
}

export function CommentRow({
  comment,
  isReply = false,
  hasReply = false,
}: CommentRowProps) {
  const avatarPx = isReply ? 32 : 40;

  return (
    <Flex gap="3" py="1">
      {/* Avatar column with optional vertical line */}
      <Flex direction="column" align="center" flexShrink={0} width={`${avatarPx}px`}>
        <Box position="relative">
          <UserAvatar
            name={comment.authorUsername}
            avatar={comment.authorAvatar}
            size="md"
          />
          {!isReply && (
            <Flex
              position="absolute"
              bottom="-2px"
              right="-2px"
              width="16px"
              height="16px"
              borderRadius="full"
           
              color="white"
              align="center"
              justify="center"
              fontSize="9px"
              _dark={{ bg: 'white', color: 'black' }}
            >
              <Plus size={10} />
            </Flex>
          )}
        </Box>
        {/* Vertical connecting line */}
        {hasReply && (
          <Box
            flex="1"
            width="2px"
            bg="gray.200"
            mt="2"
            borderRadius="full"
            _dark={{ bg: 'gray.600' }}
          />
        )}
      </Flex>

      <Box flex="1" minW={0}>
        {/* Header */}
        <Flex align="center" gap="2" mb="1">
          <Text fontSize="sm" fontWeight="700" truncate>
            {comment.authorUsername}
          </Text>
          <Text fontSize="sm" opacity={0.5} flexShrink={0}>
            {comment.createdAt}
          </Text>
          <Box ml="auto" flexShrink={0}>
            <IconButton
              aria-label="More options"
              variant="ghost"
              size="xs"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={16} />
            </IconButton>
          </Box>
        </Flex>

        {/* Pinned badge */}
        {comment.isPinned && (
          <HStack gap="1" mb="1" opacity={0.5}>
            <Pin size={12} />
            <Text fontSize="xs">Прикреплено</Text>
          </HStack>
        )}

        {/* Text */}
        <Text fontSize="sm" lineHeight="1.6" whiteSpace="pre-wrap">
          {comment.text}
        </Text>

        {/* Image */}
        {comment.imageUrl && (
          <Image
            src={comment.imageUrl}
            alt="comment image"
            mt="3"
            borderRadius="xl"
            maxH="400px"
            objectFit="cover"
            width="100%"
          />
        )}

        {/* Quoted comment */}
        {comment.quotedComment && <QuotedBlock quote={comment.quotedComment} />}

        {/* Actions */}
        <ActionBar
          likes={comment.likes}
          repliesCount={comment.repliesCount}
          repostsCount={comment.repostsCount}
          sharesCount={comment.sharesCount}
          iconSize={isReply ? 14 : 16}
        />
      </Box>
    </Flex>
  );
}
