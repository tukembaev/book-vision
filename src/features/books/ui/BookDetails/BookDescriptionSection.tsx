import { Box, Heading, Text } from '@chakra-ui/react';

export interface BookDescriptionSectionProps {
  description: string;
}

export function BookDescriptionSection({ description }: BookDescriptionSectionProps) {
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="600">
        Описание
      </Heading>
      <Text mt="2" opacity={0.9}>
        {description}
      </Text>
    </Box>
  );
}
