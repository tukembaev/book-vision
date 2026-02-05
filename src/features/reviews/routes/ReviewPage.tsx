import { useParams } from 'react-router-dom';
import { Box, Container, Heading, Text, Stack, HStack, Avatar, Badge, Flex, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, MessageCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockReviewCards } from '@/components/ReviewCard/mocks/ReviewCard.mock';

const statusConfig = {
  'in-progress': { label: 'In Progress', colorScheme: 'teal' },
  'completed': { label: 'Completed', colorScheme: 'green' },
  'draft': { label: 'Draft', colorScheme: 'gray' },
} as const;

export default function ReviewPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const review = mockReviewCards.find((r) => r.id === reviewId);

  const [upvotes, setUpvotes] = useState(review?.upvotes ?? 0);
  const [isUpvoted, setIsUpvoted] = useState(review?.isUpvoted ?? false);

  if (!review) {
    return (
      <Container maxW="4xl" py="8">
        <Text>Отзыв не найден</Text>
      </Container>
    );
  }

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
  };

  const statusInfo = statusConfig[review.status];

  return (
    <Container maxW="4xl" py="8">
      <Stack gap="6">
        <Box>
          <IconButton
            aria-label="Go back"
            size="sm"
            variant="ghost"
            onClick={() => navigate(-1)}
            mb="4"
          >
            <ArrowLeftIcon size={20} />
          </IconButton>

          <Flex justify="space-between" align="start" gap="4">
            <Box flex="1">
              <Badge
                colorScheme={statusInfo.colorScheme}
                mb="3"
                fontSize="sm"
                px="3"
                py="1"
                borderRadius="md"
              >
                {statusInfo.label}
              </Badge>

              <Heading as="h1" size="xl" mb="4">
                {review.title}
              </Heading>

              <HStack gap="4" fontSize="sm" color="gray.600" mb="6">
                <HStack gap="2">
                  <Avatar.Root size="sm">
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

            <Flex direction="column" align="center" gap="2">
              <IconButton
                aria-label="Upvote review"
                size="lg"
                variant={isUpvoted ? 'solid' : 'outline'}
                colorScheme={isUpvoted ? 'blue' : 'gray'}
                onClick={handleUpvote}
              >
                <ChevronUpIcon size={24} />
              </IconButton>
              <Text fontSize="xl" fontWeight="700">
                {upvotes}
              </Text>
            </Flex>
          </Flex>
        </Box>

        <Box
          borderWidth="1px"
          borderRadius="lg"
          p="6"
          bg="gray.50"
        >
          <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-wrap">
            {review.description}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb="4">
            Комментарии ({review.commentsCount})
          </Heading>
          <Text color="gray.600">Комментарии пока не реализованы</Text>
        </Box>
      </Stack>
    </Container>
  );
}
