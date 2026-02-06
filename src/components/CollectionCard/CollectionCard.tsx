import { Box, Flex, Heading, Text, HStack, Icon } from '@chakra-ui/react';
import { EyeIcon, BookOpenIcon, BookmarkIcon, ImageIcon, LibraryIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface CollectionCardData {
  id: string;
  title: string;
  coverUrl?: string;
  lastEditedAt: string;
  views: number;
  booksCount: number;
  bookmarks: number;
}

interface CollectionCardProps {
  collection: CollectionCardData;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <AppLink to={`/collections/${collection.id}`} display="block" _hover={{ textDecoration: 'none' }} _focus={{ outline: 'none' }}>
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
          height="140px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          {collection.coverUrl ? (
            <img
              src={collection.coverUrl}
              alt={collection.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Icon color="gray.400" boxSize="10">
              <ImageIcon />
            </Icon>
          )}
        </Box>

        <Box p="3">
          <Flex align="center" gap="2" mb="1">
            <Flex
              align="center"
              justify="center"
              w="8"
              h="8"
              borderRadius="lg"
              bg="pink.50"
              flexShrink={0}
            >
              <Icon color="pink.500" boxSize="4">
                <LibraryIcon />
              </Icon>
            </Flex>

            <Box overflow="hidden">
              <Heading
                as="h4"
                fontSize="sm"
                fontWeight="600"
                lineHeight="short"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {collection.title}
              </Heading>
              <Text fontSize="xs" color="gray.500">
                {collection.lastEditedAt}
              </Text>
            </Box>
          </Flex>

          <HStack gap="3" mt="2" fontSize="xs" color="gray.500">
            <HStack gap="1">
              <EyeIcon size={13} />
              <Text>{collection.views}</Text>
            </HStack>
            <HStack gap="1">
              <BookOpenIcon size={13} />
              <Text>{collection.booksCount} книг</Text>
            </HStack>
            <HStack gap="1">
              <BookmarkIcon size={13} />
              <Text>{collection.bookmarks}</Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </AppLink>
  );
}
