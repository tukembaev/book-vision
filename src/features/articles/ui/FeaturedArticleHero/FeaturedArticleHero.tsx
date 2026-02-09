import { Avatar, Badge, Box, Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { ImageIcon, StarIcon, ThumbsUpIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';
import type { ArticleCardData } from '@/components/ArticleCard';

export interface FeaturedArticleHeroProps {
  article: ArticleCardData;
}

export function FeaturedArticleHero({ article }: FeaturedArticleHeroProps) {
  return (
    <AppLink to={`/articles/${article.id}`} display="block" _hover={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          minH={{ base: 'auto', md: '260px' }}
        >
          {/* Image side */}
          <Box
            flex={{ md: '1.2' }}
            bg="gray.100"
            minH={{ base: '180px', md: 'auto' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
        
              <img
                src={'https://briefly.ru/static/cache/films/720/34.jpeg'}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
           
          </Box>

          {/* Text side */}
          <Flex
            flex={{ md: '1.8' }}
            direction="column"
            justify="center"
            p={{ base: '5', md: '8' }}
            gap="3"
          >
            <Flex align="center" gap="2">
              <Badge colorPalette="purple" fontSize="xs">
                Статья недели
              </Badge>
              <Badge variant="outline" fontSize="xs">
                {article.categoryLabel}
              </Badge>
            </Flex>

            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="800"
              lineHeight="short"
            >
              {article.title}
            </Heading>

            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="gray.600"
              lineHeight="tall"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.excerpt}
            </Text>

            <Flex
              align="center"
              justify="space-between"
              mt="1"
              flexWrap="wrap"
              gap="3"
            >
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
          </Flex>
        </Flex>
      </Box>
    </AppLink>
  );
}
