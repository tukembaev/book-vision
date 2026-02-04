import { Box, Flex, Input, Text } from '@chakra-ui/react';

export interface BooksCatalogHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function BooksCatalogHeader({ query, onQueryChange }: BooksCatalogHeaderProps) {
  return (
    <Box>
      <Text fontSize="md" fontWeight="600" >
        Каталог книг
      </Text>
      <Flex mt="2" gap="3" align="center" width="full">
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.currentTarget.value)}
          placeholder="Например: Тургенев"
          width="full"
        />
      </Flex>
    </Box>
  );
}
