import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ArrowRightIcon, ImageIcon } from 'lucide-react';

import { AppLink } from '@/components/navigation/AppLink/AppLink';

export interface CurrentlyReadingItem {
  id: string;
  title: string;
  genre: string;
  coverUrl?: string;
}

interface CurrentlyReadingSectionProps {
  newReleases: CurrentlyReadingItem[];
  gainingPopularity: CurrentlyReadingItem[];
  popular: CurrentlyReadingItem[];
}

function CurrentlyReadingRow({ item }: { item: CurrentlyReadingItem }) {
  return (
    <AppLink
      to={`/books/${item.id}`}
      display="flex"
      alignItems="center"
      gap="4"
      py="3"
      _hover={{ textDecoration: 'none', bg: 'gray.50' }}
      borderRadius="md"
      px="2"
    >
      <Box
        w="60px"
        h="85px"
        borderRadius="md"
        overflow="hidden"
        flexShrink={0}
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {item.coverUrl ? (
          <img
            src={item.coverUrl}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Icon color="gray.400" boxSize="6">
            <ImageIcon />
          </Icon>
        )}
      </Box>
      <Box overflow="hidden">
        <Text
          fontSize="base"
          fontWeight="600"
          lineHeight="short"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.title}
        </Text>
        <Text fontSize="sm" color="gray.500" mt="1">
          {item.genre}
        </Text>
      </Box>
    </AppLink>
  );
}

function CurrentlyReadingColumn({
  title,
  items,
}: {
  title: string;
  items: CurrentlyReadingItem[];
}) {
  return (
    <Box flex="1" minW="0">
      <Heading as="h4" fontSize="sm" fontWeight="700" mb="3">
        {title}
      </Heading>
      <Stack gap="2">
        {items.map((item) => (
          <CurrentlyReadingRow key={item.id} item={item} />
        ))}
      </Stack>
    </Box>
  );
}

export function CurrentlyReadingSection({
  newReleases,
  gainingPopularity,
  popular,
}: CurrentlyReadingSectionProps) {
  const [_period, _setPeriod] = useState('day');

  return (
    <Box borderWidth="1px" borderRadius="xl" p="5" bg="white">
      <Flex justify="space-between" align="center" mb="4">
        <HStack gap="2">
          <Heading as="h3" fontSize="md" fontWeight="700">
            Сейчас читают
          </Heading>
          <Icon color="orange.500">
            <ArrowRightIcon size={18} />
          </Icon>
        </HStack>

        <Text fontSize="xs" color="gray.500" cursor="pointer">
          За день ▾
        </Text>
      </Flex>

      <Flex gap="6" direction={{ base: 'column', md: 'row' }}>
        <CurrentlyReadingColumn title="Новинки" items={newReleases} />
        <CurrentlyReadingColumn
          title="Набирающее популярность"
          items={gainingPopularity}
        />
        <CurrentlyReadingColumn title="Популярное" items={popular} />
      </Flex>
    </Box>
  );
}
