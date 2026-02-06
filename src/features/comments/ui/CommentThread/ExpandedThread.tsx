import { Box, Flex, HStack, IconButton, Text, Image } from '@chakra-ui/react';
import { MoreHorizontal, Plus, ChevronLeft, ChevronDown } from 'lucide-react';
import type { CommentThreadItem } from '../../mocks/commentsThread.mock';
import { UserAvatar } from './UserAvatar';
import { ActionBar } from './ActionBar';
import { QuotedBlock } from './QuotedBlock';
import { CommentRow } from './CommentRow';
import { formatNumber } from './utils';

export interface ExpandedThreadProps {
  comment: CommentThreadItem;
  onBack: () => void;
}

export function ExpandedThread({
  comment,
  onBack,
}: ExpandedThreadProps) {
  return (
    <Box>
      {/* Header */}
      <Flex align="center" py="3" borderBottomWidth="1px">
        <IconButton aria-label="Back" variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft size={20} />
        </IconButton>
        <Box textAlign="center" flex="1">
          <Text fontWeight="700" fontSize="md">
            Ветка
          </Text>
          <Text fontSize="xs" opacity={0.5}>
            {formatNumber(comment.repliesCount)} просмотра
          </Text>
        </Box>
        <IconButton aria-label="More" variant="ghost" size="sm">
          <MoreHorizontal size={20} />
        </IconButton>
      </Flex>

      {/* Main post (larger) */}
      <Box px="4" py="4" borderBottomWidth="1px">
        <Flex gap="3">
          <Box position="relative" flexShrink={0}>
            <UserAvatar
              name={comment.authorUsername}
              avatar={comment.authorAvatar}
              size="md"
            />
            <Flex
              position="absolute"
              bottom="-2px"
              right="-2px"
              width="16px"
              height="16px"
              borderRadius="full"
              bg="black"
              color="white"
              align="center"
              justify="center"
              fontSize="9px"
              _dark={{ bg: 'white', color: 'black' }}
            >
              <Plus size={10} />
            </Flex>
          </Box>
          <Flex align="center" gap="2">
            <Text fontSize="sm" fontWeight="700">
              {comment.authorUsername}
            </Text>
            <Text fontSize="sm" opacity={0.5}>
              {comment.createdAt}
            </Text>
            <Box ml="auto">
              <IconButton aria-label="More" variant="ghost" size="xs">
                <MoreHorizontal size={16} />
              </IconButton>
            </Box>
          </Flex>
        </Flex>

        <Text fontSize="md" lineHeight="1.7" mt="3" whiteSpace="pre-wrap">
          {comment.text}
        </Text>

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

        {comment.quotedComment && <QuotedBlock quote={comment.quotedComment} />}

        <ActionBar
          likes={comment.likes}
          repliesCount={comment.repliesCount}
          repostsCount={comment.repostsCount}
          sharesCount={comment.sharesCount}
        />
      </Box>

      {/* Sort bar */}
      <Flex
        align="center"
        justify="space-between"
        px="4"
        py="3"
        borderBottomWidth="1px"
      >
        <HStack gap="1" cursor="pointer">
          <Text fontSize="sm" fontWeight="600">
            Популярные
          </Text>
          <ChevronDown size={14} />
        </HStack>
        <Text fontSize="sm" opacity={0.5} cursor="pointer" _hover={{ opacity: 0.8 }}>
          Смотреть действия &rsaquo;
        </Text>
      </Flex>

      {/* Replies list */}
      <Box>
        {comment.replies?.map((reply) => (
          <Box key={reply.id} borderBottomWidth="1px" px="4">
            <CommentRow comment={reply} />
          </Box>
        ))}

        {comment.popularReply && !comment.replies?.find((r) => r.id === comment.popularReply?.id) && (
          <Box borderBottomWidth="1px" px="4">
            <CommentRow comment={comment.popularReply} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
