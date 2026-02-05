import { useState } from 'react';
import { Box, Flex, Heading, Text, Avatar, Badge, HStack, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, MessageCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type ReviewStatus = 'in-progress' | 'completed' | 'draft';

export interface ReviewCardData {
  id: string;
  status: ReviewStatus;
  title: string;
  description: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  upvotes: number;
  commentsCount: number;
  category?: string;
  isUpvoted?: boolean;
}

interface ReviewCardProps {
  review: ReviewCardData;
  onUpvote?: (reviewId: string) => void;
}

const statusConfig: Record<ReviewStatus, { label: string; colorScheme: string }> = {
  'in-progress': { label: 'In Progress', colorScheme: 'teal' },
  'completed': { label: 'Completed', colorScheme: 'green' },
  'draft': { label: 'Draft', colorScheme: 'gray' },
};

export function ReviewCard({ review, onUpvote }: ReviewCardProps) {
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(review.upvotes);
  const [isUpvoted, setIsUpvoted] = useState(review.isUpvoted ?? false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
    
    onUpvote?.(review.id);
  };

  const handleCardClick = () => {
    navigate(`/reviews/${review.id}`);
  };

  const statusInfo = statusConfig[review.status];

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      gap="4"
      bg="white"
      _hover={{ shadow: 'md', cursor: 'pointer' }}
      transition="all 0.2s"
      onClick={handleCardClick}
    >
      <Box flex="1">
        <Badge
          colorScheme={statusInfo.colorScheme}
          mb="2"
          fontSize="xs"
          px="2"
          py="0.5"
          borderRadius="md"
        >
          {statusInfo.label}
        </Badge>

        <Heading
          as="h3"
          size="sm"
          fontWeight="700"
          mb="2"
          _hover={{ color: 'blue.600' }}
        >
          {review.title}
        </Heading>

        <Text fontSize="sm" color="gray.600" mb="3" lineHeight="tall">
          {review.description}
        </Text>

        <HStack gap="4" fontSize="sm" color="gray.600">
          <HStack gap="2">
            <Avatar.Root size="xs">
              <Avatar.Fallback>{review.author.name.charAt(0)}</Avatar.Fallback>
              {review.author.avatarUrl && <Avatar.Image src={review.author.avatarUrl} />}
            </Avatar.Root>
            <Text fontWeight="600">{review.author.name}</Text>
          </HStack>

          <Text>{review.createdAt}</Text>

          <HStack gap="1">
            <MessageCircleIcon size={16} />
            <Text>{review.commentsCount}</Text>
          </HStack>

          {review.category && (
            <>
              <Box w="1" h="1" bg="gray.400" borderRadius="full" />
              <Text color="blue.600" fontWeight="500">
                {review.category}
              </Text>
            </>
          )}
        </HStack>
      </Box>

      <Flex
        direction="column"
        align="center"
        justify="center"
        minW="50px"
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          aria-label="Upvote review"
          size="sm"
          variant={isUpvoted ? 'solid' : 'outline'}
          colorScheme={isUpvoted ? 'blue' : 'gray'}
          onClick={handleUpvote}
        >
          <ChevronUpIcon size={20} />
        </IconButton>
        <Text fontSize="lg" fontWeight="700" mt="1">
          {upvotes}
        </Text>
      </Flex>
    </Flex>
  );
}
