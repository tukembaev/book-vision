import { Box, Flex, Heading, Text, Avatar, HStack, Icon } from '@chakra-ui/react';
import { ThumbsUpIcon, StarIcon, ImageIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface ArticleCardData {
  id: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  coverUrl?: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  rating: number;
  upvotes: number;
}

interface ArticleCardProps {
  article: ArticleCardData;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <AppLink to={`/articles/${article.id}`} display="block" _hover={{ textDecoration: 'none' }} _focus={{ outline: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        bg="white"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
      >
        <Box
          bg="gray.100"
          height="180px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          
            <img
              src={article.coverUrl}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
       
        </Box>

        <Box p="4">
          <Text fontSize="xs" fontWeight="600" color="purple.500" textTransform="uppercase" mb="2">
            {article.categoryLabel}
          </Text>

          <Heading
            as="h3"
            fontSize="lg"
            fontWeight="700"
            lineHeight="short"
            mb="2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.title}
          </Heading>

          <Text
            fontSize="sm"
            color="gray.600"
            lineHeight="tall"
            mb="4"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.excerpt}
          </Text>

          <Flex justify="space-between" align="center">
            <HStack gap="2">
              <Avatar.Root size="xs">
                <Avatar.Fallback>{article.author.name.charAt(0)}</Avatar.Fallback>
                {article.author.avatarUrl && <Avatar.Image src={article.author.avatarUrl} />}
              </Avatar.Root>
              <Box>
                <Text fontSize="xs" fontWeight="600" lineHeight="1.2">
                  {article.author.name}
                </Text>
                <Text fontSize="xs" color="gray.500" lineHeight="1.2">
                  {article.createdAt}
                </Text>
              </Box>
            </HStack>

            <HStack gap="3" fontSize="xs" color="gray.500">
              <HStack gap="1">
                <StarIcon size={14} />
                <Text>{article.rating.toFixed(1)}</Text>
              </HStack>
              <HStack gap="1">
                <ThumbsUpIcon size={14} />
                <Text>{article.upvotes}</Text>
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </AppLink>
  );
}
