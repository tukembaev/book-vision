import { Box, Flex, Heading, HStack, Icon } from '@chakra-ui/react';
import { ArrowRightIcon } from 'lucide-react';

import { CollectionCard, type CollectionCardData } from '@/components/CollectionCard';

interface CollectionsSectionProps {
  collections: CollectionCardData[];
}

export function CollectionsSection({ collections }: CollectionsSectionProps) {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb="4">
        <HStack gap="2">
          <Heading as="h3" fontSize="lg" fontWeight="700">
            Коллекции
          </Heading>
          <Icon color="orange.500">
            <ArrowRightIcon size={18} />
          </Icon>
        </HStack>
      </Flex>

      <Flex gap="4" overflowX="auto" pb="2">
        {collections.map((col) => (
          <Box key={col.id} flex="1" minW="250px">
            <CollectionCard collection={col} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
