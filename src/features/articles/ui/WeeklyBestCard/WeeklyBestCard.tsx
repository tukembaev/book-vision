import { Avatar, Badge, Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { ThumbsUpIcon, EyeIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import type { ArticleCardData } from '@/components/ArticleCard';

export interface WeeklyBestCardProps {
  article: ArticleCardData;
  rank: number;
}

export function WeeklyBestCard({ article, rank }: WeeklyBestCardProps) {
  return (
    <AppLink to={`/articles/${article.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Flex
        gap="3"
        p="4"
        borderWidth="1px"
        borderRadius="xl"
        bg="white"
        _hover={{ shadow: 'sm' }}
        transition="all 0.2s"
        align="flex-start"
      >
        {/* Rank number */}
        <Text
          fontSize="2xl"
          fontWeight="800"
          color="gray.200"
          lineHeight="1"
          mt="1"
          flexShrink={0}
          w="28px"
          textAlign="center"
        >
          {rank}
        </Text>

        {/* Content */}
        <Box flex="1" minW="0">
          <Badge fontSize="2xs" fontWeight="600" colorPalette="purple" mb="1.5">
            {article.categoryLabel}
          </Badge>

          <Heading
            as="h4"
            fontSize="sm"
            fontWeight="700"
            lineHeight="short"
            mb="1.5"
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
            fontSize="xs"
            color="gray.500"
            lineHeight="tall"
            mb="2.5"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.excerpt}
          </Text>

          <Flex align="center" justify="space-between" gap="2">
            <HStack gap="1.5">
              <Avatar.Root size="2xs">
                <Avatar.Fallback>{article.author.name.charAt(0)}</Avatar.Fallback>
                {article.author.avatarUrl && <Avatar.Image src={article.author.avatarUrl} />}
              </Avatar.Root>
              <Text fontSize="xs" fontWeight="500" color="gray.600" truncate>
                {article.author.name}
              </Text>
            </HStack>

            <HStack gap="2.5" fontSize="xs" color="gray.400" flexShrink={0}>
              <HStack gap="0.5">
                <ThumbsUpIcon size={12} />
                <Text>{article.upvotes}</Text>
              </HStack>
              <HStack gap="0.5">
                <EyeIcon size={12} />
                <Text>{article.rating.toFixed(1)}</Text>
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </AppLink>
  );
}
